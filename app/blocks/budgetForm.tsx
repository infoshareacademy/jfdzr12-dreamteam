// import React, { useState } from 'react';
// import {Button} from "~/atoms/ui/button"
// import { Input } from '~/atoms/ui/input';
// import { Label } from '~/atoms/ui/label';
// import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/atoms/ui/card';
// import { Table, TableCell, TableFooter, TableHead, TableRow } from '~/atoms/ui/table';
// import { addBudget } from '~/db/users-budget';


// interface NameFormProps {
//   onSubmit: (budgetEl: string[], budgetElAmount: number[]) => void;
// }


// export const BudgetForm: React.FC<NameFormProps> = ({ onSubmit }) => {
//   const [budgetElInput, setBudgetElInput] = useState('');
//   const [budgetEl, setBudgetEl] = useState<string[]>([]);
//   const [budgetElAmount, setBudgetElAmount] = useState<number[]>([]);
//   const [isFormSubmitted, setIsFormSubmitted] = useState(false);

//   const handleSubmit = (e: React.FormEvent) => {
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

//   const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
//     const { value } = e.target;
//     const updatedAmounts = [...budgetElAmount];
//     updatedAmounts[index] = Number(value);
//     setBudgetElAmount(updatedAmounts);
//   };

//   const totalAmount = budgetElAmount.reduce((prev, next) => prev + next, 0);

//   const handleSaveBudget = () => {
//     const budgetData = {
//       elements: budgetEl,
//       amounts: budgetElAmount
//     };
//     addBudget(budgetData)
//       .then(() => {
//         console.log("Budżet zapisany pomyślnie!");
//       })
//       .catch((error) => {
//         console.error("Błąd podczas zapisywania budżetu: ", error);
//       });
//   };

//   return (
//     <div>
//       <br/><br/>
//       <Card className="w-[350px]">
//         <CardHeader>
//           <CardTitle>STWÓRZ PROJEKT SWOJEGO BUDŻETU</CardTitle>
//           <CardDescription>Wpisz  poszczególne elementy budżetu</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="grid w-full items-center gap-4">
//             <form onSubmit={handleSubmit}>
//               <Label>
//                 Nazwa pozycji:
//                 <Input
//                   type="text"
//                   value={budgetElInput}
//                   onChange={(e) =>  setBudgetElInput(e.target.value)}
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
//               <Button variant={"ghost"} type="submit">Dodaj pozycję</Button> 
//               <br /><br />
//             </form>
//             <Button variant={"ghost"} onClick={handleSaveBudget}>Zapisz budżet</Button>
//           </div> 
//         </CardContent>
//       </Card>
//       <br/><br/>
//       <Table>
//         { isFormSubmitted && totalAmount > 0 && <TableHead>Lista pozycji: </TableHead>}
//         {budgetEl.map((el, index) => (
//           <TableRow key={index}>
//             <TableCell>{`${index + 1}. ${el}`}</TableCell>
//             <TableCell>{budgetElAmount[index]}</TableCell>
//             <TableCell>
//               <Button variant={"ghost"} onClick={() => handleDelete(index)}> X </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//         {isFormSubmitted && totalAmount > 0 && <TableFooter>
//           <TableCell>Suma:</TableCell>
//           <TableCell>{totalAmount}</TableCell>
//         </TableFooter>}
//       </Table>
//     </div>
//   );
// }



// // // nowy - dobry
import React, { useState } from 'react';
import { Button } from "~/atoms/ui/button";
import { Input } from '~/atoms/ui/input';
import { Label } from '~/atoms/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/atoms/ui/card';
import { Table, TableCell, TableFooter, TableHead, TableRow } from '~/atoms/ui/table';
import { addBudget } from '~/db/users-budget';

interface NameFormProps {
  onSubmit: (budgetEl: string[], budgetElAmount: number) => void;
}

export const BudgetForm: React.FC<NameFormProps> = ({ onSubmit }) => {
  const [budgetEl, setBudgetEl] = useState<string[]>([]);
  const [budgetElAmount, setBudgetElAmount] = useState<number[]>([0]);
  const [budgetElInput, setBudgetElInput] = useState<string>('');
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const handleAddToBudget = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBudgetEl = [...budgetEl, budgetElInput];
    const updatedBudgetElAmount = [...budgetElAmount, 0]; 
    onSubmit(updatedBudgetEl, updatedBudgetElAmount);
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
      const budgetData = budgetEl.map((el, index) => ({
        element: el,
        amount: budgetElAmount[index],
      }));
      console.log("addBudget do firebase:", budgetData);
      addBudget(budgetData);
      // console.log("Budżet zapisany pomyślnie!");
    // } catch (error) {
    //   console.error("Błąd podczas zapisywania budżetu: ", error);
    // }
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
    const updatedAmounts = [...budgetElAmount];
    updatedAmounts[index] = Number(value);
    setBudgetElAmount(updatedAmounts);
  };

  const totalAmount = budgetElAmount.reduce((prev, next) => prev + next, 0);

  return (
    <Card className="w-[500px]">
      <CardHeader>
        <CardTitle>STWÓRZ PROJEKT SWOJEGO BUDŻETU</CardTitle>
        <CardDescription>Wpisz poszczególne elementy budżetu</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <form onSubmit={handleSubmit}>
            <Label>
              Nazwa pozycji:
              <Input
                type="text"
                value={budgetElInput}
                onChange={(e) => setBudgetElInput(e.target.value)}
              />
            </Label>
            <br />
            <Label>
              Wycena:
              <Input
                type="number"
                value={budgetElAmount[budgetElAmount.length - 1] || 0}
                onChange={(e) => handleAmountChange(e, budgetElAmount.length - 1)}
              />
            </Label>
            <br />
            <Button variant={"ghost"} type="button" onClick={handleAddToBudget}>Dodaj pozycję</Button>
            <Button variant={"ghost"} type="submit">Zapisz budżet</Button>
            <br /><br />
          </form>
        </div> 
      </CardContent>
      <Table>
        {isFormSubmitted && totalAmount > 0 && <TableHead>Lista pozycji: </TableHead>}
        {budgetEl.map((el, index) => (
          <TableRow key={index}>
            <TableCell>{`${index + 1}. ${el}`}</TableCell>
            <TableCell>{budgetElAmount[index]}</TableCell>
            <TableCell>
              <Button variant={"ghost"} onClick={() => handleDelete(index)}> X </Button>
            </TableCell>
          </TableRow>
        ))}
        {isFormSubmitted && totalAmount > 0 && (
          <TableFooter>
            <TableCell>Suma:</TableCell>
            <TableCell>{totalAmount}</TableCell>
          </TableFooter>
        )}
      </Table>
    </Card>
  );
};