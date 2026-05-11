import { BarChart } from "./_components/BarChart";
import { ActivityPanels } from "./_components/ActivityPanels";
import { ChartPanel } from "./_components/ChartPanel";
import { HeroBanner } from "./_components/HeroBanner";
import { LineChart } from "./_components/LineChart";
import { Sidebar } from "./_components/Sidebar";
import { StatsGrid } from "./_components/StatsGrid";
import { Topbar } from "./_components/Topbar";

export default function DashboardPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#070029] text-white">
      <div className="flex min-h-screen">
        <Sidebar />

        <section className="min-w-0 flex-1">
          <Topbar />
        
          <div className="relative">
            <HeroBanner />
            <StatsGrid />
               
            <section className="grid grid-cols-2 gap-9 px-10 pt-[43px]">
              <ChartPanel title="User Growth" subtitle="Gross User">
                <LineChart />
              </ChartPanel>

              <ChartPanel
                title="Diamonds Overview"
                legend={
                  <div className="flex items-center gap-7 text-sm text-[#6372b1]">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#226dff]" />
                      Total Diamond
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[#226dff]" />
                      Diamond Used
                    </span>
                  </div>
                }
              >
                <BarChart />
              </ChartPanel>
            </section>

            <ActivityPanels />
          </div>
        </section>
      </div>
    </main>
  );
}
