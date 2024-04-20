import { type ClassValue, clsx } from "clsx"
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
  eventID: string,
  color: string,
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
  eventID: string,
  userUID: string,
}


export function calculateEventContent(eventData: EventData | null | undefined, loading: boolean): { content: string, eventType?: string, eventDate: string } | undefined {
  if (!loading && eventData) {
      const today: Date = new Date();
      today.setHours(0, 0, 0, 0);
      const eventDate: Date = new Date(eventData.eventDate);
      eventDate.setHours(0, 0, 0, 0);
      const timeDifference: number = eventDate.getTime() - today.getTime();
      const numberOfDays = Math.floor(timeDifference / (1000 * 3600 * 24));
      const eventDateString: string = eventDate.toLocaleDateString("en-GB");

      if (numberOfDays < 0) {
          return { content: `You were married ${Math.abs(numberOfDays)} days ago`, eventDate: eventDateString };
      } else if (numberOfDays === 0) {
          return { content: "Your wedding is today!", eventDate: eventDateString };
      } else if (numberOfDays === 1) {
          return { content: "Your wedding is tomorrow!", eventDate: eventDateString };
      } else {
          return { content: `${numberOfDays} days until ${eventData.firstPerson} and ${eventData.secondPerson}'s wedding`, eventDate: eventDateString };
      }
  }

  return undefined;
}


export function relatedEventDate(eventData: RelatedEventData | null | undefined, loading: boolean) {
  if(!loading && eventData) {
    const eventDate: Date = new Date(eventData.eventDate);
    eventDate.setHours(0, 0, 0, 0);
    const eventDateString: string = eventDate.toLocaleDateString("en-GB");
    return eventDateString;
  }
}