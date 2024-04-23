import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";


export const meta: MetaFunction = () => {
  return [
    { title: "DreamDay" },
    { name: "description", content: "Welcome! This is the home page." },
  ];
};

export default function Index() {
  return (
    <>
    <div className="grid place-items-center p-6 font-black" /*style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}*/>
    Your perfect wedding starts here: DreamDay
    </div>
    <div className="grid place-items-center">
      <p>Plan your dream day. Create an event, guest list, budget.</p>
      <p>Send your guests a link to a survey and get to know their preferences so you can organize your dream celebration together.</p>
      <p>Manage your events.</p>
    </div>
    <div className="grid grid-cols-2 gap-4 justify-items-center p-6">
      <div className="grid col-start-1 justify-items-center">
        <Link to="sign-up">Young couple</Link>   
      </div>
      <div className="grid justify-items-center">
        <Link to="guest">Guest</Link>
      </div>
    </div>
    </>
  );
}