import { DataTable } from "../../_components/DataTable";
import { SectionPage } from "../../_components/SectionPage";
import { reelsRows } from "../../_data/pageTables";

export default function ReelsContentPage() {
  return (
    <SectionPage title="Reels / Content">
      <DataTable
        title="Content List"
        columns={["ID", "Name", "Type", "Diamonds"]}
        rows={reelsRows}
      />
    </SectionPage>
  );
}
