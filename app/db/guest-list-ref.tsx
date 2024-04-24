import { collection, orderBy, query } from "firebase/firestore";
import { db } from "./firebase";

export const guestRef = collection(db, 'guestlist');

export const guestRefOrder = query(guestRef, orderBy('timestamp', 'desc'));

export const guestIdRef = collection(db, 'guestID');

// export const guestPreferRef = collection(db, 'guest')