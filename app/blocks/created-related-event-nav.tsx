import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '~/atoms/ui/button';
import { relatedEventRef } from '~/db/event-ref';
import { deleteDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db } from '~/db/firebase';
import React from 'react';

interface RelatedEvent {
    eventName: string;
    _id: string;
    eventID: string;
}

export const CreatedRelatedEventNav = () => {
    const [relatedEvent, setRelatedEvent] = useState<RelatedEvent[]>([]);
    const [eventExists, setEventExists] = useState(false);
    const navigate = useNavigate();

    
    const getRelatedEventList = ()=>{
        const relatedEventCollection = collection(db, 'relatedEvent');
        onSnapshot(relatedEventCollection, res => {
        const relatedEventList = res.docs.map(doc => ({
        _id: doc.id,
        ...doc.data()
          } as RelatedEvent));
          setRelatedEvent(relatedEventList);
          setEventExists(true); 
        });
      };
      useEffect(() => {
        getRelatedEventList();
        
      }, []);

      const handleDelete = (eventID: string) => {
        const createdRelatedEventNav = document.getElementById('created-related-event-nav');
        if (createdRelatedEventNav) {
            createdRelatedEventNav.remove();
            deleteRelatedEventData(eventID)
                .then(() => {
                    console.log('The event data has been successfully deleted');
                    navigate('/add-event');
                })
                .catch((error) => {
                    console.error('Error deleting event data', error);
                });
        }
    };
    
    const deleteRelatedEventData = async (eventID: string): Promise<void> => {
        const eventDoc = doc(relatedEventRef, eventID);
        await deleteDoc(eventDoc);
    };
    
    return (
        <div className="flex justify-center items-center h-64" id="created-related-event-nav">
            {eventExists ? (
                <div className="flex items-center">
                    <Link to="/related-event">
                    {relatedEvent.map((doc) => (
                        <React.Fragment key={doc._id}>
                        <Button>{doc.eventName}</Button>
                            <button className="ml-2 p-1 text-gray-700 rounded-full" onClick={() => handleDelete(doc._id)}>X</button>
                        </React.Fragment>
                    ))}
                    </Link>
                </div>
            ) : (
                <p>No events</p>
            )}
        </div>
    );
};

