"use client";

import { useState, type ComponentType } from "react";
import { cn } from "@/lib/utils";
import { CheckCircle2, AlertTriangle, Download } from "lucide-react";

export type StockStatus = "In-Stock" | "Low" | "Out";

export interface Product {
    sku: string;
    name: string;
    stock: number;
    price: number;
    status: StockStatus;
}

interface ProductsTableProps {
    products: Product[];
}

const baseProducts: Product[] = [
    { sku: "ALM-001", name: "Steel Beam 6m", stock: 247, price: 189.99, status: "In-Stock" },
    { sku: "ALM-002", name: "Copper Wire 2.5mm", stock: 1240, price: 34.5, status: "In-Stock" },
    { sku: "ALM-003", name: "Cement Bag 50kg", stock: 18, price: 12.75, status: "Low" },
    { sku: "ALM-004", name: "PVC Pipe 4in", stock: 0, price: 28.0, status: "Out" },
    { sku: "ALM-005", name: "Galvanized Nails 3in", stock: 5890, price: 8.25, status: "In-Stock" },
    { sku: "ALM-006", name: "Insulation Roll 50m", stock: 42, price: 76.0, status: "Low" },
];

export function useProducts() {
    const [products, setProducts] = useState<Product[]>(baseProducts);

    const adjustStock = function (index: number, delta: number) {
        setProducts(function (prev) {
            return prev.map(function (p, i) {
                if (i !== index) return p;
                const newStock = Math.max(0, p.stock + delta);
                let newStatus: StockStatus = "In-Stock";
                if (newStock === 0) newStatus = "Out";
                else if (newStock < 50) newStatus = "Low";
                return { ...p, stock: newStock, status: newStatus };
            });
        });
    };

    return { products, adjustStock };
}

const STATUS_STYLES: Record<StockStatus, string> = {
    "In-Stock":
        "bg-teal-50 text-teal-700 border-teal-200 dark:bg-teal-500/10 dark:text-teal-400 dark:border-teal-500/30",
    Low: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/30",
    Out: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30",
};

const STATUS_ICONS: Record<StockStatus, ComponentType<{ className?: string }>> = {
    "In-Stock": CheckCircle2,
    Low: AlertTriangle,
    Out: AlertTriangle,
};

function StatusBadge({ status }: { status: StockStatus }) {
    const Icon = STATUS_ICONS[status];
    return (
        <span
            className={cn(
                "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold",
                STATUS_STYLES[status]
            )}
        >
            <Icon className="size-3" />
            {status}
        </span>
    );
}

export default function ProductsTable({ products }: ProductsTableProps) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800/50">
            <div className="flex items-center justify-between border-b border-amber-100 px-5 py-3 dark:border-slate-700/50">
                <div>
                    <h3 className="font-semibold text-stone-800 dark:text-stone-100">
                        Products Inventory
                    </h3>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                        {products.length} items across 6 SKUs
                    </p>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg border border-amber-100 bg-white px-3 py-1.5 text-xs font-medium text-stone-600 transition-colors hover:bg-amber-50 dark:border-slate-700 dark:bg-slate-800 dark:text-stone-300 dark:hover:bg-slate-700">
                    <Download className="size-3.5" />
                    Export
                </button>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm">
                    <thead className="sticky top-0 bg-amber-50/80 backdrop-blur-sm dark:bg-slate-900/80">
                        <tr className="text-left text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
                            <th className="px-5 py-3">SKU</th>
                            <th className="px-5 py-3">Product</th>
                            <th className="px-5 py-3 text-right">Stock</th>
                            <th className="px-5 py-3 text-right">Price</th>
                            <th className="px-5 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-amber-50 dark:divide-slate-700/40">
                        {products.map(function (product, idx) {
                            return (
                                <tr
                                    key={product.sku}
                                    onMouseEnter={function () { setHovered(idx); }}
                                    onMouseLeave={function () { setHovered(null); }}
                                    className={cn(
                                        "transition-all duration-200",
                                        hovered === idx
                                            ? "bg-gradient-to-r from-teal-50/60 via-amber-50/40 to-transparent dark:from-teal-500/10 dark:via-amber-500/5"
                                            : "hover:bg-amber-50/30 dark:hover:bg-slate-700/30",
                                        hovered === idx && "-translate-x-0.5"
                                    )}
                                >
                                    <td className="px-5 py-3 font-mono text-xs font-medium text-teal-700 dark:text-teal-400">
                                        {product.sku}
                                    </td>
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={cn(
                                                    "flex size-8 items-center justify-center rounded-lg text-xs font-bold text-white shadow-sm",
                                                    idx % 3 === 0
                                                        ? "bg-gradient-to-br from-teal-400 to-teal-600"
                                                        : idx % 3 === 1
                                                        ? "bg-gradient-to-br from-amber-400 to-orange-500"
                                                        : "bg-gradient-to-br from-stone-400 to-stone-600"
                                                )}
                                            >
                                                {product.name
                                                    .split(" ")
                                                    .map(function (w) { return w[0]; })
                                                    .slice(0, 2)
                                                    .join("")}
                                            </div>
                                            <span className="font-medium text-stone-800 dark:text-stone-100">
                                                {product.name}
                                            </span>
                                        </div>
                                    </td>
                                    <td
                                        className={cn(
                                            "px-5 py-3 text-right font-semibold tabular-nums transition-transform",
                                            product.status === "Out"
                                                ? "text-rose-600 dark:text-rose-400"
                                                : product.status === "Low"
                                                ? "text-amber-600 dark:text-amber-400"
                                                : "text-stone-800 dark:text-stone-100"
                                        )}
                                    >
                                        {product.stock.toLocaleString()}
                                    </td>
                                    <td className="px-5 py-3 text-right font-medium tabular-nums text-stone-700 dark:text-stone-200">
                                        ${product.price.toFixed(2)}
                                    </td>
                                    <td className="px-5 py-3">
                                        <StatusBadge status={product.status} />
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
