// import type { MetaFunction } from "@remix-run/node";

import { Card } from "~/atoms/ui/card";
import { BudgetForm } from "~/blocks/budgetForm";
import { EventForm } from "~/blocks/eventForm";
import { GuestsForm } from "~/blocks/guestsForm";
import { FormForGuest } from "~/blocks/formForGuest";
import { UserPage } from "~/blocks/userPage";



// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

export default function Index() {
  return (
   <>
         <BudgetForm onSubmit={(e)=>{console.log("Onsubmit", e)}}/>
      {/* <Card>  
        // <GuestsForm onSubmit={(e)=>{console.log("Onsubmit", e)}}/>
        </Card>
      <Card>  
        <FormForGuest onSubmit={(e)=>{console.log(e)}} />
      </Card>
      <EventForm/>
      <UserPage /> */}
    </>
  )
   
}