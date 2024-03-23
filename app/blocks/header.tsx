import { Link } from "@remix-run/react"
import { Button } from "~/atoms/ui/button"
import { Container } from "~/atoms/ui/container"
import { Sun, Moon } from "lucide-react"

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
            <Button variant={"ghost"} size={"icon"} className="mr-6" aria-label="Toogle Theme">
              <Sun />
              <Moon />
            </Button>
          </div>
        </div>
      </Container>
    </header>
  )
}