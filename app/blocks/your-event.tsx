import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
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
        today.setHours(0, 0, 0, 0);
        const eventDate: Date = new Date(eventData.eventDate);
        eventDate.setHours(0, 0, 0, 0);
        eventDateString = eventDate.toDateString();
        const timeDifference: number = eventDate.getTime() - today.getTime();
        const numberOfDays = Math.floor(timeDifference / (1000 * 3600 * 24));
        if(numberOfDays < 1) {
            content = `You were married ${Math.abs(numberOfDays)} days ago`;
        } 
        if(numberOfDays === -1) {
            content = "You were married yesterday";
        }
        if(numberOfDays === 0) {
            content = "Your wedding is today!";
        }
        if(numberOfDays === 1) {
            content = "Your wedding is tommorrow!";
        } 
        if(numberOfDays > 1) {
            content = `${Math.abs(numberOfDays)} days until ${eventData.firstPerson} and ${eventData.secondPerson}'s wedding`;
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
