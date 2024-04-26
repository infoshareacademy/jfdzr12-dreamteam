import { Link } from "@remix-run/react";
import { Button } from "~/atoms/ui/button";
import { useCurrentUser } from "~/db/auth";

export default function LandingPage() {
    const user = useCurrentUser();
    const unauthenticated = user.status === "unauthenticated";

    return (
        <div className="h-screen bg-hero-pattern bg-cover bg-bottom fixed top-0 left-0 right-0">
            <div className="grid gap-4 md:gap-6 lg:gap-6 absolute top-16 md:top-20 lg:top-24 inset-x-10 md:inset-x-20 lg:inset-x-56 h-3/5 lg:h-auto" /*style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}*/>
                <div className="grid justify-center content-end text-center">
                    <h1 className="scroll-m-20 text-3xl font-bold md:text-5xl lg:text-5xl">Your perfect &thinsp;wedding <br />&ensp;starts here... DreamDay</h1>
                </div>
                <div className="grid place-items-center text-center">
                    <h3 className="text-sm md:text-lg lg:text-lg">Plan your dream day. Create an event, guest list, budget.
                        Send your guests a link to a survey and get to know their preferences so you can organize your dream celebration together. Manage your events.</h3>
                </div>
                {unauthenticated &&
                    <div className="flex justify-around flex-wrap flex-auto gap-x-6 gap-y-2 lg:pt-6">
                        <Button size='lg' className="w-40 justify-self-start"><Link to="sign-up">Young couple</Link></Button>
                        <Button variant='mainOutline' size='lg' className="w-40 justify-self-end"><Link to="guest">Guest</Link></Button>
                    </div>

                }
            </div>
        </div>
    );
}