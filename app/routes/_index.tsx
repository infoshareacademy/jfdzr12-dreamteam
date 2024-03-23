import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/atoms/ui/button";
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
      <div style={{width:"500px", height: "100px"}}>  
         <GuestsForm/>
         </div>

    
    </div>
  );
}
