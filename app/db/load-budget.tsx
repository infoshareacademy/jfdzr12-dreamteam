// LoadBudget.tsx

import React, { useState, useEffect } from 'react';
import { Button } from "~/atoms/ui/button";
import { getBudgetsFromFirebase } from './getBudgetsFromFirebase';
import { getBudgetDataFromFirebase } from './getBudgetDataFromFirebase';

interface LoadBudgetProps {
  onSelectBudget: (documentData: { name: string, elements: { element: string, amount: number }[] }) => void;
}

export const LoadBudget: React.FC<LoadBudgetProps> = ({ onSelectBudget }) => {
  const [budgetDocuments, setBudgetDocuments] = useState<string[]>([]);

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
      console.log("budgetData", budgetData)
      onSelectBudget({ name: documentName, elements: budgetData.elements });
    } catch (error) {
      console.error("Błąd podczas ładowania danych budżetu: ", error);
    }
  };

  return (
    <div>
      {budgetDocuments.map((documentName, index) => (
        <Button key={index} variant={"ghost"} onClick={() => handleSelectBudget(documentName)}>
          {documentName}
        </Button>
      ))}
    </div>
  );
};


