"use client";

import { useEffect, useState, useCallback } from "react";
import type { ExperienceProps } from "@/types/projects";
import InventoryWindow from "./components/InventoryWindow";

export default function Experience({ progress, active }: ExperienceProps) {
    void progress;
    void active;

    const [revenue, setRevenue] = useState(247830);
    const [orders, setOrders] = useState(1843);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        const id = window.setInterval(() => {
            setRevenue((r) => {
                const jitter = (Math.random() - 0.3) * 420;
                return Math.round(Math.max(230000, r + jitter));
            });
            setOrders((o) => {
                const jitter = (Math.random() - 0.3) * 3;
                return Math.round(Math.max(1780, o + jitter));
            });
        }, 2400);
        return () => window.clearInterval(id);
    }, []);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        setRevenue((r) => r + Math.round((Math.random() - 0.2) * 1800));
        setOrders((o) => o + Math.floor(Math.random() * 8));
        window.setTimeout(() => setRefreshing(false), 900);
    }, []);

    return (
        <div
            className="flex h-full w-full items-center justify-center p-3 sm:p-4 md:p-6 lg:p-8"
            style={{
                background:
                    "radial-gradient(ellipse at top, #fff7ed 0%, #fffbeb 45%, #fef3c7 100%)",
            }}
        >
            <div className="h-full w-full max-w-[1400px]">
                <InventoryWindow
                    revenue={revenue}
                    orders={orders}
                    onRefresh={handleRefresh}
                    refreshing={refreshing}
                />
            </div>
        </div>
    );
}
