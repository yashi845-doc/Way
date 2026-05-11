"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { WayLogo } from "./dashboard/_components/WayLogo";

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    await fetch("/api/login", {
      method: "POST",
    });

    router.replace("/dashboard");
    router.refresh();
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070029] text-white">
      <div className="absolute inset-x-0 top-0 h-[360px] overflow-hidden bg-[#075ed9]">
        <div className="absolute -left-24 top-[-90px] h-[330px] w-[420px] rotate-[-38deg] rounded-[42px] bg-[#033a91]" />
        <div className="absolute left-[48%] top-[-230px] h-[520px] w-[520px] rounded-full bg-[#2e73ff]/35" />
        <div className="absolute left-[58%] top-[-210px] h-[430px] w-[430px] rounded-full bg-[#0b4bd4]/35" />
        <div className="absolute right-[8%] top-[120px] h-[86px] w-[112px] rotate-[-38deg] rounded-2xl bg-[#2676ee]" />
      </div>

      <section className="relative z-10 grid min-h-screen grid-cols-[1fr_480px] items-center gap-16 px-16">
        <div className="max-w-2xl pt-8">
          <div className="mb-12">
            <WayLogo />
          </div>
          <h1 className="text-[56px] font-bold leading-tight tracking-normal">
            Admin Login
          </h1>
          <p className="mt-5 max-w-xl text-xl leading-8 text-white/85">
            Sign in to manage users, events, content, diamonds, shop data, and
            support activity from one dashboard.
          </p>

          <div className="mt-12 grid grid-cols-3 gap-5">
            {["Users", "Events", "Shop"].map((item) => (
              <div key={item} className="rounded-md bg-[#232839] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
                <p className="text-sm text-[#98a0b4]">{item}</p>
                <p className="mt-3 text-2xl font-bold text-white">Ready</p>
              </div>
            ))}
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-md bg-[#232839] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)]"
        >
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
            <p className="mt-2 text-sm text-[#98a0b4]">
              Enter your admin details to continue.
            </p>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-[#c6ccda]">
              Email Address
            </span>
            <input
              type="email"
              defaultValue="admin@way.com"
              required
              className="h-12 w-full rounded border border-[#3d455d] bg-[#151b2c] px-4 text-sm text-white outline-none placeholder:text-[#697289] focus:border-[#096dff]"
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-[#c6ccda]">
              Password
            </span>
            <input
              type="password"
              defaultValue="Admin123"
              required
              className="h-12 w-full rounded border border-[#3d455d] bg-[#151b2c] px-4 text-sm text-white outline-none placeholder:text-[#697289] focus:border-[#096dff]"
            />
          </label>

          <div className="mt-5 flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-[#c6ccda]">
              <input type="checkbox" className="h-4 w-4 accent-[#096dff]" />
              Remember me
            </label>
            <button type="button" className="font-medium text-[#72a9ff]">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="mt-8 h-12 w-full rounded bg-[#096dff] text-base font-semibold text-white transition hover:bg-[#1e7bff]"
          >
            Sign In
          </button>

          <p className="mt-6 text-center text-sm text-[#98a0b4]">
            Protected admin access
          </p>
        </form>
      </section>
    </main>
  );
}
