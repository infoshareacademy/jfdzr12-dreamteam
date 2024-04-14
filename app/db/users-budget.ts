import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import {db} from "./firebase"



interface Budget {

    element: string,
    amount: number,

}

const budgetsCollection = collection(db, "budget")


export function addBudget (budget:Budget) {

  console.log("addbudget", budget)
  const newDoc = doc(budgetsCollection)
  return setDoc(newDoc, budget).then((data)=>{console.log('addDoc', data); return data} ).catch(e => {
      console.error('addDoc', e)
      throw e;
    }).finally(() => console.log('addDoc:done'))

  // return addDoc(collection(db, "budget"), budget).then((data)=>{console.log('addDoc', data); return data} ).catch(e => {
  //   console.error('addDoc', e)
  //   throw e;
  // }).finally(() => console.log('addDoc:done'))
  
   
}



// const budgetsCollection = collection(db, "budget");

// export async function addBudget(budget: Budget) {
//   try {
//     const docRef = await addDoc(budgetsCollection, budget);
//     console.log("Document written with ID: ", docRef.id);
//     return docRef.id; // Zwracamy ID nowo utworzonego dokumentu
//   } catch (error) {
//     console.error("Error adding document: ", error);
//     throw error; // Rzucamy błąd w przypadku niepowodzenia
//   }
// }

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
