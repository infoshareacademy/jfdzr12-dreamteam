import { getDocs, limit, orderBy, query } from "firebase/firestore";
import { eventRef } from "./event-ref";

const eventIdQuery = query(eventRef, orderBy('eventID', 'desc'), limit(1));

export async function getLastEventID() {
    const querySnapshot = await getDocs(eventIdQuery);
    if(querySnapshot.empty) {
        return 1000;
    } else {
    const lastEvent = querySnapshot.docs[0];
    const lastEventID = parseInt(lastEvent.data().eventID);
    return lastEventID;
    }
}