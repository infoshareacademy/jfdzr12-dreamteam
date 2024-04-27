// getBudgetsFromFirebase.tsx

import { db } from './firebase';
import { collection, getDocs, query, where } from 'firebase/firestore'; 




// export const getBudgetsFromFirebase = async (eventID:string) => {
//   try {
//     const querySnapshot = await getDocs(collection(db, 'budget'));
//     const budgets = querySnapshot.docs.map(doc => doc.id);
//     return budgets;
//   } catch (error) {
//     throw new Error("Błąd podczas pobierania budżetów z Firebase: " + error);
//   }
// };




export const getBudgetsFromFirebase = async (eventID: string) => {
  
  try {



    // Zmodyfikuj zapytanie tak, aby pobierało tylko budżety przypisane do konkretnego wydarzenia
    console.log("eventID", eventID)

    const collectionbudget = collection(db, 'budget')
    console.log("qcollectionbudget", collectionbudget)
    const whereBudget = where('eventID', '==', eventID)
    console.log("whereBudget", whereBudget)
    const quaryBudget = query(collectionbudget, whereBudget)
    console.log("quaryBudget", quaryBudget)

    const querySnapshot = await getDocs(quaryBudget);
    console.log("quer snapshot", querySnapshot)
    const budgets = querySnapshot.docs.map(doc => doc.id);
    return budgets;
  } catch (error) {
    throw new Error("Błąd podczas pobierania budżetów z Firebase: " + error);
  }
};