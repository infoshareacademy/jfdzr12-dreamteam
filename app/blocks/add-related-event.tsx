import { Button } from "~/atoms/ui/button";
import { Link } from "@remix-run/react";

export function AddRelatedEvent() {
  return (
    <Link to="new-related-event">
      <Button className="add-button shadow w-60" variant="mainOutline" size={"lg"}>
        Add related event
      </Button>
    </Link>
  );
}

