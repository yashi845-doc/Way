import { MicIcon } from "./Icons";

export function HeroBanner() {
  return (
    <section className="relative h-[202px] overflow-hidden rounded-bl-[16px] bg-[#075ed9] px-10 pt-5">
      <div className="absolute -left-14 top-0 h-[270px] w-[340px] rotate-[-38deg] rounded-[38px] bg-[#033a91]" />
      <div className="absolute left-[530px] top-[-200px] h-[430px] w-[430px] rounded-full bg-[#2e73ff]/35" />
      <div className="absolute left-[650px] top-[-188px] h-[350px] w-[350px] rounded-full bg-[#0b4bd4]/35" />
      <div className="absolute left-[744px] top-[-120px] h-[350px] w-[350px] rounded-full bg-[#1f63de]/45" />
      <div className="absolute right-[365px] top-[-60px] h-[150px] w-[360px] rotate-[26deg] rounded-b-full bg-[#0b42b0]/60" />
      <div className="absolute right-[420px] top-[108px] h-16 w-24 rotate-[-38deg] rounded-2xl bg-[#2676ee]" />

      <div className="relative z-10 flex items-start justify-between">
        <div>
          <h1 className="text-[42px] font-bold leading-tight tracking-normal">
            Hello Admin !
          </h1>
          <p className="mt-2 text-2xl font-medium">
            orem Ipsum is simply dummy text of the printing
          </p>
        </div>
        <button className="mt-[18px] flex h-10 w-[210px] items-center justify-center gap-4 rounded bg-white/10 text-base shadow-sm">
          <MicIcon className="h-5 w-5" />
          Announcments
        </button>
      </div>
    </section>
  );
}
