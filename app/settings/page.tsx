import { DataTable } from "../_components/DataTable";
import { SectionPage } from "../_components/SectionPage";
import { settingsRows } from "../_data/pageTables";

export default function SettingsPage() {
  return (
    <SectionPage title="Settings">
      <DataTable title="Settings List" columns={["ID", "Name", "Value", "Type"]} rows={settingsRows} />
    </SectionPage>
  );
}
