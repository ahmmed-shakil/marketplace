import type { SpecRow } from "@/lib/data";

export function SpecTable({ specs }: { specs: SpecRow[] }) {
  const groups = specs.reduce<Record<string, SpecRow[]>>((acc, spec) => {
    const g = spec.group ?? "General";
    if (!acc[g]) acc[g] = [];
    acc[g].push(spec);
    return acc;
  }, {});

  return (
    <div className="space-y-5">
      {Object.entries(groups).map(([group, rows]) => (
        <div key={group}>
          <h4 className="mb-2 text-sm font-bold uppercase tracking-wide fb-text">{group}</h4>
          <div className="overflow-hidden rounded-md border border-[#dadde1]">
            <table className="w-full text-[15px]">
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.slug} className={i % 2 === 0 ? "bg-white" : "bg-[#f0f2f5]"}>
                    <td className="w-2/5 px-4 py-3 font-semibold text-[#65676b]">{row.name}</td>
                    <td className="px-4 py-3 font-medium text-[#050505]">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
