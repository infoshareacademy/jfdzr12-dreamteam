import { Link } from "@remix-run/react";
import { useCurrentUser } from "~/db/auth";

export default function LandingPage() {
    const user = useCurrentUser();
    const unauthenticated = user.status === "unauthenticated";

    return (
        <div className="grid h-screen">
            <div className="grid place-items-center text-center" /*style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}*/>
                <p>Your perfect wedding starts here...</p>
                <h1 className="font-bold text-2xl">DreamDay</h1>
            </div>
            <div className="grid place-items-center text-center">
                <p>Plan your dream day. Create an event, guest list, budget.</p>
                <p>Send your guests a link to a survey and get to know their preferences so you can organize your dream celebration together.</p>
                <p>Manage your events.</p>
            </div>
            {unauthenticated &&
            <div className="grid grid-cols-2 gap-4 justify-items-center p-6">
                <div className="grid col-start-1 justify-items-center">
                    <Link to="sign-up" className="h-10 w-full px-4 py-2 bg-transparent border border-gray-300 text-secondary-foreground hover:bg-secondary/80 hover:border-transparent inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">Young couple</Link>   
                </div>
                <div className="grid justify-items-center">
                    <Link to="guest" className="h-10 w-full px-4 py-2 bg-transparent border border-gray-300 text-secondary-foreground hover:bg-secondary/80 hover:border-transparent inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50y">Guest</Link>
                </div>
            </div>
            }
        </div>
    );
}