import type { MetaFunction } from "@remix-run/node";

import { Card } from "~/atoms/ui/card";
import { GuestsForm } from "~/blocks/guestsForm";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="grid place-items-center h-screen">
      <Card>
        <GuestsForm onSubmit={(e) => { console.log("Onsubmit", e) }} />
      </Card>
    </div>
  );
}