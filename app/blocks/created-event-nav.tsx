import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '~/atoms/ui/button';
import { getYourEvent } from '~/db/get-your-event';
import { eventRef } from '~/db/event-ref';
import { deleteDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { getUserUID } from '~/db/get-user-uid';
import { db } from '~/db/firebase';
export const CreatedEventNav = () => {
    const [brideName, setBrideName] = useState('');
    const [groomName, setGroomName] = useState('');
    const [eventID, setEventID] = useState('');
    const [event, setEvent] = useState<Event[]>([]);
    const [eventExists, setEventExists] = useState(false);
    const navigate = useNavigate();

    interface Event {
        firstPerson: string;
        secondPerson: string;
        _id: string;
        eventID: string;
    }
    const getEventList = ()=>{
        const eventCollection = collection(db, 'event');
        onSnapshot(eventCollection, res => {
          const eventList = res.docs.map(doc => ({
            _id: doc.id,
            ...doc.data()
          } as Event));
          setEvent(eventList);
          setEventExists(true); 
        });
      };
      useEffect(() => {
        getEventList();
        
      }, []);

console.log("event", event[0])
    
   




    // useEffect(() => {
    //     getYourEvent()
    //         .then((eventData) => {
    //             if (eventData) {
    //                 setBrideName(eventData.firstPerson);
    //                 setGroomName(eventData.secondPerson);
    //                 setEventID(eventData.eventID); 
    //                 setEventExists(true); 
    //             }
    //         })
    //         .catch((error) => {
    //             console.error('Error retrieving event data', error);
    //         });
    // }, []);



    const handleDelete = (eventID: string) => {
        const createdEventNav = document.getElementById('created-event-nav');
        if (createdEventNav) {
            createdEventNav.remove();
            deleteEventData(eventID)
                .then(() => {
                    console.log('The event data has been successfully deleted');
                    navigate('/add-event');
                })
                .catch((error) => {
                    console.error('Error deleting event data', error);
                });
        }
    };
    
    const deleteEventData = async (eventID: string): Promise<void> => {
        const eventDoc = doc(eventRef, eventID);
        await deleteDoc(eventDoc);
    };
    
    return (
        <div className="flex justify-center items-center h-64" id="created-event-nav">
            {eventExists ? ( 
                <div className="flex items-center">
                    <Link to="/your-event">
                        {event.map((doc)=>(
                        <>
                        <Button key={doc._id} >{doc.firstPerson} & {doc.secondPerson}
                        </Button> 
                        <button className="ml-2 p-1 text-gray-700 rounded-full" onClick={() => handleDelete(doc._id)}> X </button>
                        </>
                        ))}
                        
                    </Link>
                    

                </div>
            ) : (
                <p>No events</p>
            )}
        </div>
    );
}

