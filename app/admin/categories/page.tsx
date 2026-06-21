"use client";

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getCategoryTree } from "@/lib/mock";
import type { CategoryTreeNode } from "@/lib/data";

function TreeNode({ node, depth = 0 }: { node: CategoryTreeNode; depth?: number }) {
  const [open, setOpen] = useState(depth === 0);
  const hasChildren = node.children.length > 0;

  return (
    <div>
      <button
        onClick={() => hasChildren && setOpen(!open)}
        className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-50"
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        {hasChildren ? (open ? <ChevronDown className="h-4 w-4 text-slate-400" /> : <ChevronRight className="h-4 w-4 text-slate-400" />) : <span className="w-4" />}
        <span className="font-medium text-slate-900">{node.name}</span>
        <span className="ml-auto text-xs text-slate-400">{node.productCount} products</span>
      </button>
      {open && node.children.map((child) => (
        <TreeNode key={child.id} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export default function AdminCategoriesPage() {
  const tree = getCategoryTree();
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-slate-900">Categories</h1>
      <p className="text-sm text-slate-500">Hierarchical category tree</p>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-4">
        {tree.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    </div>
  );
}
