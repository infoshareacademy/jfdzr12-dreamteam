import type { MetaFunction } from "@remix-run/node";

import { Card } from "~/atoms/ui/card";
import { GuestsForm } from "~/blocks/guestsForm";
import { FormForGuest } from "~/blocks/formForGuest";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="grid place-items-center h-screen" /*style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}*/>
<<<<<<< HEAD
      <Card>
        <GuestsForm onSubmit={(e) => { console.log("Onsubmit", e) }} />
=======
      <Card>  
         <GuestsForm onSubmit={(e)=>{console.log("Onsubmit", e)}}/>
      </Card>
      <Card>  
        <FormForGuest onSubmit={(e)=>{console.log(e)}} />
>>>>>>> 294bcac (form with 1 main and 1 additional question conditionally rendered)
      </Card>
    </div>
  );
}