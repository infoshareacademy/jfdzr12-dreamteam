import { GuestListForm } from "~/blocks/guest-list-form";
import { GuestCard } from "~/pages/guest-card";

export default function GuestListPage() {
  return (
    <div className="mx-screen mx-auto max-w-7xl">
      <GuestListForm />
      <GuestCard />
    </div>

  )
}