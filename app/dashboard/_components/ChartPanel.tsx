import { ChevronDownIcon } from "./Icons";

type ChartPanelProps = {
  title: string;
  subtitle?: string;
  legend?: React.ReactNode;
  children: React.ReactNode;
};

export function ChartPanel({
  title,
  subtitle,
  legend,
  children,
}: ChartPanelProps) {
  return (
    <div className="h-[447px] rounded-md bg-[#232839] px-6 py-7">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-medium text-[#e2e4eb]">{title}</h2>
          {subtitle ? (
            <p className="mt-3 text-base text-[#6070ae]">{subtitle}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-24">
          {legend ?? (
            <span className="flex items-center gap-2 text-sm text-[#6372b1]">
              <span className="h-2.5 w-2.5 rounded-full bg-[#226dff]" />
              Users
            </span>
          )}
          <button className="flex items-center gap-3 text-base text-[#6372b1]">
            This Week
            <ChevronDownIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
}
