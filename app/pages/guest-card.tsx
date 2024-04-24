import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { Button } from '~/atoms/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '~/atoms/ui/tabs';
import { GuestListTable } from "~/blocks/guest-list-table";
import { GuestPreferTable } from "~/blocks/guest-prefer-table";
import { GuestAdditionalInfo } from "~/blocks/guest-additional-info";

export const GuestCard = () => {

  return (
    <Card className="w-9/12 mt-5 mb-6 mx-auto dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Guest list</CardTitle>
        <CardDescription>Manage your guests and check their preferences.</CardDescription>
      </CardHeader>
      <Tabs defaultValue="guests">
        <TabsList className="grid mx-6 grid-cols-3">
          <TabsTrigger value="guests">Guest list</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="additional">Additional information</TabsTrigger>
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
        <TabsContent value="additional">
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