// import { collection } from "firebase/firestore";
// import { db } from "~/db/firebase";
// export const eventRef = collection(db, 'event');

// export const eventIdref = collection(db, 'eventID');

// import { getDocs, query, where } from "firebase/firestore";

// const eventIdQuery = query(eventRef, where("eventID", "==", "1016"));

// export async function getYourEvent() {
//     const querySnapshot = await getDocs(eventIdQuery);
//     if(querySnapshot.empty) {
//         console.log("No events");
//     } else {
//         const lastEvent = querySnapshot.docs[0];
//         const lastEventData = lastEvent.data();
//         console.log("event data", lastEventData)
//         return lastEventData;
//     }
// }


import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Button } from '~/atoms/ui/button';
// import { getYourEvent } from '??';; , jak Monia doda funkcję to ścieżka nowa będzie
// import { eventRef } from '??';; , jak Monia doda funkcję to ścieżka nowa będzie
export const CreatedEventNav = () => {
    const [brideName, setBrideName] = useState('');
    const [groomName, setGroomName] = useState('');

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const eventData = await getYourEvent();
                if (eventData) {
                    setBrideName(eventData.firstPerson);
                    setGroomName(eventData.secondPerson);
                }
            } catch (error) {
                console.error('Error fetching event data:', error);
            }
        };

        fetchEvent();
    }, []);

    return (
        <div className="flex justify-center items-center h-64">
            <NavLink to="/your-event">
                <Button>{brideName} & {groomName}</Button>
            </NavLink>
        </div>
    );
};

