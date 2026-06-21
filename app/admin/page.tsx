import { Package, Store, MessageSquare, Users } from "lucide-react";
import { StatCard } from "@/components/admin/StatCard";
import { getAdminStats, getAdminActivities } from "@/lib/mock";

export default function AdminDashboard() {
  const stats = getAdminStats();
  const activities = getAdminActivities();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
      <p className="text-sm text-slate-500">Platform overview</p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Products" value={stats.totalProducts} change={`+${stats.productsAddedThisWeek} this week`} icon={<Package className="h-4 w-4" />} />
        <StatCard title="Active Vendors" value={stats.totalVendors} icon={<Store className="h-4 w-4" />} />
        <StatCard title="Pending Reviews" value={stats.pendingReviews} icon={<MessageSquare className="h-4 w-4" />} />
        <StatCard title="Monthly Visitors" value={stats.monthlyVisitors.toLocaleString()} icon={<Users className="h-4 w-4" />} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Recent Activity</h2>
          <div className="mt-4 space-y-3">
            {activities.map((a) => (
              <div key={a.id} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0">
                <div>
                  <p className="text-sm font-medium text-slate-900">{a.action}</p>
                  <p className="text-xs text-slate-500">{a.entityName}</p>
                </div>
                <span className="text-xs text-slate-400">{new Date(a.timestamp).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="font-semibold text-slate-900">Traffic Overview</h2>
          <div className="mt-8 flex h-40 items-end justify-between gap-2 px-4">
            {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-lg gradient-bg opacity-80" style={{ height: `${h}%` }} />
            ))}
          </div>
          <p className="mt-4 text-center text-xs text-slate-400">Last 7 days (mock data)</p>
        </div>
      </div>
    </div>
  );
}
