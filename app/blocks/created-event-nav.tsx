
import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { Button } from '~/atoms/ui/button';
import { eventRef } from '~/db/event-ref';
import { deleteDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db } from '~/db/firebase';
import React from 'react';
import { useCurrentUser } from '~/db/auth';
import { getUserUID } from '~/db/get-user-uid';

export const CreatedEventNav = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [userUID, setUserUID] = useState<string | null>();
    const user = useCurrentUser();
    
    useEffect(() => {
        if(user.status === 'authenticated') {
            getUserUID()
                .then(res => setUserUID(res))
        } else {
            setUserUID(null)
        }
    }, [user.status])

    interface Event {
        firstPerson: string;
        secondPerson: string;
        _id: string;
        eventID: string;
        userUID: string;
    }

    const getEventList = () => {
        const eventCollection = collection(db, 'event');
        onSnapshot(eventCollection, res => {
            const eventList = res.docs.map(doc => ({
                _id: doc.id,
                ...doc.data()
            } as Event));
            setEvents(eventList);
        });
    };

    useEffect(() => {
        getEventList();
    }, []);

    const handleDelete = (eventID: string) => {
        const eventDoc = doc(eventRef, eventID);
        deleteDoc(eventDoc)
            .then(() => {
                setEvents(prevEvents => prevEvents.filter(event => event._id !== eventID));
                console.log('The event data has been successfully deleted');
            })
            .catch(error => {
                console.error('Error deleting event data', error);
            });
    };
    
    return (
        <div className="flex justify-center items-center h-64" id="created-event-nav">
            <div className="flex items-center">
                {events.map((event) => (
                    <React.Fragment key={event._id}>
                        {userUID === event.userUID && (
                            <React.Fragment>
                                <Link to={`your-event/${event.eventID}`}>
                                    <Button>{event.firstPerson} & {event.secondPerson}</Button>
                                </Link>
                                <button className="ml-2 p-1 text-gray-700 rounded-full" onClick={() => handleDelete(event._id)}> X </button>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
