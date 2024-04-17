import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "~/atoms/ui/resizable";
import { getYourEvent } from "~/db/get-your-event";

interface EventData {
    firstPerson: string,
    secondPerson: string,
    eventDate: string,
    eventTime: string,
    ceremonyPlace: string,
    ceremonyStreetAddress: string,
    ceremonyCityAddress: string,
    ceremonyCountryAddress: string,
    receptionPlace: string,
    receptionStreetAddress: string,
    receptionCityAddress: string,
    receptionCountryAddress: string,
    firstPersonPhone: string,
    secondPersonPhone: string,
    eventID: string,
    color: string,
}

export default function YourEvent() {
    const [eventData, setEventData] = useState<EventData>();

    async function getEventData() {
        const data = await getYourEvent();
        setEventData(data as EventData);
    }

    useEffect(() => {
        getEventData();
    }, []);

    let content;
    let eventDateString;

    if(eventData) {
        const today: Date = new Date();
        const eventDate: Date = new Date(eventData.eventDate);
        eventDateString = eventDate.toDateString();
        const timeDifference: number = eventDate.getTime() - today.getTime();
        if(timeDifference < 0) {
            content = "Wydarzenie już się odbyło";
        } else {
            const numberOfDaysToEvent = Math.floor(timeDifference / (1000 * 3600 * 24));
            if(numberOfDaysToEvent > 1) {
            content = `${numberOfDaysToEvent} days until ${eventData.firstPerson} and ${eventData.secondPerson}'s wedding`;
            } else {
                content = `${numberOfDaysToEvent} day until ${eventData.firstPerson} and ${eventData.secondPerson}'s wedding`;
            }
        }
    } 
    
    return (
        <>
            {eventData && (
                <>
                    <div className="flex items-center justify-center p-6">
                        <p>{content}</p>
                    </div>
                    <div className="flex items-center justify-center p-6">
                        <p>{eventDateString}</p>
                    </div>
                    <div className="flex items-center justify-center p-6">
                        <p>{eventData.eventTime}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 justify-items-center">
                        <div className="col-start-1">
                            <h3>Ceremony</h3>
                            <p>{`Place: ${eventData.ceremonyPlace}`}</p>
                            <p>{`Street: ${eventData.ceremonyStreetAddress}`}</p>
                            <p>{`City: ${eventData.ceremonyCityAddress}`}</p>
                            <p>{`Country: ${eventData.ceremonyCountryAddress}`}</p>
                        </div>
                        <div>
                            <h3>Reception</h3>
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
