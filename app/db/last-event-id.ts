import { getDocs, limit, orderBy, query } from "firebase/firestore";
import { eventIdref } from "./event-ref";

const eventIdQuery = query(eventIdref, orderBy('ID', 'desc'), limit(1));

export async function getLastEventID() {
    const querySnapshot = await getDocs(eventIdQuery);
    if(querySnapshot.empty) {
        return 1000;
    } else {
    const lastEvent = querySnapshot.docs[0];
    const lastEventID = parseInt(lastEvent.data().ID);
    return lastEventID;
    }
}