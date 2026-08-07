"use client";

import { Package, ShoppingCart, FileText, Users, BarChart3, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
    icon: typeof Package;
    label: string;
    active?: boolean;
}

const navItems: NavItem[] = [
    { icon: Package, label: "Inventory", active: true },
    { icon: ShoppingCart, label: "Orders" },
    { icon: FileText, label: "Invoices" },
    { icon: Users, label: "Customers" },
    { icon: BarChart3, label: "Reports" },
    { icon: Settings, label: "Settings" },
];

export default function Sidebar() {
    return (
        <aside className="flex h-full w-16 flex-col items-center gap-2 border-r border-amber-100 bg-gradient-to-b from-amber-50 to-orange-50 py-4 dark:border-amber-900/30 dark:from-slate-900 dark:to-slate-800">
            <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-amber-500 text-white shadow-lg shadow-teal-500/20">
                <Package className="size-5" />
            </div>
            {navItems.map((item) => (
                <button
                    key={item.label}
                    className={cn(
                        "group relative flex size-11 items-center justify-center rounded-xl transition-all duration-200",
                        item.active
                            ? "bg-teal-500 text-white shadow-lg shadow-teal-500/30"
                            : "text-stone-500 hover:bg-amber-100/70 hover:text-stone-800 dark:text-stone-400 dark:hover:bg-slate-800 dark:hover:text-stone-100"
                    )}
                    title={item.label}
                >
                    <item.icon
                        className={cn(
                            "size-5 transition-transform duration-200",
                            !item.active && "group-hover:scale-110"
                        )}
                    />
                </button>
            ))}
            <div className="mt-auto">
                <div className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xs font-bold text-white shadow-md">
                    AM
                </div>
            </div>
        </aside>
    );
}
