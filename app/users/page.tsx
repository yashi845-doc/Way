import { DataTable } from "../_components/DataTable";
import { SectionPage } from "../_components/SectionPage";
import { usersRows } from "../_data/pageTables";

export default function UsersPage() {
  return (
    <SectionPage title="Users">
      <DataTable
        title="Users List"
        columns={["ID", "Name", "Phone", "Status"]}
        rows={usersRows}
      />
    </SectionPage>
  );
}
