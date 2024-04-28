import { Link } from '@remix-run/react';
import { Button } from '~/atoms/ui/button';
import { eventRef } from '~/db/event-ref';
import { deleteDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db } from '~/db/firebase';
import { useCurrentUser } from '~/db/auth';
import { getUserUID } from '~/db/get-user-uid';
import React, { useEffect, useState } from 'react';
import { CreatedRelatedEventNav } from './created-related-event-nav';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
  } from '~/atoms/ui/card';


interface Event {
    firstPerson: string;
    secondPerson: string;
    _id: string;
    eventID: string;
    userUID: string;
}

export const CreatedEventNav: React.FC = () => {
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
    <div className="container">
        <div className="left-section section">
            {events.map((event) => (
                <React.Fragment key={event._id}>
                    {userUID === event.userUID && (
                        <div className="m-2">
                            <Card className="max-w-md mx-auto">
                                <CardHeader>
                                    <CardTitle className="text-sm">{event.firstPerson} & {event.secondPerson}<span className="ml-2" style={{ fontSize: '18px' }}  >👩‍❤️‍👨</span></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex justify-between items-center">
                                        <Button className="p-4" onClick={() => handleDelete(event._id)} variant="destructive">Delete</Button>
                                        <Link to={`your-event/${event.eventID}`}>
                                            <Button className="p-4 ml-auto" variant="outline">Details</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
        <div className="right-section section">
            <CreatedRelatedEventNav />
        </div>
    </div>
);
}