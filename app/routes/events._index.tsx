
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '~/atoms/ui/card';
import { AddEvent } from '~/blocks/add-event';
import { AddRelatedEvent } from '~/blocks/add-related-event';
import { CreatedEventNav } from '~/blocks/created-event-nav';
import { CreatedRelatedEventNav } from '~/blocks/created-related-event-nav';
import { transparentCardOnPage } from '~/lib/utils';

export default function SignInPage() {

   return (<>
      <div className={`h-screen bg-hero-low bg- bg-cover bg-bottom fixed top-0 left-0 right-0`}></div >
      <Card className={transparentCardOnPage}>
         <CardHeader>
            <CardTitle>Your events</CardTitle>
            <div className='grid lg:grid-cols-2 gap-8'>
               <CardDescription >
                  Welcome to our wedding planning website! Dreaming of the perfect wedding day? Our creator will allow you to customize every detail to reflect your unique love and style.
                  Design your dream wedding - date, location, decorations, and menu.
               </CardDescription>
               <CardDescription>Plan all accompanying events, such as pre-wedding receptions or bachelor/bachelorette parties. Track your guest list, budget, and schedule - all in one place, easily accessible from any device! Start planning your dream wedding today!
               </CardDescription>
            </div>
         </CardHeader>
         <CardContent className='grid lg:grid-cols-2 gap-4 mt-4'>
            <CreatedEventNav />
            <CreatedRelatedEventNav />
         </CardContent>
         <CardFooter className='grid lg:grid-cols-2 gap-4 justify-center justify-items-center mt-8'>
            <AddEvent />
            <AddRelatedEvent />
         </CardFooter>
      </Card>
   </>
   );
}