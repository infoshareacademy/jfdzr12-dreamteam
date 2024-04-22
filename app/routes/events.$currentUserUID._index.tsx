
import React from 'react';
import { AddEvent } from '~/blocks/add-event';
import { CreatedEventNav } from '~/blocks/created-event-nav';
import { CreatedRelatedEventNav } from '~/blocks/created-related-event-nav';

export default function SignInPage() {
  return (
    <>
      <div> 
        <AddEvent />
        <CreatedEventNav />
        <CreatedRelatedEventNav />
      </div>
    </>
  );
}



