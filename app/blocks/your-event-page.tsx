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
                    {content && (
                        <>
                            <div className="flex items-center justify-center p-6">
                                <h1 className="italic font-serif text-xl font-bold">{content}</h1>
                            </div>
                            <div className="flex items-center justify-center">
                                <Heart/>
                            </div>
                            <div className="flex items-center justify-center p-6">
                                <p>{eventDate}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <Heart/>
                            </div>
                        </>
                    )}
                    <div className="flex items-center justify-center p-6">
                        <p>{eventData.eventTime}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 justify-items-center">
                        <div className="grid col-start-1 justify-items-center">
                            <HeartHandshake className="my-5"/>
                            <h1 className="mb-5">CEREMONY</h1>
                            <p>{`Place: ${eventData.ceremonyPlace}`}</p>
                            <p>{`Street: ${eventData.ceremonyStreetAddress}`}</p>
                            <p>{`City: ${eventData.ceremonyCityAddress}`}</p>
                            <p>{`Country: ${eventData.ceremonyCountryAddress}`}</p>
                        </div>
                        <div className="grid justify-items-center">
                            <Wine className="my-5"/>
                            <h1 className="mb-5">RECEPTION</h1>
                            <p>{`Place: ${eventData.receptionPlace}`}</p>
                            <p>{`Street: ${eventData.receptionStreetAddress}`}</p>
                            <p>{`City: ${eventData.receptionCityAddress}`}</p>
                            <p>{`Country: ${eventData.receptionCountryAddress}`}</p>
                        </div>
                    </div>
                    <div className="flex h-[100px] items-center justify-center p-6">
                        <p>{`Event code: ${eventData.eventID}`}</p>
                    </div>
                    {eventData.other && (
                        <div className="flex items-center justify-center p-6 mb-10">
                            <p>{`Other: ${eventData.other}`}</p>
                        </div>
                    )}
                    <div className="grid grid-cols-4 gap-4 justify-items-center m-10 sticky bottom-0">
                        <div className="col-start-1">
                            <Link to="guestlist">Guest list</Link>
                        </div>
                        <div>
                            <Link to="budget">Budget</Link>
                        </div>
                        <div>
                            <Link to="edit-your-event">Edit</Link>
                        </div>
                        <div>
                            <Link to={`/${currentUserUID}/events`}>Back to your events</Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
