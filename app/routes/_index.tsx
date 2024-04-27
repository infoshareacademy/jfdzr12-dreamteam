import type { MetaFunction } from "@remix-run/node";
import LandingPage from "~/blocks/landing-page";


export const meta: MetaFunction = () => {
  return [
    { title: "DreamDay" },
    { name: "description", content: "Welcome! This is the home page." },
  ];
};

export default function Index() {

  return (
    <LandingPage/>
  );
}