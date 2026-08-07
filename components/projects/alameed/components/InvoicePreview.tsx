"use client";

import { FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";

interface LineItem {
    name: string;
    qty: number;
    price: number;
}

const lineItems: LineItem[] = [
    { name: "Steel Beam 6m", qty: 12, price: 189.99 },
    { name: "Copper Wire 2.5mm", qty: 45, price: 34.5 },
    { name: "Galvanized Nails 3in", qty: 120, price: 8.25 },
];

export default function InvoicePreview() {
    const subtotal = lineItems.reduce((s, it) => s + it.qty * it.price, 0);
    const tax = subtotal * 0.05;
    const total = subtotal + tax;

    return (
        <div className="overflow-hidden rounded-2xl border border-amber-100 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-800/50">
            <div className="flex items-center justify-between border-b border-amber-100 bg-gradient-to-r from-teal-500 via-teal-500 to-amber-500 px-4 py-3 dark:border-slate-700/50">
                <div className="flex items-center gap-2.5 text-white">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-white/15 backdrop-blur-sm">
                        <FileText className="size-4" />
                    </div>
                    <div>
                        <p className="text-[11px] font-medium uppercase tracking-wider text-white/75">
                            Latest Invoice
                        </p>
                        <p className="text-sm font-bold">#INV-10294</p>
                    </div>
                </div>
                <button className="flex items-center gap-1.5 rounded-lg bg-white/15 px-2.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/25">
                    <Download className="size-3.5" />
                    PDF
                </button>
            </div>

            <div className="space-y-2 p-4">
                <div className="flex items-center justify-between text-xs">
                    <div>
                        <p className="font-semibold text-stone-800 dark:text-stone-100">
                            Cairo Construction Co.
                        </p>
                        <p className="text-stone-500 dark:text-stone-400">Aug 7, 2026</p>
                    </div>
                    <span className="rounded-full bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-700 dark:bg-teal-500/10 dark:text-teal-400">
                        Paid
                    </span>
                </div>

                <div className="mt-3 divide-y divide-amber-50 rounded-xl border border-amber-100/60 dark:divide-slate-700/50 dark:border-slate-700/50">
                    {lineItems.map((item, i) => {
                        const lineTotal = item.qty * item.price;
                        return (
                            <div
                                key={i}
                                className="flex items-center justify-between px-3 py-2 first:rounded-t-xl last:rounded-b-xl hover:bg-amber-50/50 dark:hover:bg-slate-700/30"
                            >
                                <div className="flex items-center gap-2.5">
                                    <div
                                        className={cn(
                                            "flex size-7 items-center justify-center rounded-md text-[10px] font-bold text-white",
                                            i === 0
                                                ? "bg-gradient-to-br from-teal-400 to-teal-600"
                                                : i === 1
                                                ? "bg-gradient-to-br from-amber-400 to-orange-500"
                                                : "bg-gradient-to-br from-stone-400 to-stone-600"
                                        )}
                                    >
                                        {item.name
                                            .split(" ")
                                            .map((w) => w[0])
                                            .slice(0, 2)
                                            .join("")}
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-stone-800 dark:text-stone-100">
                                            {item.name}
                                        </p>
                                        <p className="text-[11px] text-stone-500 dark:text-stone-400">
                                            {item.qty} x ${item.price.toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                <p className="text-xs font-semibold tabular-nums text-stone-700 dark:text-stone-200">
                                    ${lineTotal.toFixed(2)}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-3 space-y-1.5 border-t border-dashed border-amber-200 pt-3 dark:border-slate-700">
                    <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400">
                        <span>Subtotal</span>
                        <span className="tabular-nums">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400">
                        <span>VAT (5%)</span>
                        <span className="tabular-nums">${tax.toFixed(2)}</span>
                    </div>
                    <div className="flex items-baseline justify-between pt-1">
                        <span className="text-sm font-semibold text-stone-700 dark:text-stone-200">
                            Total
                        </span>
                        <span className="bg-gradient-to-r from-teal-600 to-amber-600 bg-clip-text text-lg font-extrabold tabular-nums text-transparent">
                            ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
