import { db } from './firebase'; // Zaimportuj obiekt db z Firebase
import { doc, getDoc } from 'firebase/firestore'; // Zaimportuj metody Firestore

export const getBudgetDataFromFirebase = async (documentName: string) => {
  try {
    const docRef = doc(db, 'budget', documentName); // Referencja do dokumentu w kolekcji 'budgets'
    const docSnap = await getDoc(docRef); // Pobierz dokument z bazy danych
    console.log("docSnap", docSnap)
    console.log("docSnap(data)", docSnap.data())
    if (docSnap.exists()) {
      return docSnap.data(); // Zwróć dane dokumentu
      
      
    } else {
      throw new Error('Document does not exist');
    }
  } catch (error) {
    throw new Error("Błąd podczas pobierania danych budżetu z Firebase: " + error);
  }
};


// export const getBudgetDataFromFirebase = async (documentName: string) => {
//   try {
//     const docRef = doc(db, 'budget', documentName);
//     const docSnap = await getDoc(docRef);
    
//     if (docSnap.exists()) {
//       const budgetData = docSnap.data();
//       return budgetData ? budgetData.elements : []; // Zwróć pole 'elements' lub pustą tablicę, jeśli nie istnieje
//     } else {
//       throw new Error('Document does not exist');
//     }
//   } catch (error) {
//     throw new Error("Błąd podczas pobierania danych budżetu z Firebase: " + error);
//   }
// };
