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
    receptionPlace: string,
    receptionStreetAddress: string,
    receptionCityAddress: string,
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

    if(eventData) {
        const today: Date = new Date();
        const eventDate: Date = new Date(eventData.eventDate);
        const timeDifference: number = eventDate.getTime() - today.getTime();

        if(timeDifference < 0) {
            content = "Wydarzenie już się odbyło";
        } else {
            const numberOfDaysToEvent = Math.floor(timeDifference / (1000 * 3600 * 24));
            content = numberOfDaysToEvent;
        }
    } 
    

    return (
        <>
        {eventData && (
            <ResizablePanelGroup
                direction="horizontal"
                className="max-w-md rounded-lg border"
            >
                <ResizablePanel defaultSize={100}>
                    <div className="flex h-[200px] items-center justify-center p-6">
                        <span className="font-semibold">{content}</span>
                        <span className="font-semibold">{eventData.eventTime}</span>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={25}>
                        <div className="flex h-full items-center justify-center p-6">
                            <p className="font-semibold">{eventData.ceremonyPlace}</p>
                            <p className="font-semibold">{eventData.ceremonyStreetAddress}</p>
                            <p className="font-semibold">{eventData.ceremonyCityAddress}</p>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={75}>
                        <div className="flex h-full items-center justify-center p-6">
                            <p className="font-semibold">{eventData.receptionPlace}</p>
                            <p className="font-semibold">{eventData.receptionStreetAddress}</p>
                            <p className="font-semibold">{eventData.receptionCityAddress}</p>
                        </div>
                    </ResizablePanel>
                    </ResizablePanelGroup>
                </ResizablePanel>
            </ResizablePanelGroup>
        )}
        </>
    );
}
