// import { useEffect, useState } from 'react';
// import { Link } from '@remix-run/react';
// import { Button } from '~/atoms/ui/button';
// import { eventRef } from '~/db/event-ref';
// import { deleteDoc, doc, onSnapshot, collection } from "firebase/firestore";
// import { db } from '~/db/firebase';
// import React from 'react';
// import { useCurrentUser } from '~/db/auth';
// import { getUserUID } from '~/db/get-user-uid';

// export const CreatedEventNav = () => {
//     const [events, setEvents] = useState<Event[]>([]);
//     const [userUID, setUserUID] = useState<string | null>();
//     const user = useCurrentUser();
    
//     useEffect(() => {
//         if(user.status === 'authenticated') {
//             getUserUID()
//                 .then(res => setUserUID(res))
//         } else {
//             setUserUID(null)
//         }
//     }, [user.status])

//     interface Event {
//         firstPerson: string;
//         secondPerson: string;
//         _id: string;
//         eventID: string;
//         userUID: string;
//     }

//     const getEventList = () => {
//         const eventCollection = collection(db, 'event');
//         onSnapshot(eventCollection, res => {
//             const eventList = res.docs.map(doc => ({
//                 _id: doc.id,
//                 ...doc.data()
//             } as Event));
//             setEvents(eventList);
//         });
//     };

//     useEffect(() => {
//         getEventList();
//     }, []);

//     const handleDelete = (eventID: string) => {
//         const eventDoc = doc(eventRef, eventID);
//         deleteDoc(eventDoc)
//             .then(() => {
//                 setEvents(prevEvents => prevEvents.filter(event => event._id !== eventID));
//                 console.log('The event data has been successfully deleted');
//             })
//             .catch(error => {
//                 console.error('Error deleting event data', error);
//             });
//     };
    

// return (
//     <div className="flex justify-left items-center " id="created-event-nav">
//       <div className="flex flex-col items-center">
//         <div className="flex justify-center flex-wrap">
//           {events.map((event) => (
//             <React.Fragment key={event._id}>
//               {userUID === event.userUID && (
//                 <div className="m-4"> 
//                   <Link to={`your-event/${event.eventID}`}>
//                     <Button className="p-4 text-gray-700" variant="outline">{event.firstPerson} & {event.secondPerson}</Button>
//                   </Link>
//                   <button className="p-1 text-gray-700 rounded-full mt-2 sticky top-0" onClick={() => handleDelete(event._id)}>X</button>
//                 </div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </div>
//     );
// }


import { Link } from '@remix-run/react';
import { Button } from '~/atoms/ui/button';
import { eventRef } from '~/db/event-ref';
import { deleteDoc, doc, onSnapshot, collection } from "firebase/firestore";
import { db } from '~/db/firebase';
import { useCurrentUser } from '~/db/auth';
import { getUserUID } from '~/db/get-user-uid';
import React, { useEffect, useState } from 'react';

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
                <div className="flex flex-col items-center">
                    <div className="m-4"> 
                      
                    </div>
                    <div className="flex flex-col items-center"> {/* Nowy kontener dla kafelków z imionami */}
                        {events.map((event) => (
                            <React.Fragment key={event._id}>
                                {userUID === event.userUID && (
                                    <div className="m-4"> 
                                        <Link to={`your-event/${event.eventID}`}>
                                            <Button className="p-4 " variant="outline">{event.firstPerson} & {event.secondPerson}</Button>
                                        </Link>
                                        <button className="p-1  rounded-full mt-2 sticky top-0" onClick={() => handleDelete(event._id)}>X</button>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <div className="right-section section">
                {/* Prawa sekcja, jeśli jest potrzebna */}
            </div>
            <style>{`
                .container {
                    display: flex;
                    flex-wrap: wrap;
                }

                .section {
                    flex: 1;
                    text-align: center;
                    padding: 20px;
                }

                .right-section {
                    border-left: 1px solid #ccc;
                }

                .add-button {
                    display: block;
                    width: 80%;
                    margin: 30px auto;
                }
            `}</style>
        </div>
    );
}
