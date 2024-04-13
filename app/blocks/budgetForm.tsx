import React, { useState } from 'react';
import {Button} from "~/atoms/ui/button"
import { Input } from '~/atoms/ui/input';
import { Label } from '~/atoms/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '~/atoms/ui/card';
import { Table, TableCell, TableFooter, TableHead, TableRow } from '~/atoms/ui/table';
import {db} from '../db/firebase';
import { collection } from 'firebase/firestore';
import { addBudget } from '~/db/users-budget';


interface NameFormProps {
  onSubmit: (budgetEl: string[], budgetElAmount: number) => void;
  // onclick: (budgetEl: string[], budgetElAmount: number) => void;
}


export const BudgetForm: React.FC<NameFormProps> = ({ onSubmit }) => {
  const [budgetEl, setBugetEl] = useState<string[]>([]);
  const [budgetElAmount, setBudgetElAmount] = useState<number[]>([0]);
  const [budgetElInput, setBudgetElInput] = useState<string>('');
  const [isFormSubmitted, setIsFormSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedBudgetEl = [...budgetEl, budgetElInput];
    const updatedBudgetElAmount = [...budgetElAmount, 0]; 
    onSubmit(updatedBudgetEl, updatedBudgetElAmount);
    setBugetEl(updatedBudgetEl);
    setBudgetElInput('');
    setBudgetElAmount(updatedBudgetElAmount); 
    setIsFormSubmitted(true);
  };

  

//  usuwanie pozycji z dodanych 

  const handleDelete = (index: number) => {
    const updatedBudgetEl = [...budgetEl];
    updatedBudgetEl.splice(index, 1);

    const updatedBudgetElAmount = [...budgetElAmount];
    updatedBudgetElAmount.splice(index, 1);

    setBugetEl(updatedBudgetEl);
    setBudgetElAmount(updatedBudgetElAmount);
  };


  // ostatni element tablicy
  const lastIndex = budgetElAmount.length - 1;

// obsługa zmiany wartości 
const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { value } = e.target;
  const updatedAmounts = [...budgetElAmount];
  updatedAmounts[lastIndex] = Number(value);
  setBudgetElAmount(updatedAmounts);
};

const totalAmount = budgetElAmount.reduce((prev, next) => prev + next, 0);


const handleSaveBudget: ()=> void = () => {
  const budgetData = {
    elements: budgetEl,
    amounts: budgetElAmount
  };
  addBudget(budgetData)
  .then(() => {
    console.log("Budżet zapisany pomyślnie!");
  })
  .catch((error) => {
    console.error("Błąd podczas zapisywania budżetu: ", error);
  });

};




//   db.collection('userBudgets').add({
//     budgetItems: budgetEl.map((item, index) => ({
//       name: item,
//       amount: budgetElAmount[index]
//     }))
//   }).then(() => {
//     console.log("Budżet zapisany pomyślnie!");
//   }).catch((error) => {
//     console.error("Błąd podczas zapisywania budżetu: ", error);
//   });

  return (
<div>
     <br/><br/>
     <Card className="w-[350px]">
     <CardHeader>
        <CardTitle>STWÓRZ PROJEKT SWOJEGO BUDŻETU</CardTitle>
        <CardDescription>Wpisz  poszczególne elementy budżetu</CardDescription>
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
          value={budgetElAmount[lastIndex] || 0}
          onChange={(e) => handleAmountChange(e, lastIndex)}/>
      </Label>
      <br />
      <Button variant={"ghost"} type="submit">Dodaj pozycję</Button> 
      <br /><br />
    </form>
    <Button variant={"ghost"} onClick={handleSaveBudget}>Zapisz budżet</Button>
    </div> 
    </CardContent>
    </Card>
    <br/><br/>
    <Table>
      { isFormSubmitted && totalAmount>0 && <TableHead>Lista pozycji: </TableHead>}
        {/* <tbody> */}
          {budgetEl.map((el, index) => (
            <TableRow key={index}>
              <TableCell>{`${index + 1}. ${el}`}</TableCell>
              <TableCell>{budgetElAmount[index]}</TableCell>
              <TableCell>
              <Button variant={"ghost"} onClick={() => handleDelete(index)}> X </Button>
            </TableCell>
            </TableRow>
          ))}
        {/* </tbody><br/> */}
        {isFormSubmitted && totalAmount>0 && <TableFooter>
          <TableCell>Suma:</TableCell>
          <TableCell>{totalAmount}</TableCell>
          </TableFooter>}
      </Table>
    </div>
  );
          }
