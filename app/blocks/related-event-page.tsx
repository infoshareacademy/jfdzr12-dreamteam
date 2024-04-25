import { Link, useParams } from "@remix-run/react";
import { PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "~/db/auth";
import { relatedEventRef } from "~/db/event-ref";
import { getYourEvent } from "~/db/get-your-event";
import { RelatedEventData, eventLinkStyleBack, eventLinkStyleOptions, relatedEventDate } from "~/lib/utils";

export default function YourRelatedEvent() {
    const [eventData, setEventData] = useState<RelatedEventData | null>();

    const {currentUserUID, eventID} = useParams();

    const user = useCurrentUser();
    const loading = user.status === 'loading';

    useEffect(() => {
        if(user.status === 'authenticated') {
            getYourEvent(eventID, relatedEventRef)
            .then(res => {
                if (res) {
                    setEventData(res as RelatedEventData);
                } else {
                    setEventData(null);
                }
            })
        } else {
            setEventData(null)
        }
    }, [user.status])

    const eventDateString = relatedEventDate(eventData, loading);
    
    return (
        <>
            {eventData && (
                <>
                    <div className="flex items-center justify-center p-6">
                        <h1 className="italic font-serif text-xl font-bold text-center">{eventData.eventName}</h1>
                    </div>
                    <div className="flex items-center justify-center p-6">
                        <p>{eventDateString}</p>
                    </div>
                    <div className="flex items-center justify-center p-6">
                        <p>{eventData.eventTime}</p>
                    </div>
                    <div className="grid gap-4 justify-items-center">
                        <div className="grid justify-items-center">
                            <PartyPopper className="my-5"/>
                            <p>{`Place: ${eventData.eventPlace}`}</p>
                            <p>{`Street: ${eventData.eventStreetAddress}`}</p>
                            <p>{`City: ${eventData.eventCityAddress}`}</p>
                            <p>{`Country: ${eventData.eventCountryAddress}`}</p>
                        </div>
                    </div>
                    <div className="flex h-[100px] items-center justify-center p-6">
                        <p>{`Event code: ${eventData.eventID}`}</p>
                    </div>
                    {eventData.other && (
                        <>
                        <div className="flex items-center justify-center mt-5">
                            <p>OTHER</p>
                        </div>
                        <div className="flex items-center justify-center p-6 whitespace-pre-wrap">
                            <p>{eventData.other}</p>
                        </div>
                        </>
                    )}
                    <div className="m-10 sm:grid sm:grid-cols-4 sm:gap-4 sm:justify-items-center">
                            <Link to="guestlist" className={eventLinkStyleOptions}>Guest list</Link>
                            <Link to="budget" className={eventLinkStyleOptions}>Budget</Link>
                            <Link to="edit-your-related-event" className={eventLinkStyleOptions}>Edit</Link>
                            <Link to={`/${currentUserUID}/events`} className={eventLinkStyleBack}>Back to your events</Link>
                    </div>
                </>
            )}
        </>
    );
}