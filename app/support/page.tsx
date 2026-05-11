import { DataTable } from "../_components/DataTable";
import { SectionPage } from "../_components/SectionPage";
import { supportRows } from "../_data/pageTables";

export default function SupportPage() {
  return (
    <SectionPage title="Support">
      <DataTable title="Support List" columns={["ID", "Name", "Status", "User"]} rows={supportRows} />
    </SectionPage>
  );
}
