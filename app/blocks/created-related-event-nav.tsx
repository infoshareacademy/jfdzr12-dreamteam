import { useEffect, useState } from 'react';
import { Link } from '@remix-run/react';
import { Button } from '~/atoms/ui/button';
import { relatedEventRef } from '~/db/event-ref';
import { deleteDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db } from '~/db/firebase';
import React from 'react';
import { useCurrentUser } from '~/db/auth';
import { getUserUID } from '~/db/get-user-uid';
import { PartyPopper, X } from 'lucide-react';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '~/atoms/ui/card';

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
        // <div id="created-related-event-nav">
        <div className="grid gap-4">
            {relatedEvents.map((event) => (
                userUID === event.userUID && (
                    <div key={event._id}>
                        <Card className='shadow-xl'>
                            <CardHeader>
                                <CardTitle className="text-2xl text-center">{event.eventName}<span className="ml-2" style={{ fontSize: '18px' }} >🎉</span></CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid lg:grid-cols-2 gap-4">
                                    <Button className="p-4" onClick={() => handleDelete(event._id)} variant="secondary">Delete<X className='h-6 text-red-700' /></Button>
                                    <Link to={`related-event/${event.eventID}`} className='grid'>
                                        <Button className="p-4" variant="default">Details</Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            ))}
        </div>
        // </div>
    )
}