import { Button } from "~/atoms/ui/button";
import { Link } from "@remix-run/react";

export function AddEvent() {
  return (
    <Link to="new-event">
      <Button variant={"mainOutline"} className="add-button shadow w-60" size={"lg"}>
        Add wedding event
      </Button>
    </Link >
  );
}

