import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "~/db/auth";
import { getYourEvent } from "~/db/get-your-event";
import { EventData, calculateEventContent } from "~/lib/utils";

export default function YourEvent() {
    const [eventData, setEventData] = useState<EventData | null>();

    const user = useCurrentUser();
    const loading = user.status === 'loading';

    useEffect(() => {
        if(user.status === 'authenticated') {
            getYourEvent()
            .then(res => setEventData(res as EventData))
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
                                <p>{content}</p>
                            </div>
                            <div className="flex items-center justify-center p-6">
                                <p>{eventDate}</p>
                            </div>
                        </>
                    )}
                    <div className="flex items-center justify-center p-6">
                        <p>{eventData.eventTime}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 justify-items-center">
                        <div className="grid col-start-1 justify-items-center">
                            <h1>CEREMONY</h1>
                            <p>{`Place: ${eventData.ceremonyPlace}`}</p>
                            <p>{`Street: ${eventData.ceremonyStreetAddress}`}</p>
                            <p>{`City: ${eventData.ceremonyCityAddress}`}</p>
                            <p>{`Country: ${eventData.ceremonyCountryAddress}`}</p>
                        </div>
                        <div className="grid justify-items-center">
                            <h1>RECEPTION</h1>
                            <p>{`Place: ${eventData.receptionPlace}`}</p>
                            <p>{`Street: ${eventData.receptionStreetAddress}`}</p>
                            <p>{`City: ${eventData.receptionCityAddress}`}</p>
                            <p>{`Country: ${eventData.receptionCountryAddress}`}</p>
                        </div>
                    </div>
                    <div className="flex h-[200px] items-center justify-center p-6">
                        <p>{`Event code for your guests: ${eventData.eventID}`}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 justify-items-center">
                        <div className="col-start-1">
                            <Link to="/guestlist">Add your guests list</Link>
                        </div>
                        <div>
                            <Link to="/budget">Add your budget</Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
