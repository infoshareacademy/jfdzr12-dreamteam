import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

const guestRef = collection(db, 'guest');

export interface NewGuest {
    presence: string;
    alcohols?: string[];
}

export function addGuest (guest: NewGuest) {
    addDoc(guestRef, guest)
}