import {
  ArrowLeftIcon,
  BellIcon,
  MailIcon,
  SearchIcon,
} from "./Icons";

export function Topbar() {
  return (
    <header className="flex h-[77px] items-center justify-between bg-[#222637] px-9">
      <div className="flex items-center gap-6">
        <button className="grid h-8 w-8 place-items-center rounded-full bg-[#126fff] text-white">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="flex h-9 w-[298px] items-center gap-3 rounded border border-[#343b52] px-4 text-[#aab2c3] transition-colors duration-300 focus-within:border-[#6d8bff] focus-within:bg-white/5">
          <SearchIcon className="h-5 w-5 shrink-0" />
          <input
            type="search"
            placeholder="Search..."
            className="h-full min-w-0 flex-1 bg-transparent text-base text-[#dfe4f2] outline-none placeholder:text-[#aab2c3]"
            aria-label="Search dashboard"
          />
        </div>
      </div>

      <div className="flex items-center gap-5">
        <div className="grid h-8 w-8 place-items-center rounded-full bg-white">
          <span className="text-sm font-bold text-[#0f743c]">IN</span>
        </div>
        <BellIcon className="h-5 w-5 cursor-pointer text-[#7f879b] transition-all duration-300 hover:scale-110 hover:text-white" />
        <MailIcon className="h-6 w-6 cursor-pointer text-[#7f879b] transition-all duration-300 hover:scale-110 hover:text-white" />
        <div className="h-11 w-11 rounded-full border-[5px] border-white bg-[#2e67dd] p-1">
          <div className="h-full w-full rounded-full bg-gradient-to-b from-[#1f2937] via-[#ffe0bd] to-[#2451b4]" />
        </div>
        <div className="leading-tight">
          <p className="text-base font-medium text-white">Austin Robertson</p>
          <p className="mt-1 text-sm text-[#a2a9b8]">
            Marketing Administrator
          </p>
        </div>
      </div>
    </header>
  );
}
