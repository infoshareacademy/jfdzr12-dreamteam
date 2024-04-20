import { collection } from "firebase/firestore";
import { db } from "./firebase";

export const guestRef = collection(db, 'guestlist');

export const guestIdRef = collection(db, 'guestID');