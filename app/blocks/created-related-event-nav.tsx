import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
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
    const [relatedEvents, setRelatedEvents] = useState<RelatedEvent[]>([]);
    const [eventExists, setEventExists] = useState(false);

    useEffect(() => {
        const unsubscribe = getRelatedEventList();

        return () => {
            unsubscribe(); 
        }
    }, []);

    const getRelatedEventList = () => {
        const relatedEventCollection = collection(db, 'relatedEvent');
        return onSnapshot(relatedEventCollection, res => {
            const relatedEventList = res.docs.map(doc => ({
                _id: doc.id,
                ...doc.data()
            } as RelatedEvent));
            setRelatedEvents(relatedEventList);
            setEventExists(true);
        });
    };

    const handleDelete = (eventID: string) => {
        const eventDoc = doc(relatedEventRef, eventID);
        deleteDoc(eventDoc)
            .then(() => {
                setRelatedEvents(prevEvents => prevEvents.filter(event => event._id !== eventID));
                console.log('The event data has been successfully deleted');
            })
            .catch(error => {
                console.error('Error deleting event data', error);
            });
    };
    
    return (
        <div className="flex justify-center items-center h-64" id="created-related-event-nav">
            {eventExists ? (
                <div className="flex items-center">
                    {relatedEvents.map((event) => (
                        <React.Fragment key={event._id}>
                            <Link to="/related-event"><Button>{event.eventName}</Button></Link>
                            <button className="ml-2 p-1 text-gray-700 rounded-full" onClick={() => handleDelete(event._id)}>X</button>
                        </React.Fragment>
                    ))}
                </div>
            ) : (
                <p>No events</p>
            )}
        </div>
    );
};
