import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import styles from "./globals.css?url";
import { LinksFunction } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";
import { Header } from "~/blocks/header";
import { ThemeProvider } from "~/blocks/theme-provider"
import { Toaster } from "./atoms/ui/toaster";
import { ToastProvider } from "@radix-ui/react-toast";

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
        <link rel="icon" type="image/svg+xml" href="../favicon/favicon.svg" />
        <link rel="icon" type="image/png" href="../favicon/favicon.png" />
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
      <ToastProvider>
      <Outlet />
      </ToastProvider>
    </ThemeProvider>
  )
}
