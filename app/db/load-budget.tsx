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
import { Table, TableCell, TableFooter, TableHead, TableRow } from '~/atoms/ui/table';

interface LoadBudgetProps {
  onSelectBudget: (documentData: { name: string, elements: { element: string, amount: number }[] }) => void;
}

export const LoadBudget: React.FC<LoadBudgetProps> = ({ onSelectBudget }) => {
  const [budgetDocuments, setBudgetDocuments] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null); // Nowy stan do przechowywania wybranego budżetu
  const [budgetDocumentsData, setBudgetDocumentsData] = useState< {element: string, amount: number }[]>([]); //
  
  useEffect(() => {
    loadBudgetsFromFirebase();
  }, []);

  const loadBudgetsFromFirebase = async () => {
    try {
      const budgets = await getBudgetsFromFirebase();
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
    if (budgetData && budgetData.elements) {
      const { elements } = budgetData; // Wyodrębniamy tylko elementy budżetu
      onSelectBudget(elements); // Wywołujemy funkcję onSelectBudget przekazując tylko elementy
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
      <div>
        {budgetDocuments.map((documentName, index) => (
          <Button key={index} variant={"ghost"} onClick={() => handleSelectBudget(documentName)}>
            {documentName}
          </Button>
        ))}
      </div>
      <div>
      <Card className="w-9/12 mt-5 mb-6 mx-auto dashboard-06-chunk-0">
  {selectedBudget && budgetDocumentsData !== undefined && (
    <table>
      <thead>
        <tr>
          <th>Element</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {budgetDocumentsData.length > 0 ? (
          budgetDocumentsData.map((item, index) => (
            <tr key={index}>
              <td>{item.element}</td>
              <td>{item.amount}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="2">Brak danych budżetu</td>
          </tr>
        )}
      </tbody>
    </table>
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