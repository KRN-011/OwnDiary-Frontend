"use client";

import { useLoading } from "../providers/loading-provider";
import { Spinner } from "../ui/spinner";
import { cn } from "@/lib/utils";

interface GlobalLoadingProps {
    className?: string;
}

export default function GlobalLoading({ className }: GlobalLoadingProps) {
    const { isLoading } = useLoading();

    if (!isLoading) return null;

    return (
        <div
            className={cn(
                "absolute inset-0 z-50 flex items-center justify-center bg-white/30 dark:bg-black/30 backdrop-blur-md transition-all duration-300",
                className
            )}
        >
            <div className="flex flex-col items-center p-3 rounded-2xl bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-xl">
                <Spinner className="w-6 h-6 text-primary animate-spin" />
            </div>
        </div>
    );
}
