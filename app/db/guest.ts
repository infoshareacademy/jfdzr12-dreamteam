// import { collection, addDoc } from "firebase/firestore";
// import { db } from "./firebase";

// const guestRef = collection(db, 'guest');

// export interface NewGuest {
//     firstName: string;
//     lastName: string;
//     guestUniqueId: string;
//     presence: string;
//     partner?: string;
//     child?: string;
//     numberOfChildren?: number;
//     selectedMenuGuest?: string;
//     selectedMenuPartner?: string;
//     selectedMenuChild?: string;
//     additionalInfo?: string; 
//     alcohols?: string[];
//     accommodation?: string;
//     transport?: string; 
//     exists: boolean;
// }

// export function addGuest (guest: NewGuest) {
//     addDoc(guestRef, guest)
// }