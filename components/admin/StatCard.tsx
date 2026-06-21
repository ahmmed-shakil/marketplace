export function StatCard({ title, value, change, icon }: { title: string; value: string | number; change?: string; icon: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#e7f3ff] text-[#1877f2]">
          {icon}
        </div>
      </div>
      <p className="mt-2 text-3xl font-bold text-slate-900">{value}</p>
      {change && <p className="mt-1 text-xs text-emerald-600">{change}</p>}
    </div>
  );
}
