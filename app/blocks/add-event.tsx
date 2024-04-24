import React from 'react';
import { Button } from "~/atoms/ui/button";
import { Link } from "@remix-run/react";

export function AddEvent() {
  return (
    <div style={{ width: '200px', margin: 'auto auto', marginRight: 'auto' }}>
      <Link to="new-event"> 
        <Button style={{ display: 'block', width: '100%', marginTop: '30px', marginBottom: '30px' }} variant="outline">
          Add Your Dream Event
        </Button>
      </Link>
      <Link to="new-related-event"> 
        <Button style={{ display: 'block', width: '100%', marginBottom: '30px' }} variant="outline">
          Add Related Event
        </Button>
      </Link>
    </div>
  );
}
