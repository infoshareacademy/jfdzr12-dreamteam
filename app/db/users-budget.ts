import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
import {db} from "./firebase"


// import { useToast } from '~/atoms/ui/use-toast';

// import { CheckCheck } from 'lucide-react';

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

// export function addBudget(budgetData: Budget[]) {
//   // Tworzymy dokument do dodania
//   const newDoc = doc(budgetsCollection);

//   // Ustawiamy dokument z budżetem w kolekcji
//   return setDoc(newDoc, { budget: budgetData }).then(() => {
//     console.log('Budżet zapisany pomyślnie!');
//     alert('Budżet zapisany pomyślnie!');
//   }).catch((error) => {
//     console.error('Błąd podczas zapisywania budżetu: ', error);
//     throw error;
//   });
// }

// const { toast } = useToast()

  
// // export function ToastWithTitle() {

// //   return (

// //   toast({
// //   //   className: cn(
// //   //   'top-0 right-0 flex fixed md:max-w-[420px] md:top-20 md:right-20 bg-green-400 text-black'
// //   // ),
// //     title: "Success!",
// //     description: "Your form has been submitted successfully"
// //   })
// // )}




export function addBudget(budgetData: Budget[], documentName: string, eventID:string) {
  // Tworzymy dokument do dodania
  const newDoc = doc(budgetsCollection, documentName);

  // const { toast } = useToast()

  // Ustawiamy dokument z budżetem w kolekcji
  return setDoc(newDoc, { budget: budgetData, eventID }).then(() => {

    // toast({
    //           title: "Success!",
    //           description: "Your form has been submitted successfully.",
    //           duration: 6000,
    //         });

    console.log('Budżet zapisany pomyślnie!');

    // alert('Budżet zapisany pomyślnie!');

  }).catch((error) => {
    console.error('Błąd podczas zapisywania budżetu: ', error);
    throw error;
  });
}


// export function addBudget(budgetData: Budget[], documentName: string, eventID: string) {
//   const newDoc = doc(budgetsCollection, documentName);
//   const { toast } = useToast(); // Poprawka: użyj hooka useToast() wewnątrz komponentu funkcji

//   return setDoc(newDoc, { budget: budgetData, eventID })
//     .then(() => {
//       toast({
//         title: "Success!",
//         description: "Your form has been submitted successfully.",
//         duration: 6000,
//       });
//       console.log('Budget saved successfully!');
//     })
//     .catch((error) => {
//       console.error('Error saving budgets: ', error);
//       throw error;
//     });
// }
