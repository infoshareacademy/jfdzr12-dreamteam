import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import {db} from "./firebase"

// interface Budget {

//     element: string,
//     amount: number,}

// const budgetsCollection = collection(db, "budget")

// export function addBudget (budget:Budget) {
//   // console.log("addbudget", budget)
//   const newDoc = doc(budgetsCollection)
//   return setDoc(newDoc, budget).then((data)=>{console.log('addDoc', data); return data} ).catch(e => {
//       console.error('addDoc', e)
//       throw e;
//     }).finally(() => console.log('addDoc:done'))}


interface Budget {
  element: string;
  amount: number;
}

const budgetsCollection = collection(db, "budget");

export function addBudget(budgetData: Budget[]) {
  // Tworzymy dokument do dodania
  const newDoc = doc(budgetsCollection);

  // Ustawiamy dokument z budżetem w kolekcji
  return setDoc(newDoc, { budget: budgetData }).then(() => {
    console.log('Budżet zapisany pomyślnie!');
    alert('Budżet zapisany pomyślnie!');
  }).catch((error) => {
    console.error('Błąd podczas zapisywania budżetu: ', error);
    throw error;
  });
}