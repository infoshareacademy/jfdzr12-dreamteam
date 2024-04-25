import { collection, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export const relatedEventGuestRef = collection(db, 'relatedEventGuestList');

export const relatedEventGuestRefOrder = query(relatedEventGuestRef, orderBy('timestamp', 'desc'));

export const relatedEventGuestIdRef = collection(db, 'guestID');