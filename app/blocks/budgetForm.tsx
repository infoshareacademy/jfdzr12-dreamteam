

// // // nowy - dobry
// import React, { useState } from 'react';
// import { Button } from "~/atoms/ui/button";
// import { Input } from '~/atoms/ui/input';
// import { Label } from '~/atoms/ui/label';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/atoms/ui/card';
// import { Table, TableCell, TableFooter, TableHead, TableRow } from '~/atoms/ui/table';
// import { addBudget } from '~/db/users-budget';

// interface NameFormProps {
//   onSubmit: (budgetEl: string[], budgetElAmount: number) => void;
// }

// export const BudgetForm: React.FC<NameFormProps> = ({ onSubmit }) => {
//   const [budgetEl, setBudgetEl] = useState<string[]>([]);
//   const [budgetElAmount, setBudgetElAmount] = useState<number[]>([0]);
//   const [budgetElInput, setBudgetElInput] = useState<string>('');
//   const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

//   const handleAddToBudget = (e: React.FormEvent) => {
//     e.preventDefault();
//     const updatedBudgetEl = [...budgetEl, budgetElInput];
//     const updatedBudgetElAmount = [...budgetElAmount, 0]; 
//     onSubmit(updatedBudgetEl, updatedBudgetElAmount);
//     setBudgetEl(updatedBudgetEl);
//     setBudgetElInput('');
//     setBudgetElAmount(updatedBudgetElAmount); 
//     setIsFormSubmitted(true);
//   };

//   const handleDelete = (index: number) => {
//     const updatedBudgetEl = [...budgetEl];
//     updatedBudgetEl.splice(index, 1);

//     const updatedBudgetElAmount = [...budgetElAmount];
//     updatedBudgetElAmount.splice(index, 1);

//     setBudgetEl(updatedBudgetEl);
//     setBudgetElAmount(updatedBudgetElAmount);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//       const budgetData = budgetEl.map((el, index) => ({
//         element: el,
//         amount: budgetElAmount[index],
//       }));
//       console.log("addBudget do firebase:", budgetData);
//       addBudget(budgetData);
//       // setIsFormSubmitted(false);
//       // console.log("Budżet zapisany pomyślnie!");
//     // } catch (error) {
//     //   console.error("Błąd podczas zapisywania budżetu: ", error);
//     // }
//   };

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const { value } = e.target;
//     const updatedAmounts = [...budgetElAmount];
//     updatedAmounts[index] = Number(value);
//     setBudgetElAmount(updatedAmounts);
//   };

//   const totalAmount = budgetElAmount.reduce((prev, next) => prev + next, 0);

//   return (
//     <div className="grid grid-cols-1 gap-4">
//       <Card className="w-[500px]">
//         <CardHeader>
//           <CardTitle>STWÓRZ PROJEKT SWOJEGO BUDŻETU</CardTitle>
//           <CardDescription>Wpisz poszczególne elementy budżetu</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid w-full items-center gap-4">
//             <form onSubmit={handleSubmit}>
//               <Label>
//                 Nazwa pozycji:
//                 <Input
//                   type="text"
//                   value={budgetElInput}
//                   onChange={(e) => setBudgetElInput(e.target.value)}
//                 />
//               </Label>
//               <br />
//               <Label>
//                 Wycena:
//                 <Input
//                   type="number"
//                   value={budgetElAmount[budgetElAmount.length - 1] || 0}
//                   onChange={(e) => handleAmountChange(e, budgetElAmount.length - 1)}
//                 />
//               </Label>
//               <br />
//               <Button variant={"ghost"} type="button" onClick={handleAddToBudget}>Dodaj pozycję</Button>
//               <Button variant={"ghost"} type="submit">Zapisz budżet</Button>
//               <br /><br />
//             </form>
//           </div> 
//         </CardContent>
//       </Card>
//       {isFormSubmitted && totalAmount > 0 && (
//         <Card className="w-[500px]">
//           <Table>
//             <TableHead>Lista pozycji: </TableHead>
//             {budgetEl.map((el, index) => (
//               <TableRow key={index}>
//                 <TableCell>{`${index + 1}. ${el}`}</TableCell>
//                 <TableCell>{budgetElAmount[index]}</TableCell>
//                 <TableCell>
//                   <Button variant={"ghost"} onClick={() => handleDelete(index)}> X </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             <TableFooter>
//               <TableCell>Suma:</TableCell>
//               <TableCell>{totalAmount}</TableCell>
//             </TableFooter>
//           </Table>
//         </Card>
//       )}
//     </div>
//   );
//             }  



