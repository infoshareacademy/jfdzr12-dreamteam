import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { Button } from '~/atoms/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '~/atoms/ui/tabs';
import { GuestListTable } from "~/blocks/guest-list-table";
import { GuestPreferTable } from "~/blocks/guest-prefer-table";
import { GuestAdditionalInfo } from "~/blocks/guest-additional-info";
import { GuestListForm } from "~/blocks/guest-list-form";

export const GuestCard = () => {

  return (
    <Card className="w-96 sm:w-11/12 md:w-11/12 lg:w-10/12 xl:w-9/12 mt-5 mb-6 mx-auto dashboard-06-chunk-0">
      <CardHeader className="grid grid-cols-3 justify-center">
        <div className="col-start-1 col-end-3">
          <CardTitle>Your Guests</CardTitle>
          <CardDescription>Manage your guests and check their preferences.</CardDescription>
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
            <GuestAdditionalInfo />
          </CardContent>
        </TabsContent>
      </Tabs>
      {/* <CardFooter className='grid justify-end'>
        <Button >Send email to all guests</Button>
      </CardFooter> */}
    </Card >
  )

}