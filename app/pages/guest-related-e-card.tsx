import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/atoms/ui/card";
import { RelatedEventGuestListForm } from "~/blocks/related-e-guest-list-form";
import { RelatedEventGuestListTable } from "~/blocks/related-e-guest-list-table";

export const RelatedEventGuestCard = () => {

  return (<>
    <div className="fixed z-10 h-screen bg-table-pattern bg-cover bg-bottom top-0 left-0 right-0">
    </div>
    <Card className="absolute z-20 top-20 inset-x-1/2 -translate-x-1/2 w-80 sm:w-11/12 md:w-11/12 lg:w-10/12 xl:w-10/12 2xl:w-9/12">
      <CardHeader className="grid auto-cols-auto sm:grid-cols-3 gap-4 justify-center">
        <div className="col-start-1 col-end-3">
          <CardTitle>Your Guests</CardTitle>
          <CardDescription>Lets party! Manage your guests.</CardDescription>
        </div>
        <div className="col-start-3 self-center justify-self-end"><RelatedEventGuestListForm /></div>
      </CardHeader>
      <CardContent>
        <RelatedEventGuestListTable />
      </CardContent>
    </Card >
  </>
  )

}