// import React, { useState } from 'react';
// import { Button } from "~/atoms/ui/button";
// import { Input } from '~/atoms/ui/input';
// import { Label } from '~/atoms/ui/label';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/atoms/ui/card';
// import { Table, TableCell, TableFooter, TableHead, TableRow } from '~/atoms/ui/table';
// import { addBudget } from '~/db/users-budget';

// interface NameFormProps {}

// export const BudgetForm: React.FC<NameFormProps> = () => {
//   const [budgetEl, setBudgetEl] = useState<string[]>([]);
//   const [budgetElAmount, setBudgetElAmount] = useState<number[]>([0]);
//   const [budgetElInput, setBudgetElInput] = useState<string>('');
//   const [documentName, setDocumentName] = useState<string>('');
//   const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

//   const handleAddToBudget = (e: React.FormEvent) => {
//     e.preventDefault();
//     const updatedBudgetEl = [...budgetEl, budgetElInput];
//     const updatedBudgetElAmount = [...budgetElAmount, 0]; 
//     setBudgetEl(updatedBudgetEl);
//     setBudgetElInput('');
//     setBudgetElAmount(updatedBudgetElAmount); 
//     setIsFormSubmitted(true);
//   };

//   const handleDelete = (index: number) => {
//     const updatedBudgetEl = [...budgetEl];
//     updatedBudgetEl.splice(index, 1);

//     const updatedBudgetElAmount = [...budgetElAmount];
//     updatedBudgetElAmount.splice(index, 1);

//     setBudgetEl(updatedBudgetEl);
//     setBudgetElAmount(updatedBudgetElAmount);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const budgetData = budgetEl.map((el, index) => ({
//       element: el,
//       amount: budgetElAmount[index],
//     }));

//     try {
//       await addBudget(budgetData, documentName);
//       console.log("Budżet zapisany pomyślnie!");
//     } catch (error) {
//       console.error("Błąd podczas zapisywania budżetu: ", error);
//     }
//   };

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const { value } = e.target;
//     const updatedAmounts = [...budgetElAmount];
//     updatedAmounts[index] = Number(value);
//     setBudgetElAmount(updatedAmounts);
//   };

//   const totalAmount = budgetElAmount.reduce((prev, next) => prev + next, 0);

//   return (
//     <div className="grid grid-cols-1 gap-4">
//       <Card className="w-[500px]">
//         <CardHeader>
//           <CardTitle>STWÓRZ PROJEKT SWOJEGO BUDŻETU</CardTitle>
//           <CardDescription>Wpisz poszczególne elementy budżetu</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid w-full items-center gap-4">
//             <form onSubmit={handleSubmit}>
//               <Label>
//                 Nazwa dokumentu:
//                 <Input
//                   type="text"
//                   value={documentName}
//                   onChange={(e) => setDocumentName(e.target.value)}
//                 />
//               </Label>
//               <br />
//               <Label>
//                 Nazwa pozycji:
//                 <Input
//                   type="text"
//                   value={budgetElInput}
//                   onChange={(e) => setBudgetElInput(e.target.value)}
//                 />
//               </Label>
//               <br />
//               <Label>
//                 Wycena:
//                 <Input
//                   type="number"
//                   value={budgetElAmount[budgetElAmount.length - 1] || 0}
//                   onChange={(e) => handleAmountChange(e, budgetElAmount.length - 1)}
//                 />
//               </Label>
//               <br />
//               <Button variant={"ghost"} type="button" onClick={handleAddToBudget}>Dodaj pozycję</Button>
//               <Button variant={"ghost"} type="submit">Zapisz budżet</Button>
//               <br /><br />
//             </form>
//           </div> 
//         </CardContent>
//       </Card>
//       {isFormSubmitted && totalAmount > 0 && (
//         <Card className="w-[500px]">
//           <Table>
//             <TableHead>Lista pozycji: </TableHead>
//             {budgetEl.map((el, index) => (
//               <TableRow key={index}>
//                 <TableCell>{`${index + 1}. ${el}`}</TableCell>
//                 <TableCell>{budgetElAmount[index]}</TableCell>
//                 <TableCell>
//                   <Button variant={"ghost"} onClick={() => handleDelete(index)}> X </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             <TableFooter>
//               <TableCell>Suma:</TableCell>
//               <TableCell>{totalAmount}</TableCell>
//             </TableFooter>
//           </Table>
//         </Card>
//       )}
//     </div>
//   );
// }


