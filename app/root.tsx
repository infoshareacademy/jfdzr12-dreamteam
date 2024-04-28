import {
  Link,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";

import styles from "./globals.css?url";
import { LinksFunction } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import { Header } from "~/blocks/header";
import { ThemeProvider } from "~/blocks/theme-provider"
import { Toaster } from "./atoms/ui/toaster";
import { ToastProvider } from "@radix-ui/react-toast";
import { Button } from "./atoms/ui/button";
import { mainCardOnPage } from "./lib/utils";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: styles },
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
]

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon/favicon.png" />
        <title>DreamDay</title>
      </head>
      <body>
        {children}
        <Toaster />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <ThemeProvider storageKey="vite-ui-theme">
      <Header />
      <Outlet />
    </ThemeProvider>
  )
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="fixed z-10 h-screen bg-table-pattern bg-cover bg-bottom top-0 left-0 right-0">
        <div className="grid gap-4 md:gap-8 absolute
        top-16 md:top-20 lg:top-24 xl:top-24 2xl:top-44
        inset-x-10 md:inset-x-20 lg:inset-x-56 xl:inset-x-60 2xl:inset-x-96 
        h-3/5 lg:h-auto 2xl:h-1/2">
          <div className="grid justify-center content-end text-center">
            <h1 className="scroll-m-20 text-3xl font-bold md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl">No worries...</h1>
          </div>
          <div className="grid place-items-center text-center">
            <h3 className="text-sm md:text-lg lg:text-lg xl:text-xl 2xl:text-2xl">let's get you back on track to the main page where the magic happens, whether you're here to plan a wedding or share your event preferences as a guest!</h3>
          </div>
          <div className="grid justify-center content-end text-center">
            <Button size='lg' variant='mainOutline' className="flex justify-center flex-wrap flex-auto"><Link to="/">Back to DreamDay</Link></Button>
          </div>
        </div>
      </div>
    );
  }
}
