import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button } from '~/atoms/ui/button';
import { getYourEvent } from '~/db/get-your-event';
import { eventRef } from '~/db/event-ref';
import { deleteDoc, doc } from "firebase/firestore";
import { getUserUID } from '~/db/get-user-uid';

export const CreatedEventNav = () => {
    const [brideName, setBrideName] = useState('');
    const [groomName, setGroomName] = useState('');
    const [eventExists, setEventExists] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        getYourEvent()
            .then((eventData) => {
                if (eventData) {
                    setBrideName(eventData.firstPerson);
                    setGroomName(eventData.secondPerson);
                    setEventExists(true); 
                }
            })
            .catch((error) => {
                console.error('Error retrieving event data', error);
            });
    }, []);

    const handleDelete = async () => {
        const createdEventNav = document.getElementById('created-event-nav');
        if (createdEventNav) {
            createdEventNav.remove();
            getUserUID()
                .then(async (currentUserUID) => {
                    if (currentUserUID) {
                        await deleteEventData(currentUserUID);
                        console.log('The event data has been successfully deleted');
                        navigate('/add-event');
                    }
                })
                .catch((error) => {
                    console.error('Error deleting event data', error);
                });
        }
    };

    const deleteEventData = async (currentUserUID: string): Promise<void> => {
        await deleteDoc(doc(eventRef, currentUserUID));
    };

    return (
        <div className="flex justify-center items-center h-64" id="created-event-nav">
            {eventExists ? ( 
                <div className="flex items-center">
                    <NavLink to="/your-event">
                        <Button>{brideName} & {groomName}</Button>
                    </NavLink>
                    <button className="ml-2 p-1 text-gray-700 rounded-full" onClick={handleDelete}> X </button>
                </div>
            ) : (
                <p>No events</p>
            )}
        </div>
    );
};
