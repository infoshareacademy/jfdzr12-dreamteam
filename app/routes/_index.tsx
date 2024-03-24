import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/atoms/ui/button";
import { Card } from "~/atoms/ui/card";
import { BudgetForm } from "~/blocks/budgetForm";
import { GuestsForm } from "~/blocks/guestsForm";


export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="grid place-items-center h-screen" /*style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}*/>
   
         <BudgetForm onSubmit={(e)=>{console.log("Onsubmit", e)}}/>

    </div>
  );
}
