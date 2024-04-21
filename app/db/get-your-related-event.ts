import { getDocs, query, where } from "firebase/firestore";
import { relatedEventRef } from "./event-ref";
import { getUserUID } from "./get-user-uid";

export async function getYourRelatedEvent() {
    const currentUserUID = await getUserUID();
    if (!currentUserUID) {
        console.log('Użytkownik nie jest zalogowany');
        return;
    } else {   
        const eventQuery = query(relatedEventRef, where("userUID", "==", currentUserUID));
        const querySnapshot = await getDocs(eventQuery);
        console.log('current uid from get your event', currentUserUID)
        if(querySnapshot.empty) {
            console.log("No events");
            return;
        } else {
            const lastEventData = querySnapshot.docs[0].data();
            console.log("event data", lastEventData)
            return lastEventData;
        }
    }
}

// const docRef = doc(db, "event", eventID);
// const querySnapshot = await getDoc(docRef);