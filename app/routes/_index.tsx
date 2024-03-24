import type { MetaFunction } from "@remix-run/node";
import { Card } from "~/atoms/ui/card";
import { GuestsForm } from "~/blocks/guestsForm";
// import { Header } from "~/blocks/header";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (

    <div className="grid place-items-center h-screen" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <Card>
        <GuestsForm onSubmit={(e) => { console.log("Onsubmit", e) }} />
      </Card>
    </div>
  );
}
