import { Link } from "@remix-run/react"
import { Button } from "~/atoms/ui/button"
import { Container } from "~/atoms/ui/container"
import { Menu } from "lucide-react"
import { ProfileButton } from "~/blocks/profileButton"
import { Sheet, SheetContent, SheetTrigger } from "~/atoms/ui/sheet";
import { ModeToggle } from "./mode-toggle"


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

  return (
    <header className="sm:flex sm:justify-between py-3 px-4 border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {routes.map((route, i) => (
                    <Link key={i} to={route.href} className="block py-1 px-2 text-lg">
                      {route.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
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
          <div className="flex items-center space-x-4">
            <ModeToggle />
            <ProfileButton />
          </div>
        </div>
      </Container>
    </header>
  )
}