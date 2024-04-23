import type { MetaFunction } from "@remix-run/node";
import { useNavigate } from "@remix-run/react";
import { useEffect } from "react";
import LandingPage from "~/blocks/landing-page";
import { useCurrentUser } from "~/db/auth";
import { getUserUID } from "~/db/get-user-uid";

export const meta: MetaFunction = () => {
  return [
    { title: "DreamDay" },
    { name: "description", content: "Welcome! This is the home page." },
  ];
};

export default function Index() {
    const user = useCurrentUser();
    const navigate = useNavigate();

    useEffect(() => {
        if(user.status === 'authenticated') {
            getUserUID()
            .then(res => navigate(`${res}`))
        } else {
            navigate("/")
        }
    }, [user.status])

  return (
    <LandingPage/>
  );
}