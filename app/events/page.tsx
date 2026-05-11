import { DataTable } from "../_components/DataTable";
import { SectionPage } from "../_components/SectionPage";
import { eventRows } from "../_data/pageTables";

export default function EventsPage() {
  return (
    <SectionPage title="Events">
      <DataTable title="Events List" columns={["ID", "Name", "Category", "Participants"]} rows={eventRows} />
    </SectionPage>
  );
}
