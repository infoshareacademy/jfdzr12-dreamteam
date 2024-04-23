import { CollectionReference, collection } from "firebase/firestore";
import { db } from "./firebase";

export const eventRef: CollectionReference = collection(db, 'event');

export const eventIdref: CollectionReference = collection(db, 'eventID');

export const relatedEventRef: CollectionReference = collection(db, 'relatedEvent');