import { getDocs, query, where } from "firebase/firestore";
import { eventRef } from "./event-ref";
import { getUserUID } from "./get-user-uid";
import { auth } from "./firebase";

export async function getYourEvent() {
        const currentUserUID = await getUserUID();
        if (!currentUserUID) {
        console.log('Użytkownik nie jest zalogowany');
        return;
    } else {   
        const eventQuery = query(eventRef, where("userUID", "==", currentUserUID));
        console.log('current uid from get your event', currentUserUID)
        const querySnapshot = await getDocs(eventQuery);
        if(querySnapshot.empty) {
            console.log("No events");
        } else {
            const lastEventData = querySnapshot.docs[0].data();
            console.log("event data", lastEventData)
            return lastEventData;
        }
    }
}

console.log(auth)


