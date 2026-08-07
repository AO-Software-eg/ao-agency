"use client";

import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import ProductsTable, { useProducts } from "./ProductsTable";
import SalesSummary from "./SalesSummary";
import InvoicePreview from "./InvoicePreview";
import StockStatus from "./StockStatus";

interface InventoryWindowProps {
    revenue: number;
    orders: number;
    onRefresh?: () => void;
    refreshing?: boolean;
}

export default function InventoryWindow({
    revenue,
    orders,
    onRefresh,
    refreshing,
}: InventoryWindowProps) {
    const { products } = useProducts();

    const inStock = products.filter((p) => p.status === "In-Stock").length;
    const low = products.filter((p) => p.status === "Low").length;
    const out = products.filter((p) => p.status === "Out").length;

    return (
        <div className="flex h-full w-full overflow-hidden rounded-2xl border border-amber-200/70 bg-gradient-to-br from-amber-50 via-white to-orange-50 shadow-2xl shadow-amber-200/40 dark:border-slate-700/60 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 dark:shadow-black/40">
            <Sidebar />

            <div className="flex flex-1 flex-col overflow-hidden">
                <SearchBar onRefresh={onRefresh} refreshing={refreshing} />

                <div className="grid flex-1 grid-cols-1 gap-4 overflow-auto p-4 lg:grid-cols-[1fr_360px]">
                    <div className="flex min-h-0 flex-col">
                        <ProductsTable products={products} />
                    </div>

                    <div className="flex flex-col gap-4">
                        <SalesSummary revenue={revenue} orders={orders} />
                        <InvoicePreview />
                        <StockStatus inStock={inStock} low={low} out={out} />
                    </div>
                </div>
            </div>
        </div>
    );
}
