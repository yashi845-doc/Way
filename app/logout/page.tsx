"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    fetch("/api/logout", { method: "POST" }).finally(() => {
      router.replace("/");
      router.refresh();
    });
  }, [router]);

  return (
    <main className="grid min-h-screen place-items-center bg-[#070029] text-white">
      <p className="text-lg font-semibold">Signing out...</p>
    </main>
  );
}
