import { db } from './firebase'; // Zaimportuj obiekt db z Firebase
import { doc, getDoc } from 'firebase/firestore'; // Zaimportuj metody Firestore

export const getBudgetDataFromFirebase = async (documentName: string) => {
  try {
    const docRef = doc(db, 'budget', documentName); // Referencja do dokumentu w kolekcji 'budgets'
    const docSnap = await getDoc(docRef); // Pobierz dokument z bazy danych
    
    if (docSnap.exists()) {
      return docSnap.data(); // Zwróć dane dokumentu
    } else {
      throw new Error('Document does not exist');
    }
  } catch (error) {
    throw new Error("Błąd podczas pobierania danych budżetu z Firebase: " + error);
  }
};
