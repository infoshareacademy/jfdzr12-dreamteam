import { Link, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "~/db/auth";
import { relatedEventRef } from "~/db/event-ref";
import { getYourEvent } from "~/db/get-your-event";
import { RelatedEventData, relatedEventDate } from "~/lib/utils";

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
                        <p>{eventData.eventName}</p>
                    </div>
                    <div className="flex items-center justify-center p-6">
                        <p>{eventDateString}</p>
                    </div>
                    <div className="flex items-center justify-center p-6">
                        <p>{eventData.eventTime}</p>
                    </div>
                    <div className="grid gap-4 justify-items-center">
                        <div className="grid justify-items-center">
                            <h1>EVENT</h1>
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
                        <div className="flex items-center justify-center p-6 mb-10">
                            <p>{`Other: ${eventData.other}`}</p>
                        </div>
                    )}
                    <div className="grid grid-cols-4 gap-4 justify-items-center m-10">
                        <div className="col-start-1">
                            <Link to="guestlist">Guest list</Link>
                        </div>
                        <div>
                            <Link to="budget">Budget</Link>
                        </div>
                        <div>
                            <Link to="edit-your-related-event">Edit</Link>
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