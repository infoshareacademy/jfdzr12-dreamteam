import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '~/atoms/ui/button';
import { getYourEvent } from '~/db/get-your-event';
import { eventRef } from '~/db/event-ref';

export const CreatedEventNav = () => {
    const [brideName, setBrideName] = useState('');
    const [groomName, setGroomName] = useState('');
    const [eventExists, setEventExists] = useState(false);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getYourEvent();
                if (eventData) {
                    setBrideName(eventData.firstPerson);
                    setGroomName(eventData.secondPerson);
                    setEventExists(true); 
                }
            } catch (error) {
                console.error('Error retrieving event data:', error);
            }
        };

        fetchEvent();
    }, []);

    const handleDelete = () => {
        const createdEventNav = document.getElementById('created-event-nav');
        if (createdEventNav) {
            createdEventNav.remove();
        }
    };

    return (
        <div className="flex justify-center items-center h-64" id="created-event-nav">
            {eventExists ? ( 
                <div className="flex items-center">
                    
                    <NavLink to="/your-event">
                        <Button>{brideName} & {groomName}</Button>
                    </NavLink>
                    
                    <button
                        className="ml-2 p-1 text-gray-700 rounded-full"
                        onClick={handleDelete}
                    >
                        X
                    </button>
                </div>
            ) : (
                <p>No events</p>
            )}
        </div>
    );
};