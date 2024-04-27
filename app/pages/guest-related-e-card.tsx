import { Link, useParams } from "@remix-run/react";
import { Button } from "~/atoms/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/atoms/ui/card";
import { RelatedEventGuestListForm } from "~/blocks/related-e-guest-list-form";
import { RelatedEventGuestListTable } from "~/blocks/related-e-guest-list-table";
import { mainCardOnPage } from "~/lib/utils";

export const RelatedEventGuestCard = () => {

  const { currentUserUID, eventID } = useParams();

  return (<>
    {/* <div className="fixed z-10 h-screen bg-table-pattern bg-cover bg-bottom top-0 left-0 right-0">
    </div> */}
    <Card className={mainCardOnPage}>
      <CardHeader className="grid auto-cols-auto sm:grid-cols-3 gap-4 justify-center">
        <div className="col-start-1 col-end-3">
          <CardTitle>Your party guests</CardTitle>
          <CardDescription>Lets party! Manage your guests.</CardDescription>
        </div>
        <div className="col-start-3 self-center justify-self-end"><RelatedEventGuestListForm /></div>
      </CardHeader>
      <CardContent>
        <RelatedEventGuestListTable />
      </CardContent>
      <CardFooter className='grid justify-end'>
        <Button variant='secondary'><Link to={`/events/related-event/${eventID}`}>Back to your event</Link></Button>
      </CardFooter>
    </Card >
  </>
  )

}