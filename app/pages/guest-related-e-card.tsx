import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/atoms/ui/card";
import { RelatedEventGuestListForm } from "~/blocks/related-e-guest-list-form";
import { RelatedEventGuestListTable } from "~/blocks/related-e-guest-list-table";

export const RelatedEventGuestCard = () => {

  return (
    <Card className="w-96 sm:w-11/12 md:w-11/12 lg:w-10/12 xl:w-9/12 mt-5 mb-6 mx-auto dashboard-06-chunk-0">
      <CardHeader className="grid grid-cols-3 justify-center">
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
  )

}