// LoadBudget.tsx

import React, { useState, useEffect } from 'react';
import { Button } from "~/atoms/ui/button";
import { getBudgetsFromFirebase } from './getBudgetsFromFirebase';

interface LoadBudgetProps {
  onSelectBudget: (documentName: string) => void;
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

  const handleSelectBudget = (documentName: string) => {
    onSelectBudget(documentName);
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
