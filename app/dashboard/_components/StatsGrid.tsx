import { statCards } from "../_data/dashboardData";

export function StatsGrid() {
  return (
    <section className="relative z-20 -mt-10 grid grid-cols-5 gap-10 px-10">
      {statCards.map((card: any) => (
        <div
          key={card.title}
          className="group flex h-[114px] items-center gap-5 rounded-md bg-[#232839] px-6"
        >
          <div
            className={`grid h-[63px] w-[63px] place-items-center rounded-full ${card.color}`}
          >
            <card.icon className="h-8 w-8 text-white" />
          </div>

          <div>
            <p className="text-base text-[#929aae]">
              {card.title}
            </p>

            <p className="mt-2 text-xl font-semibold text-white">
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </section>
  );
}