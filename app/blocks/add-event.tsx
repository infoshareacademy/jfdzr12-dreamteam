import React from 'react';
import { Button } from "~/atoms/ui/button";
import { Link } from "@remix-run/react";

export function AddEvent() {
  return (
    <>
    <Link to="/new-event"> {/* podpinam tutaj rute od Moniki-formularz eventu*/}
      <Button 
        style={{ display: 'block', width: '200px', margin: '0 auto' }} 
        variant="outline"
      >
        Add Your Dream Event
      </Button>
    </Link>
      <Link to="/new-related-event"> {/* podpinam tutaj rute od Moniki-formularz eventu*/}
      <Button 
        style={{ display: 'block', width: '200px', margin: '0 auto' }} 
        variant="outline"
      >
        Add Related Event
      </Button>
    </Link>
    </>
  );
}