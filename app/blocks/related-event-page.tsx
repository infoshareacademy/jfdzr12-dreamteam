import { Link, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { useCurrentUser } from "~/db/auth";
import { getYourRelatedEvent } from "~/db/get-your-related-event";
import { RelatedEventData, relatedEventDate } from "~/lib/utils";


export default function YourRelatedEvent() {
    const [eventData, setEventData] = useState<RelatedEventData | null>();
    console.log('your event data', eventData)

    const user = useCurrentUser();
    const loading = user.status === 'loading';

    useEffect(() => {
        if(user.status === 'authenticated') {
            getYourRelatedEvent()
            .then(res => setEventData(res as RelatedEventData))
        } else {
            setEventData(null)
        }
    }, [user.status])

    const {currentUserUID, eventID} = useParams();

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
                    <div className="flex h-[200px] items-center justify-center p-6">
                        <p>{`Event code for your guests: ${eventData.eventID}`}</p>
                    </div>
                    <div className="grid grid-cols-4 gap-4 justify-items-center">
                        <div className="col-start-1">
                            <Link to={`/events/${currentUserUID}/related-event/${eventID}/guestlist`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Add your guests list</Link>
                        </div>
                        <div>
                            <Link to={`/events/${currentUserUID}/related-event/${eventID}/budget`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Add your budget</Link>
                        </div>
                        <div>
                            <Link to={`/events/${currentUserUID}/related-event/${eventID}/edit-your-related-event`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Edit your event</Link>
                        </div>
                        <div>
                            <Link to={`/events/${currentUserUID}`} className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">Back to your events</Link>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}