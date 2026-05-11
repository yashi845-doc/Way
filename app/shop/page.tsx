import { DataTable } from "../_components/DataTable";
import { SectionPage } from "../_components/SectionPage";
import { shopRows } from "../_data/pageTables";

export default function ShopPage() {
  return (
    <SectionPage title="Shop">
      <DataTable
        title="Shop List"
        columns={["ID", "Name", "Price", "Stock"]}
        rows={shopRows}
      />
    </SectionPage>
  );
}
