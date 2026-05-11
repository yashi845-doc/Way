import { AdminShell } from "../dashboard/_components/AdminShell";

export function SectionPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <AdminShell>
      <div className="p-10">
        <div className="mb-7 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">{title}</h1>
        </div>
        <div className="space-y-6">{children}</div>
      </div>
    </AdminShell>
  );
}
