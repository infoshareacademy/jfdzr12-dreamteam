import { getDocs, query, where } from "firebase/firestore";
import { eventRef } from "./event-ref";

const eventIdQuery = query(eventRef, where("eventID", "==", "1016"));

export async function getYourEvent() {
    const querySnapshot = await getDocs(eventIdQuery);
    if(querySnapshot.empty) {
        console.log("No events");
    } else {
        const lastEvent = querySnapshot.docs[0];
        const lastEventData = lastEvent.data();
        console.log("event data", lastEventData)
        return lastEventData;
    }
}