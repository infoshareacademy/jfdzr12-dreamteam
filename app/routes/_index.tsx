import type { MetaFunction } from "@remix-run/node";
import { Button } from "~/atoms/ui/button";
import { Card } from "~/atoms/ui/card";
import { EventForm } from "~/blocks/eventForm";
import { GuestsForm } from "~/blocks/guestsForm";
import { FormForGuest } from "~/blocks/formForGuest";
import { UserPage } from "~/blocks/userPage";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="grid place-items-center h-screen" /*style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}*/>
      <Card>
        <GuestsForm onSubmit={(e) => { console.log("Onsubmit", e) }} />
        <FormForGuest onSubmit={(e) => { console.log(e) }} />
      </Card>
      <UserPage />
    </div>
  );
}