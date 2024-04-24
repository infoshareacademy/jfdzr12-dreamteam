import { Link, useNavigate } from "@remix-run/react"
import { Button } from "~/atoms/ui/button"
import { Container } from "~/atoms/ui/container"
import { Menu, Heart } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "~/atoms/ui/sheet";
import { ModeToggle } from "./mode-toggle"
import { useEffect, useState } from "react"
import { useCurrentUser, logout } from "~/db/auth"
import { getUserUID } from "~/db/get-user-uid"

export const Header = () => {
  const [userUID, setUserUID] = useState<string | null>();
  const navigate = useNavigate();
  const user = useCurrentUser();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/sign-in');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  }

  useEffect(() => {
    if (user.status === 'authenticated') {
      getUserUID()
        .then(res => setUserUID(res))
    } else {
      setUserUID(null)
    }
  }, [user.status])

  const renderNav = () => {
    if (userUID) {
      return (
        <>
        <Button variant={"ghost"}><Link to={`/${userUID}/events`}>Events</Link></Button>
        <Button variant={"ghost"} className="self-center text-sm font-medium transition-colors" onClick={handleLogout}>Sign out</Button>
        </>
      )
    } else {
      return (
        <>
          <Button variant={"ghost"} >
            <Link to='/guest'>Guest</Link>
          </Button>
          <Button variant={"ghost"}>
            <Link to='/sign-in' className="self-center text-sm font-medium transition-colors">Sign in</Link>
          </Button>
        </>
      )
    }
  }

  return (
    <header className="sticky top-0 sm:flex sm:justify-between py-0 px-4 border-b backdrop-blur-lg z-50">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Sheet>
              <SheetTrigger>
                <Menu className="h-6 md:hidden w-6" />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {renderNav()}
                </nav>
              </SheetContent>
            </Sheet>
            <Link to="/" className="ml-4 lg:ml-0">
              <h1 className="flex items-center gap-1.5 text-xl font-bold"><Heart className="h-6" />DreamDay</h1>
            </Link>
          </div>

          <div className="flex items-center space-x-2">
            <nav className="flex items-center space-x-0.25 lg:space-x-1 hidden md:block">
              {renderNav()}
            </nav>
            <ModeToggle />
          </div>
        </div>
      </Container>
    </header>
  )
}