// LoadBudget.tsx

// import React, { useState, useEffect } from 'react';
// import { Button } from "~/atoms/ui/button";
// import { getBudgetsFromFirebase } from './getBudgetsFromFirebase';
// import { getBudgetDataFromFirebase } from './getBudgetDataFromFirebase';

// interface LoadBudgetProps {
//   onSelectBudget: (documentData: { name: string, elements: { element: string, amount: number }[] }) => void;
// }

// export const LoadBudget: React.FC<LoadBudgetProps> = ({ onSelectBudget }) => {
//   const [budgetDocuments, setBudgetDocuments] = useState<string[]>([]);

//   useEffect(() => {
//     loadBudgetsFromFirebase();
//   }, []);

//   const loadBudgetsFromFirebase = async () => {
//     try {
//       const budgets = await getBudgetsFromFirebase();
//       setBudgetDocuments(budgets);
//     } catch (error) {
//       console.error("Błąd podczas ładowania budżetów: ", error);
//     }
//   };

//   const handleSelectBudget = async (documentName: string) => {
//     try {
//       const budgetData = await getBudgetDataFromFirebase(documentName);
//       console.log("budgetData", )
//       onSelectBudget({ name: documentName, elements: budgetData.elements });
//     } catch (error) {
//       console.error("Błąd podczas ładowania danych budżetu: ", error);
//     }
//   };

//   return (
//     <div>
//       {budgetDocuments.map((documentName, index) => (
//         <Button key={index} variant={"ghost"} onClick={() => handleSelectBudget(documentName)}>
//           {documentName}
//         </Button>
//       ))}
//     </div>
//   );
// };
// 
// działa ale nie ściągają sie dane z FB , 

import React, { useState, useEffect } from 'react';
import { Button } from "~/atoms/ui/button";
import { getBudgetsFromFirebase } from './getBudgetsFromFirebase';
import { getBudgetDataFromFirebase } from './getBudgetDataFromFirebase';
import { BudgetForm } from '~/blocks/budgetForm';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/atoms/ui/card';
import { Table, TableCell, TableFooter, TableHead, TableRow, TableHeader, TableBody } from '~/atoms/ui/table';

import { useCurrentUser } from "~/db/auth";
import { eventRef } from "~/db/event-ref";
import {  useParams } from "@remix-run/react";
import { EventData } from "~/lib/utils";
import { getYourEvent } from "~/db/get-your-event";

// interface LoadBudgetProps {
//   onSelectBudget: (documentData: { name: string, elements: { element: string, amount: number }[] }) => void;
// }

interface LoadBudgetProps {
  onSelectBudget: (budget: number, elements: { element: string, amount: number }[]) => void;
  userLoggedIn: boolean; // Nowy prop do przechowywania informacji o zalogowanym użytkowniku
  eventIDProp: string; // Nowy prop do przechowywania ID wydarzenia
}

export const LoadBudget: React.FC<LoadBudgetProps> = ({ onSelectBudget, eventIDProp
 }) => {
  const [budgetDocuments, setBudgetDocuments] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null); // Nowy stan do przechowywania wybranego budżetu
  const [budgetDocumentsData, setBudgetDocumentsData] = useState< {element: string, amount: number }[]>([]); //
  
const [eventData, setEventData] = useState<EventData | null>();
const { currentUserUID, eventID } = useParams();
const user = useCurrentUser();
const loading = user.status === 'loading';
  
