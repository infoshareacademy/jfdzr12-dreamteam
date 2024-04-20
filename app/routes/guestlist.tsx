import { GuestListForm } from "~/blocks/guest-list-form";
import { GuestListTable } from "~/blocks/guest-list-table";

export default function GuestListPage() {
  return (
    <div className="mx-screen mx-auto max-w-7xl">
      <GuestListForm />
      <GuestListTable />
    </div>

  )
}