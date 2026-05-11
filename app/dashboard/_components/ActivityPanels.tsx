import { recentActivities, topEvents } from "../_data/dashboardData";

function PaperPlaneBadge() {
  return (
    <span className="relative grid h-[45px] w-[45px] shrink-0 place-items-center rounded-md bg-[#303a65]">
      <span className="absolute h-6 w-6 rotate-[38deg] rounded-[4px] bg-gradient-to-br from-[#8eaaff] via-[#4777ff] to-[#253cbc] shadow-[0_0_12px_rgba(76,118,255,0.45)] [clip-path:polygon(50%_0,100%_88%,52%_68%,0_88%)]" />
      <span className="absolute h-[22px] w-[8px] rotate-[35deg] rounded-full bg-white/25 blur-[1px]" />
    </span>
  );
}

function PanelHeader({ title }: { title: string }) {
  return (
    <div className="flex items-start justify-between px-6 pt-[21px]">
      <div>
        <h2 className="text-xl font-medium text-[#e1e4ed]">{title}</h2>
        <p className="mt-3 text-base text-[#9da5b8]">15 New Acquired ths month</p>
      </div>
      <button className="mt-4 text-base text-[#969db1]">View All</button>
    </div>
  );
}

export function ActivityPanels() {
  return (
    <section className="grid grid-cols-2 gap-9 px-10 pb-10 pt-9">
      <div className="h-[525px] overflow-hidden rounded-md bg-[#14204a] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
        <PanelHeader title="Recent Activity" />

        <div className="mt-8">
          {recentActivities.map((activity: any, index: number) => (
            <div
              key={`${activity.title}-${index}`}
              className={`flex h-[76px] items-center gap-4 px-4 ${
                index % 2 === 1 ? "bg-[#212b52]" : ""
              } ${index === 0 ? "border-b border-[#3a405b]" : ""}`}
            >
              <PaperPlaneBadge />
              <div className="min-w-0 flex-1">
                <p className="truncate text-lg font-medium text-[#e1e4eb]">
                  {activity.title}
                </p>
                <p className="mt-1 truncate text-xs text-[#d0d4df]">
                  {activity.description}
                </p>
              </div>
              <p className="w-[140px] shrink-0 text-right text-base text-[#d7dbe5]">
                {activity.time}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-0 border-t-[3px] border-[#38435d]" />
      </div>

      <div className="h-[525px] overflow-hidden rounded-md bg-[#14204a] shadow-[0_20px_50px_rgba(0,0,0,0.25)]">
        <PanelHeader title="Top Event by Participant" />

        <div className="mt-8">
          {topEvents.map((event: any, index: number) => (
            <div
              key={event.name}
              className={`grid h-[76px] grid-cols-[45px_1fr_248px_112px] items-center gap-4 px-6 ${
                index % 2 === 1 ? "bg-[#212b52]" : ""
              } ${index === 0 ? "border-b border-[#3a405b]" : ""}`}
            >
              <PaperPlaneBadge />
              <div className="min-w-0">
                <p className="truncate text-lg font-medium text-[#dfe3ec]">
                  {event.name}
                </p>
                <p className="mt-1 truncate text-xs text-[#d0d4df]">
                  {event.category}
                </p>
              </div>
              <div className="group/line h-2.5 overflow-hidden rounded-full bg-[#53679c]">
                <div
                  className={`relative h-full overflow-hidden rounded-full ${event.color} transition-transform duration-300 group-hover/line:translate-x-1 group-hover/line:scale-x-105`}
                  style={{ width: `${event.percent}%` }}
                >
                  <span className="absolute inset-y-0 -left-8 w-8 skew-x-[-18deg] bg-white/35 transition-transform duration-700 group-hover/line:translate-x-[280px]" />
                </div>
              </div>
              <p className="text-right text-base font-semibold text-[#d7dbe4]">
                {event.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-0 border-t-[3px] border-[#38435d]" />
      </div>
    </section>
  );
}