useEffect(() => {
  if (user.status === 'authenticated') {
      getYourEvent(eventID, eventRef)
          .then(res => {
              if (res) {
                  setEventData(res as EventData);
              } else {
                  setEventData(null);
              }
          })
  } else {
      setEventData(null)
  }
}, [user.status])


  
useEffect(() => {
  console.log("eventID", eventID)
  if (eventID === undefined) {
    return} 
       loadBudgetsFromFirebase(eventID); // Dodaj paramEventID jako argument
}, [eventID]);

  const loadBudgetsFromFirebase = async (eventID:string) => {
    try {
      const budgets = await getBudgetsFromFirebase(eventID);
      setBudgetDocuments(budgets);
    } catch (error) {
      console.error("Błąd podczas ładowania budżetów: ", error);
    }
  };

  const handleSelectBudget = async (documentName: string) => {
    try {
      const budgetData = await getBudgetDataFromFirebase(documentName);
      console.log("budgetData w handleSelectBudget w LoadBudget", budgetData); 
      console.log("type of budgetData t w LoadBudget",typeof budgetData); 
  
      // Sprawdzamy, czy budgetData zawiera dane oraz elementy
      if (budgetData && Array.isArray(budgetData.budget) && budgetData.budget.length > 0) {
        const elements = budgetData.budget.filter(item => typeof item === 'object'); // Filtrujemy tylko obiekty z tablicy budget
        onSelectBudget(budgetData.budget[0], elements); // Przekazujemy budżet i jego elementy do funkcji onSelectBudget
        setSelectedBudget(documentName); // Ustawienie wybranego budżetu
        setBudgetDocumentsData(elements); // Ustawienie danych budżetu
  
        console.log("Załadowano dane budżetu:", elements); 
      } else {
        console.error("Nieprawidłowe lub brak danych budżetu.", documentName);
      }
    } catch (error) {
      console.error("Błąd podczas ładowania danych budżetu: ", error);
    }
  };

  
  return (
    <div>
      
      {eventData && (
      
      <div>



        {budgetDocuments.map((documentName, index) => (
          <Button key={index} variant="ghost" onClick={() => handleSelectBudget(documentName)}>
            {documentName}
          </Button>
        ))}
      </div>)}
      <div>
        <Card className="w-9/12 mt-5 mb-6 mx-auto dashboard-06-chunk-0">
          {budgetDocumentsData.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>List of items:</TableHead>
                  <TableHead>Amount:</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetDocumentsData.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{item.element}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Card>
      </div>
    </div>
  );}
  

// //   wg plik Kaśki 

// import { collection, onSnapshot, deleteDoc, doc, getDocs } from 'firebase/firestore'
// import { db } from '~/db/firebase'
// import { useEffect, useState } from 'react';
// import { Table, TableBody, TableRow, TableCell, TableHead, TableHeader } from '~/atoms/ui/table';
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '~/atoms/ui/dropdown-menu';
// import { Button } from '~/atoms/ui/button';
// import { MoreHorizontal } from 'lucide-react';

// interface budget {
//   element: string;
//   amount: number;
// }

// export const LoadBudget = () => {
//   const [bugetData, settbugetData] = useState<budget[]>([]);

//   const getBudgetList = async () => {
//     try {
//       const budgetListCollection = collection(db, 'budget');
//       const querySnapshot = await getDocs(budgetListCollection);
//       const budgetList = querySnapshot.docs.map(doc => ({
//         ...doc.data()
//       } as budget));
//       settbugetData(budgetList);
//     } catch (error) {
//       console.error('Błąd podczas pobierania danych z bazy danych:', error);
//     }
//   };
  

//   useEffect(() => {
//     getBudgetList();
//   }, []);



//   return (
//     <Card className="w-9/12 mt-5 mb-6 mx-auto dashboard-06-chunk-0">
//       <CardHeader>
//         <CardTitle>Guest list</CardTitle>
//         <CardDescription>Manage your guests and check their survey responses.</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Element</TableHead>
//               <TableHead>Amount </TableHead>
//               <TableHead>
//               </TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {bugetData.map((list, index) => (
//               <TableRow key={index}>
//                 <TableCell className="font-medium">{list.element}</TableCell>
//                 <TableCell className="font-medium">{list.amount}</TableCell>

//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </CardContent>
//       <CardFooter className='grid justify-end'>
//       </CardFooter>
//     </Card >
//   )

// }