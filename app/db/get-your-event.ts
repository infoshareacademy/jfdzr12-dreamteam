import { CollectionReference, getDocs, query, where } from "firebase/firestore";

export async function getYourEvent(id: string | undefined, ref: CollectionReference) { 
    const eventQuery = query(ref, where("eventID", "==", id));
    const querySnapshot = await getDocs(eventQuery);
    const eventData = querySnapshot.docs[0].data();
    return eventData;
}
