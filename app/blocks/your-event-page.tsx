import { Link, useParams } from "@remix-run/react";
import { Heart, HeartHandshake, Wine } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "~/atoms/ui/button";
import { Card } from "~/atoms/ui/card";
import { useCurrentUser } from "~/db/auth";
import { eventRef } from "~/db/event-ref";
import { getYourEvent } from "~/db/get-your-event";
import { EventData, calculateEventContent } from "~/lib/utils";

export default function YourEvent() {
    const [eventData, setEventData] = useState<EventData | null>();

    const { currentUserUID, eventID } = useParams();

    const user = useCurrentUser();
    const loading = user.status === 'loading';

    useEffect(() => {
        if (user.status === 'authenticated') {
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
                <Card className="absolute z-20 top-20 inset-x-1/2 -translate-x-1/2 w-80 sm:w-11/12 lg:w-10/12 2xl:w-9/12 p-5">
                    <div className="flex items-center justify-center mt-5 mb-10 p-6">
                        <h1 className="text-center scroll-m-20 text-xl font-bold md:text-2xl lg:text-3xl xl:text-3xl 2xl:text-5xl">{content}</h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-items-center">
                        <Card className="grid col-start-1 justify-items-center w-full p-5">
                            <HeartHandshake className="mb-5" />
                            <h1 className="mb-5">CEREMONY</h1>
                            <p className="text-center">{`Place: ${eventData.ceremonyPlace}`}</p>
                            <p className="text-center">{`Street: ${eventData.ceremonyStreetAddress}`}</p>
                            <p className="text-center">{`City: ${eventData.ceremonyCityAddress}`}</p>
                            <p className="text-center">{`Country: ${eventData.ceremonyCountryAddress}`}</p>
                        </Card>
                        <Card className="grid justify-items-center w-full p-5">
                            <div className="flex items-center justify-center p-6">
                                <p>{eventDate}</p>
                            </div>
                            <div className="flex items-center justify-center">
                                <Heart />
                            </div>
                            <div className="flex items-center justify-center p-6">
                                <p>{eventData.eventTime}</p>
                            </div>
                        </Card>
                        <Card className="grid justify-items-center w-full p-5">
                            <Wine className="mb-5" />
                            <h1 className="mb-5">RECEPTION</h1>
                            <p className="text-center">{`Place: ${eventData.receptionPlace}`}</p>
                            <p className="text-center">{`Street: ${eventData.receptionStreetAddress}`}</p>
                            <p className="text-center">{`City: ${eventData.receptionCityAddress}`}</p>
                            <p className="text-center">{`Country: ${eventData.receptionCountryAddress}`}</p>
                        </Card>
                    </div>
                    {eventData.other && (
                        <Card className="mt-4">
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
                        <Link to="edit-your-event"><Button className="w-full inline-flex" variant="mainOutline">Edit</Button></Link>
                        <Link to={`/${currentUserUID}/events`}><Button className="w-full inline-flex" variant="ghost">Back to your events</Button></Link>
                    </div>
                </Card>
            )}
        </>
    );
}
