import { getDocs, query, updateDoc, where } from "firebase/firestore"
import { eventRef } from "./event-ref";

export async function updateYourEvent(eventId: string | null | undefined, formData: any ) {
    if(eventId) {
        const eventQuery = query(eventRef, where("eventID", "==", eventId));
        const querySnapshot = await getDocs(eventQuery);
        console.log('query snapshot', querySnapshot)
        const docRef = querySnapshot.docs[0].ref;
        await updateDoc(docRef, formData);
    }
}