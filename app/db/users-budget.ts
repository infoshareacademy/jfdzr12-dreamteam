import { collection, addDoc } from "firebase/firestore"; 
import {db} from "./firebase"


interface Budget {

    element: string,
    amount: number,

}

const budgetsCollection = collection(db, "budget")

export function addBudget (budget:Budget) {

  return addDoc(budgetsCollection, budget)
   
}

// try {
//   const docRef = await addDoc(collection(db, "users"), {
//     first: "Ada",
//     last: "Lovelace",
//     born: 1815
//   });
//   console.log("Document written with ID: ", docRef.id);
// } catch (e) {
//   console.error("Error adding document: ", e);
// }

// const handleSaveBudget = () => {}

//   db.collection('userBudgets').add({
//     budgetItems: budgetEl.map((item, index) => ({
//       name: item,
//       amount: budgetElAmount[index]
//     }))
//   }).then(() => {
//     console.log("Budżet zapisany pomyślnie!");
//   }).catch((error) => {
//     console.error("Błąd podczas zapisywania budżetu: ", error);
//   });
