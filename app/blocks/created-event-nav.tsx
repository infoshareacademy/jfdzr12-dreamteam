import { Link } from '@remix-run/react';
import { Button } from '~/atoms/ui/button';
import { eventRef } from '~/db/event-ref';
import { deleteDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db } from '~/db/firebase';
import { useCurrentUser } from '~/db/auth';
import { getUserUID } from '~/db/get-user-uid';
import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '~/atoms/ui/card';
import { X } from "lucide-react"


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
        if (user.status === 'authenticated') {
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
        <div className="left-section section">
            {events.map((event) => (
                <React.Fragment key={event._id}>
                    {userUID === event.userUID && (
                        <div key={event._id}>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-2xl text-center">{event.firstPerson} & {event.secondPerson}<span style={{ fontSize: '18px' }}  >👩‍❤️‍👨</span></CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid lg:grid-cols-2 gap-4">
                                        <Button className="p-4" onClick={() => handleDelete(event._id)} variant="secondary">Delete <X className='h-6 text-red-700' /></Button>
                                        <Link to={`your-event/${event.eventID}`} className='grid'>
                                            <Button className="p-4" variant="default">Details</Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}