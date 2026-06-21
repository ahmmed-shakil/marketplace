import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { vendors } from "@/lib/mock/vendors";

export default function AdminVendorsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900">Vendors</h1>
      <p className="text-sm text-slate-500">{vendors.length} registered vendors</p>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Business</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Listings</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Tier</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Status</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((v) => (
              <tr key={v.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                <td className="px-4 py-3 font-medium text-slate-900">{v.businessName}</td>
                <td className="px-4 py-3 text-slate-600">{v.listingCount}</td>
                <td className="px-4 py-3"><Badge variant={v.tier === "premium" ? "gradient" : "default"}>{v.tier}</Badge></td>
                <td className="px-4 py-3"><Badge variant={v.status === "active" ? "success" : "warning"}>{v.status}</Badge></td>
                <td className="px-4 py-3">
                  {v.status === "pending" && (
                    <div className="flex gap-2">
                      <Button size="sm" variant="primary">Approve</Button>
                      <Button size="sm" variant="ghost">Reject</Button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
