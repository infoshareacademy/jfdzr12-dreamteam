import { collection } from "firebase/firestore";
import { db } from "./firebase";

export const eventRef = collection(db, 'event');

export const eventIdref = collection(db, 'eventID');

export const relatedEventRef = collection(db, 'relatedEvent');