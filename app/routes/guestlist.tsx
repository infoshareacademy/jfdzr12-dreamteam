import { GuestList } from "~/blocks/guest-list";
import { GuestListForm } from "~/blocks/guest-list-form";
import { GuestListTable } from "~/blocks/guest-list-table";

export default function GuestListPage() {
  return (<>
    <GuestListForm />
    <GuestListTable />
    {/* <GuestList /> */}
  </>

  )
}