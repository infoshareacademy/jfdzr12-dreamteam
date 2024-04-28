import { Link, useParams } from "@remix-run/react";
import { PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Card } from "~/atoms/ui/card";
import { useCurrentUser } from "~/db/auth";
import { relatedEventRef } from "~/db/event-ref";
import { getYourEvent } from "~/db/get-your-event";
import { RelatedEventData, relatedEventDate } from "~/lib/utils";

export default function YourRelatedEvent() {
    const [eventData, setEventData] = useState<RelatedEventData | null>();

    const { eventID } = useParams();

    const user = useCurrentUser();
    const loading = user.status === 'loading';

    useEffect(() => {
        if (user.status === 'authenticated') {
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
                <Card className="absolute z-20 top-20 inset-x-1/2 -translate-x-1/2 w-80 sm:w-11/12 lg:w-10/12 2xl:w-9/12 p-5 bg-background/20">
                    <div className="flex items-center justify-center mb-10 p-6">
                        <h1 className="text-center scroll-m-20 text-xl font-bold md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl">{eventData.eventName}</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center">
                        <Card className="grid col-start-1 justify-items-center w-full p-5 shadow-xl">
                            <div className="flex items-center justify-center p-6">
                                <p>{eventDateString}</p>
                            </div>
                            <div className="flex items-center justify-center p-6">
                                <p>{eventData.eventTime}</p>
                            </div>
                        </Card>
                        <Card className="grid justify-items-center w-full p-5 shadow-xl">
                            <div className="grid gap-4 justify-items-center">
                                <div className="grid justify-items-center">
                                    <PartyPopper className="mb-5" />
                                    <p>{`Place: ${eventData.eventPlace}`}</p>
                                    <p>{`Street: ${eventData.eventStreetAddress}`}</p>
                                    <p>{`City: ${eventData.eventCityAddress}`}</p>
                                    <p>{`Country: ${eventData.eventCountryAddress}`}</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                    {eventData.other && (
                        <Card className="mt-4 shadow-xl">
                            <div className="flex items-center justify-center mt-5">
                                <p>OTHER</p>
                            </div>
                            <div className="flex items-center justify-center p-6 whitespace-pre-wrap">
                                <p>{eventData.other}</p>
                            </div>
                        </Card>
                    )}
                    <div className="mb-5 mt-10 grid grid-cols-1 md:grid-cols-4 gap-4 justify-center">
                        <Link to="guestlist"><Button className="w-full inline-flex" variant="mainOutline">Guest list</Button></Link>
                        <Link to="budget"><Button className="w-full inline-flex" variant="mainOutline">Budget</Button></Link>
                        <Link to="edit-your-related-event"><Button className="w-full inline-flex" variant="mainOutline">Edit</Button></Link>
                        <Link to="/events"><Button className="w-full inline-flex" variant="ghost">Back to your events</Button></Link>
                    </div>
                </Card>
            )}
        </>
    );
}