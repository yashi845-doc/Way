import { DataTable } from "../_components/DataTable";
import { SectionPage } from "../_components/SectionPage";
import { diamondRows } from "../_data/pageTables";

export default function DiamondsPage() {
  return (
    <SectionPage title="Diamonds">
      <DataTable
        title="Diamonds List"
        columns={["ID", "Name", "Amount", "Source"]}
        rows={diamondRows}
      />
    </SectionPage>
  );
}