// dobry

// import React, { useState } from 'react';
// import { Button } from "~/atoms/ui/button";
// import { Input } from '~/atoms/ui/input';
// import { Label } from '~/atoms/ui/label';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/atoms/ui/card';
// import { Table, TableCell, TableFooter, TableHead, TableRow } from '~/atoms/ui/table';
// import { addBudget } from '~/db/users-budget';

// interface NameFormProps {}

// export const BudgetForm: React.FC<NameFormProps> = () => {
//   const [budgetEl, setBudgetEl] = useState<string[]>([]);
//   const [budgetElAmount, setBudgetElAmount] = useState<number[]>([0]);
//   const [budgetElInput, setBudgetElInput] = useState<string>('');
//   const [documentName, setDocumentName] = useState<string>('');
//   const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
//   const [showForm, setShowForm] = useState<boolean>(false);

//   const handleCreateNewBudget = () => {
//     setShowForm(true);
//   };

//   const handleLoadBudget = () => {
//     // Obsługa ładowania budżetu
//   };

//   const handleAddToBudget = (e: React.FormEvent) => {
//     e.preventDefault();
//     const updatedBudgetEl = [...budgetEl, budgetElInput];
//     const updatedBudgetElAmount = [...budgetElAmount, 0]; 
//     setBudgetEl(updatedBudgetEl);
//     setBudgetElInput('');
//     setBudgetElAmount(updatedBudgetElAmount); 
//     setIsFormSubmitted(true);
//   };

//   const handleDelete = (index: number) => {
//     const updatedBudgetEl = [...budgetEl];
//     updatedBudgetEl.splice(index, 1);

//     const updatedBudgetElAmount = [...budgetElAmount];
//     updatedBudgetElAmount.splice(index, 1);

//     setBudgetEl(updatedBudgetEl);
//     setBudgetElAmount(updatedBudgetElAmount);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const budgetData = budgetEl.map((el, index) => ({
//       element: el,
//       amount: budgetElAmount[index],
//     }));

//     try {
//       await addBudget(budgetData, documentName);
//       console.log("Budżet zapisany pomyślnie!");
//     } catch (error) {
//       console.error("Błąd podczas zapisywania budżetu: ", error);
//     }
//   };

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const { value } = e.target;
//     const updatedAmounts = [...budgetElAmount];
//     updatedAmounts[index] = Number(value);
//     setBudgetElAmount(updatedAmounts);
//   };

//   const totalAmount = budgetElAmount.reduce((prev, next) => prev + next, 0);

//   return (
//     <div className="grid grid-cols-1 gap-4">
//       <Card className="w-[500px]">
//         <CardHeader>
//           <CardTitle>STWÓRZ PROJEKT SWOJEGO BUDŻETU</CardTitle>
//           <CardDescription>Wpisz poszczególne elementy budżetu</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid w-full items-center gap-4">
//             {!showForm && (
//               <div>
//                 <Button variant={"ghost"} onClick={handleCreateNewBudget}>Create New Budget</Button>
//                 <Button variant={"ghost"} onClick={handleLoadBudget}>Load Budget</Button>
//               </div>
//             )}
//             {showForm && (
//               <form onSubmit={handleSubmit}>
//                 <Label>
//                   Nazwa dokumentu:
//                   <Input
//                     type="text"
//                     value={documentName}
//                     onChange={(e) => setDocumentName(e.target.value)}
//                   />
//                 </Label>
//                 <br />
//                 <Label>
//                   Nazwa pozycji:
//                   <Input
//                     type="text"
//                     value={budgetElInput}
//                     onChange={(e) => setBudgetElInput(e.target.value)}
//                   />
//                 </Label>
//                 <br />
//                 <Label>
//                   Wycena:
//                   <Input
//                     type="number"
//                     value={budgetElAmount[budgetElAmount.length - 1] || 0}
//                     onChange={(e) => handleAmountChange(e, budgetElAmount.length - 1)}
//                   />
//                 </Label>
//                 <br />
//                 <Button variant={"ghost"} type="button" onClick={handleAddToBudget}>Dodaj pozycję</Button>
//                 <Button variant={"ghost"} type="submit">Zapisz budżet</Button>
//                 <br /><br />
//               </form>
//             )}
//           </div> 
//         </CardContent>
//       </Card>
//       {isFormSubmitted && totalAmount > 0 && (
//         <Card className="w-[500px]">
//           <Table>
//             <TableHead>Lista pozycji: </TableHead>
//             {budgetEl.map((el, index) => (
//               <TableRow key={index}>
//                 <TableCell>{`${index + 1}. ${el}`}</TableCell>
//                 <TableCell>{budgetElAmount[index]}</TableCell>
//                 <TableCell>
//                   <Button variant={"ghost"} onClick={() => handleDelete(index)}> X </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             <TableFooter>
//               <TableCell>Suma:</TableCell>
//               <TableCell>{totalAmount}</TableCell>
//             </TableFooter>
//           </Table>
//         </Card>
//       )}
//     </div>
//   );
// }


