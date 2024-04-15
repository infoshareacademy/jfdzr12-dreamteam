import { collection } from "firebase/firestore";
import { db } from "./firebase";

export const eventRef = collection(db, 'event');