import { DataTable } from "../../_components/DataTable";
import { SectionPage } from "../../_components/SectionPage";
import { leaderboardRows } from "../../_data/pageTables";

export default function LeaderboardPage() {
  return (
    <SectionPage title="Leaderboard">
      <DataTable
        title="Leaderboard List"
        columns={["ID", "Name", "Rank", "Score"]}
        rows={leaderboardRows}
      />
    </SectionPage>
  );
}
