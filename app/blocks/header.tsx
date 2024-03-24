"use client";

import { Link } from "@remix-run/react"
import { Button } from "~/atoms/ui/button"
import { Container } from "~/atoms/ui/container"
import { Sun, Moon } from "lucide-react"
import { ProfileButton } from "~/blocks/profileButton"
import { useTheme } from "next-themes";


/*routes roboczo */
const routes = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'About',
    href: '/'
  }
  ,
  {
    label: 'Sign in',
    href: '/'
  },
  {
    label: 'Log in',
    href: '/'
  },
  {
    label: 'Guest',
    href: '/'
  }
]

export const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="ml-4 lg:ml-0">
              <h1 className="text-xl font-semibold">Logo</h1>
            </Link>
          </div>
          <nav className="mx-6 flex items-center space-x-4 lg:space-x-6 hidden md:block">
            {routes.map((route, i) => (
              <Button asChild variant={"ghost"} key={i}>
                <Link
                  key={i}
                  to={route.href}
                  className="text-sm font-medium transition-colors"
                >
                  {route.label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="flex items-center">
            <Button variant={"ghost"} size={"icon"} className="mr-6" aria-label="Toggle Theme"
              onClick={() => { setTheme(theme === 'dark' ? 'light' : 'dark') }}>
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absoluteh-6 w-6 rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle Theme</span>
            </Button>
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  )
}