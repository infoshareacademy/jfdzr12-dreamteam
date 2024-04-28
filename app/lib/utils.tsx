import { type ClassValue, clsx } from "clsx"
import { PartyPopper } from "lucide-react";
import { twMerge } from "tailwind-merge"
import { getLastEventID } from "~/db/last-event-id";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

async function* UniqueCodeGenerator() {
  while (true) {
    const lastEventID = await getLastEventID();
    const nextEventID = lastEventID + 1;
    yield nextEventID;
  }
}

export const uniqueCodeGenerator = UniqueCodeGenerator();


export interface EventData {
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
  other?: string,
  eventID: string,
  userUID: string,
}

export interface RelatedEventData {
  eventName: string,
  eventDate: string,
  eventTime: string,
  eventPlace: string,
  eventStreetAddress: string,
  eventCityAddress: string,
  eventCountryAddress: string,
  eventCode?: string,
  other?: string,
  eventID: string,
  userUID: string,
}


export function calculateEventContent(eventData: EventData | null | undefined, loading: boolean): { content: string | JSX.Element, eventType?: string, eventDate: string } | undefined {
  if (!loading && eventData) {
    const today: Date = new Date();
    today.setHours(0, 0, 0, 0);
    const eventDate: Date = new Date(eventData.eventDate);
    eventDate.setHours(0, 0, 0, 0);
    const timeDifference: number = eventDate.getTime() - today.getTime();
    const numberOfDays = Math.floor(timeDifference / (1000 * 3600 * 24));
    const eventDateString: string = eventDate.toLocaleDateString("en-GB");

    if (numberOfDays < -1) {
      return { content: `You were married ${Math.abs(numberOfDays)} days ago. Best wishes!`, eventDate: eventDateString };
    } else if (numberOfDays === -1) {
      return { content: "You were married yesterday. Best wishes!", eventDate: eventDateString };
    } else if (numberOfDays === 0) {
      const partyPopper = <PartyPopper className="inline" />;
      const content = (
        <div className="flex items-center">
          {partyPopper}<p className="ml-5 mr-5">Your wedding is today! Have fun!</p>{partyPopper}
        </div>
      );
      return { content, eventDate: eventDateString };
    } else if (numberOfDays === 1) {
      return { content: "Your wedding is tomorrow! Are you ready?", eventDate: eventDateString };
    } else {
      return { content: `${numberOfDays} days until ${eventData.firstPerson} & ${eventData.secondPerson}'s wedding`, eventDate: eventDateString };
    }
  }

  return undefined;
}


export function relatedEventDate(eventData: RelatedEventData | null | undefined, loading: boolean) {
  if (!loading && eventData) {
    const eventDate: Date = new Date(eventData.eventDate);
    eventDate.setHours(0, 0, 0, 0);
    const eventDateString: string = eventDate.toLocaleDateString("en-GB");
    return eventDateString;
  }
}

export const mainCardOnPage = "absolute z-20 top-20 inset-x-1/2 -translate-x-1/2 w-80 sm:w-11/12 lg:w-10/12 2xl:w-9/12 mb-8"
export const transparentCardOnPage = "absolute z-20 top-20 inset-x-1/2 -translate-x-1/2 w-80 sm:w-11/12 lg:w-10/12 2xl:w-9/12 mb-8 bg-background/20"
