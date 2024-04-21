import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '~/atoms/ui/button';
import { eventRef } from '~/db/event-ref';
import { deleteDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db } from '~/db/firebase';
export const CreatedEventNav = () => {
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

