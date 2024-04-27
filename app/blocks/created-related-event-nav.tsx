import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { Button } from '~/atoms/ui/button';
import { relatedEventRef } from '~/db/event-ref';
import { deleteDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db } from '~/db/firebase';
import React from 'react';
import { useCurrentUser } from '~/db/auth';
import { getUserUID } from '~/db/get-user-uid';
import { X } from 'lucide-react';


interface RelatedEvent {
    eventName: string;
    _id: string;
    eventID: string;
    userUID: string;
}

export const CreatedRelatedEventNav = () => {
    const [relatedEvents, setRelatedEvents] = useState<RelatedEvent[]>([]);
    const [userUID, setUserUID] = useState<string | null>();
    const user = useCurrentUser();

    useEffect(() => {
        if (user.status === 'authenticated') {
            getUserUID().then(uid => setUserUID(uid)); 
        } else {
            setUserUID(null);
        }
    }, [user.status]);

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
    <div id="created-related-event-nav">
        <div className="flex flex-col items-center"> 
        {relatedEvents.map((event) => (
            userUID === event.userUID && ( 
                <div className="m-4" key={event._id}>
                    <Link to={`related-event/${event.eventID}`}>
                        <Button className="p-4 " variant="outline">{event.eventName}</Button>
                    </Link>
                    <button className=" p-1 rounded-full mt-2 sticky top-0 " onClick={() => handleDelete(event._id)}><X size={16} /></button>
                </div>
            )
        ))}
    </div>
    </div>
);
};

