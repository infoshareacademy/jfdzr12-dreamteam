import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/atoms/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '~/atoms/ui/tabs';
import { GuestListTable } from "~/blocks/guest-list-table";
import { GuestPreferTable } from "~/blocks/guest-prefer-table";
import { GuestMenuInfo } from "~/blocks/guest-menu-info";
import { GuestListForm } from "~/blocks/guest-list-form";

export const GuestCard = () => {

  return (<>
    <div className="fixed z-10 h-screen bg-table-pattern bg-cover bg-bottom top-0 left-0 right-0">
    </div>
    <Card className="absolute z-20 top-20 inset-x-1/2 -translate-x-1/2 w-80 sm:w-11/12 md:w-11/12 lg:w-10/12 xl:w-10/12 2xl:w-9/12">
      <CardHeader className="grid auto-cols-auto sm:grid-cols-3 gap-4 justify-center">
        <div className="col-start-1 col-end-3">
          <CardTitle>Your Guests</CardTitle>
          <CardDescription className="pt-2">Manage your guests and check their preferences.</CardDescription>
        </div>
        <div className="col-start-3 self-center justify-self-end"><GuestListForm /></div>
      </CardHeader>
      <Tabs defaultValue="guests">
        <TabsList className="grid mx-6 grid-cols-3">
          <TabsTrigger value="guests">Guest list</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="menu">Menu</TabsTrigger>
        </TabsList>
        <TabsContent value="guests">
          <CardContent>
            <GuestListTable />
          </CardContent>
        </TabsContent>
        <TabsContent value="preferences">
          <CardContent>
            <GuestPreferTable />
          </CardContent>
        </TabsContent>
        <TabsContent value="menu">
          <CardContent>
            <GuestMenuInfo />
          </CardContent>
        </TabsContent>
      </Tabs>
      {/* <CardFooter className='grid justify-end'>
        <Button >Send email to all guests</Button>
      </CardFooter> */}
    </Card >

  </>
  )

}