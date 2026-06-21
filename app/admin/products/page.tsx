import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { products } from "@/lib/mock/products";
import { getBrandById } from "@/lib/mock/brands";
import { formatPriceRange } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-500">{products.length} products in catalog</p>
        </div>
        <Button>Add Product</Button>
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="w-full text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Name</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Brand</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Price</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Rating</th>
              <th className="px-4 py-3 text-left font-medium text-slate-500">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const brand = getBrandById(p.brandId);
              return (
                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                  <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                  <td className="px-4 py-3 text-slate-600">{brand?.name}</td>
                  <td className="px-4 py-3 text-slate-600">{formatPriceRange(p.minPrice, p.maxPrice)}</td>
                  <td className="px-4 py-3 text-slate-600">★ {p.rating}</td>
                  <td className="px-4 py-3"><Badge variant={p.status === "published" ? "success" : "warning"}>{p.status}</Badge></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
