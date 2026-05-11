import { statCards } from "../_data/dashboardData";

export function StatsGrid() {
  return (
    <section className="relative z-20 -mt-10 grid grid-cols-5 gap-10 px-10">
      {statCards.map((card: any) => (
        <div
          key={card.title}
          className="group flex h-[114px] items-center gap-5 rounded-md bg-[#232839] px-6 shadow-[0_18px_40px_rgba(0,0,0,0.22)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#27304a] hover:shadow-[0_24px_52px_rgba(9,109,255,0.24)]"
        >
          <div
            className={`grid h-[63px] w-[63px] shrink-0 place-items-center rounded-full ${card.color} transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_26px_rgba(255,255,255,0.22)]`}
          >
            <card.icon className="h-8 w-8 text-white transition-transform duration-300 group-hover:scale-110" />
          </div>
          <div>
            <p className="text-base text-[#929aae]">{card.title}</p>
            <p className="mt-2 text-xl font-semibold tracking-wide text-[#d5d9e2]">
              {card.value}
            </p>
            <p className="mt-2 text-xs font-semibold text-[#00ff4a]">
              {"\u2191"} 12.5%
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}
