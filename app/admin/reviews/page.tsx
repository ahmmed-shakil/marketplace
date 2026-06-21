"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { getPendingReviews, reviews } from "@/lib/mock/reviews";
import { getProductById } from "@/lib/mock/products";

export default function AdminReviewsPage() {
  const pending = getPendingReviews();
  const all = reviews;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900">Review Moderation</h1>
      <p className="text-sm text-slate-500">{pending.length} pending reviews</p>

      {pending.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold text-slate-900">Pending Queue</h2>
          <div className="mt-3 space-y-3">
            {pending.map((r) => {
              const product = getProductById(r.productId);
              return (
                <div key={r.id} className="rounded-2xl border border-amber-200 bg-amber-50/50 p-5">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge variant="warning">Pending</Badge>
                      <h3 className="mt-2 font-semibold text-slate-900">{r.title}</h3>
                      <p className="text-sm text-slate-500">{product?.name} · by {r.userName}</p>
                      <p className="mt-2 text-sm text-slate-600">{r.body}</p>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm">Approve</Button>
                      <Button size="sm" variant="ghost">Reject</Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8">
        <h2 className="font-semibold text-slate-900">All Reviews</h2>
        <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Product</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">User</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Rating</th>
                <th className="px-4 py-3 text-left font-medium text-slate-500">Status</th>
              </tr>
            </thead>
            <tbody>
              {all.map((r) => {
                const product = getProductById(r.productId);
                return (
                  <tr key={r.id} className="border-b border-slate-50">
                    <td className="px-4 py-3">{product?.name}</td>
                    <td className="px-4 py-3">{r.userName}</td>
                    <td className="px-4 py-3">{"★".repeat(r.rating)}</td>
                    <td className="px-4 py-3"><Badge variant={r.status === "approved" ? "success" : r.status === "pending" ? "warning" : "danger"}>{r.status}</Badge></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
