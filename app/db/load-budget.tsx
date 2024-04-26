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
      onSelectBudget({ name: documentName, elements: budgetData.elements });
      setSelectedBudget(documentName); // Ustawienie wybranego budżetu
      setBudgetDocumentsData(budgetData.elements)

      console.log("type of budgetData.elements",typeof budgetData.elements); 
      console.log(" budgetData.elements",typeof budgetData.elements); 
      console.log(" bodgetsdokumentData", budgetDocumentsData); 
      
      
  
  
      if (budgetData && budgetData.elements ) {
        setBudgetDocumentsData(budgetData.elements); // Ustawienie danych budżetu
        console.log(" bodgetsdokumentData", budgetDocumentsData); 
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
      <Card>
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
  