
import React from 'react';
import { Card } from '~/atoms/ui/card';
import { AddEvent } from '~/blocks/add-event';
import { CreatedEventNav } from '~/blocks/created-event-nav';
import { CreatedRelatedEventNav } from '~/blocks/created-related-event-nav';
import { transparentCardOnPage } from '~/lib/utils';

export default function SignInPage() {

   return (
      <div className={`h-screen bg-hero-low bg- bg-cover bg-bottom fixed top-0 left-0 right-0`}>
         <Card className={transparentCardOnPage}>
            <CreatedEventNav />
            <AddEvent />


            {/* <CreatedRelatedEventNav /> jest dodany ten komponent w pliku createdEventNav*/}
         </Card>
      </div>
   );
}