// nowy do sprawdzenia 

// import React, { useState } from 'react';
// import { Button } from "~/atoms/ui/button";
// import { Input } from '~/atoms/ui/input';
// import { Label } from '~/atoms/ui/label';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/atoms/ui/card';
// import { Table, TableCell, TableFooter, TableHead, TableRow } from '~/atoms/ui/table';
// import { addBudget } from '~/db/users-budget';
// import { LoadBudget } from '../db/load-budget'; 
// import { getBudgetsFromFirebase } from '../db/getBudgetsFromFirebase';

// interface NameFormProps {}

// export const BudgetForm: React.FC<NameFormProps> = () => {
//   const [budgetEl, setBudgetEl] = useState<string[]>([]);
//   const [budgetElAmount, setBudgetElAmount] = useState<number[]>([0]);
//   const [budgetElInput, setBudgetElInput] = useState<string>('');
//   const [documentName, setDocumentName] = useState<string>('');
//   const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
//   const [showForm, setShowForm] = useState<boolean>(false);
//   const [budgetDocuments, setBudgetDocuments] = useState<string[]>([]);

//   // const handleCreateNewBudget = () => {
//   //   setShowForm(true);
//   // };

//   const handleLoadBudget = async () => {
//     try {
//       const budgets = await getBudgetsFromFirebase();
//       setBudgetDocuments(budgets);
//     } catch (error) {
//       console.error("Error loading budgets: ", error);
//     }
//   };

//   const handleAddToBudget = (e: React.FormEvent) => {
//     e.preventDefault();
//     const updatedBudgetEl = [...budgetEl, budgetElInput];
//     const updatedBudgetElAmount = [...budgetElAmount, 0];
//     setBudgetEl(updatedBudgetEl);
//     setBudgetElInput('');
//     setBudgetElAmount(updatedBudgetElAmount);
//     setIsFormSubmitted(true);
//   };

//   const handleDelete = (index: number) => {
//     const updatedBudgetEl = [...budgetEl];
//     updatedBudgetEl.splice(index, 1);

//     const updatedBudgetElAmount = [...budgetElAmount];
//     updatedBudgetElAmount.splice(index, 1);

//     setBudgetEl(updatedBudgetEl);
//     setBudgetElAmount(updatedBudgetElAmount);
//   };

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault();
//     const budgetData = budgetEl.map((el, index) => ({
//       element: el,
//       amount: budgetElAmount[index],
//     }));

//     try {
//       await addBudget(budgetData, documentName);
//       console.log("Budget saved successfully");
//     } catch (error) {
//       console.error("Error saving budgets: ", error);
//     }
//   };

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const { value } = e.target;
//     const updatedAmounts = [...budgetElAmount];
//     updatedAmounts[index] = Number(value);
//     setBudgetElAmount(updatedAmounts);
//   };

//   const totalAmount = budgetElAmount.reduce((prev, next) => prev + next, 0);

//   return (
//     <div className="grid grid-cols-1 gap-4">
//       <Card className="w-[500px]">
//         <CardHeader>
//           <CardTitle>CREATE YOUR BUDGET PROJECT</CardTitle>
//           <CardDescription>Enter budget items</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid w-full items-center gap-4">

//               <div> 

