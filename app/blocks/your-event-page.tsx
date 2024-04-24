import { Link, useParams } from "@remix-run/react";
import { Heart, HeartHandshake, Wine } from "lucide-react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "~/db/auth";
import { eventRef } from "~/db/event-ref";
import { getYourEvent } from "~/db/get-your-event";
import { EventData, calculateEventContent } from "~/lib/utils";

export default function YourEvent() {
    const [eventData, setEventData] = useState<EventData | null>();

    const {currentUserUID, eventID} = useParams();

    const user = useCurrentUser();
    const loading = user.status === 'loading';

    useEffect(() => {
        if(user.status === 'authenticated') {
            getYourEvent(eventID, eventRef)
            .then(res => {
                if (res) {
                    setEventData(res as EventData);
                } else {
                    setEventData(null);
                }
            })
        } else {
            setEventData(null)
        }
    }, [user.status])

    const contentData = calculateEventContent(eventData, loading);
    const content = contentData?.content;
    const eventDate = contentData?.eventDate;
    
    return (
        <>
            {eventData && (
                <>
                    <div className="flex items-center justify-center mt-5 mb-5 p-6">
                        <h1 className="italic font-serif text-xl font-bold text-center">{content}</h1>
                    </div>
                    <div className="grid grid-cols-3 gap-4 justify-items-center">
                        <div className="grid col-start-1 justify-items-center">
                            <HeartHandshake className="my-5"/>
                            <h1 className="mb-5">CEREMONY</h1>
                            <p className="text-center">{`Place: ${eventData.ceremonyPlace}`}</p>
                            <p className="text-center">{`Street: ${eventData.ceremonyStreetAddress}`}</p>
                            <p className="text-center">{`City: ${eventData.ceremonyCityAddress}`}</p>
                            <p className="text-center">{`Country: ${eventData.ceremonyCountryAddress}`}</p>
                        </div>
                        <div className="grid justify-items-center">
                            <div className="flex items-center justify-center p-6">
                                <p>{eventDate}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <Heart/>
                            </div>
                            <div className="flex items-center justify-center p-6">
                                <p>{eventData.eventTime}</p>
                            </div>
                        </div>
                        <div className="grid justify-items-center">
                            <Wine className="my-5"/>
                            <h1 className="mb-5">RECEPTION</h1>
                            <p className="text-center">{`Place: ${eventData.receptionPlace}`}</p>
                            <p className="text-center">{`Street: ${eventData.receptionStreetAddress}`}</p>
                            <p className="text-center">{`City: ${eventData.receptionCityAddress}`}</p>
                            <p className="text-center">{`Country: ${eventData.receptionCountryAddress}`}</p>
                        </div>
                    </div>
                    <div className="flex mt-20 items-center justify-center p-6">
                        <p>{`Event code: ${eventData.eventID}`}</p>
                    </div>
                    {eventData.other && (
                        <>
                        <div className="flex items-center justify-center mt-20">
                            <p>OTHER</p>
                        </div>
                        <div className="flex items-center justify-center p-6 whitespace-pre-wrap">
                            <p>{eventData.other}</p>
                        </div>
                        </>
                    )}
                    <div className="m-10 sm:grid sm:grid-cols-4 sm:gap-4 sm:justify-items-center">
                            <Link to="guestlist" className="h-10 w-full px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Guest list</Link>
                            <Link to="budget" className="h-10 w-full px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Budget</Link>
                            <Link to="edit-your-event" className="h-10 w-full px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Edit</Link>
                            <Link to={`/${currentUserUID}/events`} className="h-10 w-full px-4 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Back to your events</Link>
                    </div>
                </>
            )}
        </>
    );
}
