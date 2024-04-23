import { CollectionReference, getDocs, query, updateDoc, where } from "firebase/firestore"

export async function updateYourEvent(id: string | undefined, formData: any, ref: CollectionReference ) {
    const eventQuery = query(ref, where("eventID", "==", id));
    const querySnapshot = await getDocs(eventQuery);
    const docRef = querySnapshot.docs[0].ref;
    await updateDoc(docRef, formData);
}