//                <Button variant={"ghost"} onClick={handleLoadBudget}>Load Budget</Button>
//                 {budgetDocuments.length > 0 && ( // Renderujemy przyciski na podstawie pobranych dokumentów
//                   <LoadBudget onSelectBudget={(documentName) => setDocumentName(documentName)} budgetDocuments={budgetDocuments} />
//                 )}
//               </div>
//               <form onSubmit={handleSubmit}>
//                 <Label>
//                  Budget name:
//                   <Input
//                     type="text"
//                     value={documentName}
//                     onChange={(e) => setDocumentName(e.target.value)}
//                   />
//                 </Label>
//                 <br />
//                 <Label>
//                  New item:
//                   <Input
//                     type="text"
//                     value={budgetElInput}
//                     onChange={(e) => setBudgetElInput(e.target.value)}
//                   />
//                 </Label>
//                 <br />
//                 <Label>
//                   Amount:
//                   <Input
//                     type="number"
//                     value={budgetElAmount[budgetElAmount.length - 1] || 0}
//                     onChange={(e) => handleAmountChange(e, budgetElAmount.length - 1)}
//                   />
//                 </Label>
//                 <br />
//                 <Button variant={"ghost"} type="button" onClick={handleAddToBudget}>Add item</Button>
//                 <Button variant={"ghost"} type="submit">Save budgete</Button>
//                 <br /><br />
//               </form>
//             {/* )} */}
//           </div>
//         </CardContent>
//       </Card>
//       {isFormSubmitted && totalAmount > 0 && (
//         <Card className="w-[500px]">
//           <Table>
//             <TableHead>List of items: </TableHead>
//             {budgetEl.map((el, index) => (
//               <TableRow key={index}>
//                 <TableCell>{`${index + 1}. ${el}`}</TableCell>
//                 <TableCell>{budgetElAmount[index]}</TableCell>
//                 <TableCell>
//                   <Button variant={"ghost"} onClick={() => handleDelete(index)}> X </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//             <TableFooter>
//               <TableCell>Total amount:</TableCell>
//               <TableCell>{totalAmount}</TableCell>
//             </TableFooter>
//           </Table>
//         </Card>
//       )}
//     </div>
//   );
// };


// ze stroną z przyciskami Creat i Load


import React, { useState } from 'react';
import { Button } from "~/atoms/ui/button";
import { Input } from '~/atoms/ui/input';
import { Label } from '~/atoms/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/atoms/ui/card';
import { Table, TableCell, TableFooter, TableHead, TableRow, TableHeader, TableBody } from '~/atoms/ui/table';
import { addBudget } from '~/db/users-budget';
import { LoadBudget } from '../db/load-budget';
import { getBudgetsFromFirebase } from '../db/getBudgetsFromFirebase';
import { mainCardOnPage } from '~/lib/utils';

interface NameFormProps { }
import {  useParams } from "@remix-run/react";

import { useToast } from '~/atoms/ui/use-toast';
import { CheckCheck } from 'lucide-react';

import { Link } from "@remix-run/react";


interface NameFormProps {
  eventIDProp: string; 
}

