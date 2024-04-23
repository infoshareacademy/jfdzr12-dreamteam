import { Link } from "@remix-run/react";
import { useCurrentUser } from "~/db/auth";

export default function LandingPage() {
    const user = useCurrentUser();
    const unauthenticated = user.status === "unauthenticated";

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
        {unauthenticated &&
        <div className="grid grid-cols-2 gap-4 justify-items-center p-6">
            <div className="grid col-start-1 justify-items-center">
                <Link to="sign-up">Young couple</Link>   
            </div>
            <div className="grid justify-items-center">
                <Link to="guest">Guest</Link>
            </div>
        </div>
        }
        </>
    );
}