export const BudgetForm: React.FC<NameFormProps> = ({eventIDProp}) => {
  const [budgetEl, setBudgetEl] = useState<string[]>([]);
  const [budgetElAmount, setBudgetElAmount] = useState<number[]>([0]);
  const [budgetElInput, setBudgetElInput] = useState<string>('');
  const [documentName, setDocumentName] = useState<string>('');
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [budgetDocuments, setBudgetDocuments] = useState<string[]>([]);

  const { currentUserUID, eventID } = useParams();

  const { toast } = useToast();

  const handleCreateNewBudget = () => {
    setShowForm(true);
  };

  const handleLoadBudget = async () => {
    if (eventID === undefined) {return}
    try {
      const budgets = await getBudgetsFromFirebase(eventID);
      setBudgetDocuments(budgets);
    } catch (error) {
      console.error("Error loading budgets: ", error);
    }
  };

  const handleAddToBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBudgetEl = [...budgetEl, budgetElInput];
    const updatedBudgetElAmount = [...budgetElAmount, 0];
    setBudgetEl(updatedBudgetEl);
    setBudgetElInput('');
    setBudgetElAmount(updatedBudgetElAmount);
    setIsFormSubmitted(true);
  };

  const handleDelete = (index: number) => {
    const updatedBudgetEl = [...budgetEl];
    updatedBudgetEl.splice(index, 1);

    const updatedBudgetElAmount = [...budgetElAmount];
    updatedBudgetElAmount.splice(index, 1);

    setBudgetEl(updatedBudgetEl);
    setBudgetElAmount(updatedBudgetElAmount);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (eventID === undefined) {return}
    const budgetData = budgetEl.map((el, index) => ({
      element: el,
      amount: budgetElAmount[index],
    }));

    try {
      await addBudget(budgetData, documentName, eventID);
      console.log("Budget saved successfully!");
      toast({
        className:
        'top-0 right-0 flex fixed md:max-w-[420px] md:top-20 md:right-20 bg-emerald-300 text-black'
      ,
        title: "Success!",
        description: (<><p>Your form has been saved successfully. </p><CheckCheck/></>),
        duration: 6000,
      });
    } catch (error) {
      console.error("Error saving budgets: ", error);
    }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedAmounts = [...budgetElAmount];
    updatedAmounts[index] = Number(value);
    setBudgetElAmount(updatedAmounts);
  };

  const totalAmount = budgetElAmount.reduce((prev, next) => prev + next, 0);

  return (
    <div className="grid grid-cols-1 gap-4">
      <Card className="w-9/12 mt-5 mb-6 mx-auto dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle>CREATE YOUR BUDGET PROJECT</CardTitle>
          <CardDescription>Take control of your finances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            {!showForm && (
              <div>
                <div className="m-10 grid grid-cols-1 md:grid-cols-4 gap-4 justify-center">
                <Button className="w-full inline-flex" variant="outline" onClick={handleCreateNewBudget}>Create New Budget</Button>
                <Button className="w-full inline-flex" variant="outline" onClick={handleLoadBudget}>Load Budget</Button>
                {/* <Link to={`/${currentUserUID}/events`}><Button className="w-full inline-flex" variant="outline">Back to your events</Button></Link> */}
                <Link to={`/${currentUserUID}/events/your-event/${eventID}`}><Button className="w-full inline-flex" variant="secondary">Back to your event</Button></Link>
                 </div>
               
                {budgetDocuments.length > 0 && ( // Renderujemy przyciski na podstawie pobranych dokumentów
                  <LoadBudget onSelectBudget={(documentName) => setDocumentName(documentName)} budgetDocuments={budgetDocuments} />
                )}
               
              </div>
            )}
            {showForm && (
              <form onSubmit={handleSubmit}>
                <Label>
                Budget description:
                  <Input
                    type="text"
                    value={documentName}
                    onChange={(e) => setDocumentName(e.target.value)}
                    required
                  />
                </Label>
                <br />
                <Label>
                Item name:
                  <Input
                    type="text"
                    value={budgetElInput}
                    onChange={(e) => setBudgetElInput(e.target.value)}
                  />
                </Label>
                <br />
                <Label>
                Value[$]:
                  <Input
                    type="number"
                    value={budgetElAmount[budgetElAmount.length - 1] || 0}
                    onChange={(e) => handleAmountChange(e, budgetElAmount.length - 1)}
                  />
                </Label>
                <br />
                <div className="m-10 grid grid-cols-1 md:grid-cols-4 gap-4 justify-center">
                <Button  className="w-full inline-flex" variant="outline" type="button" onClick={handleAddToBudget}>Add item</Button>
                <Button  className="w-full inline-flex" variant="outline" type="submit">Save budget</Button>
                {/* <Link to={`/${currentUserUID}/events`}><Button className="w-full inline-flex" variant="outline">Back to your events</Button></Link> */}
                <Link to={`/${currentUserUID}/events/your-event/${eventID}`}><Button className="w-full inline-flex" variant="secondary">Back to your event</Button></Link>
                </div>
                <br /><br />
              </form>
            )} 
          </div>
        </CardContent>
      </Card>
      {isFormSubmitted && totalAmount > 0 && (
        <Card className="w-9/12 mt-5 mb-6 mx-auto dashboard-06-chunk-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>List of items:</TableHead>
              <TableHead>Value:</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {budgetEl.map((el, index) => (
              <TableRow key={index}>
                <TableCell>{`${index + 1}. ${el}`}</TableCell>
                <TableCell>{budgetElAmount[index]}</TableCell>
                <TableCell>
                  <Button variant={"ghost"} onClick={() => handleDelete(index)}> X </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell>TOTAL VALUE:</TableCell>
              <TableCell>{totalAmount}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </Card>
      
      )}
    
    </div>
  );
};