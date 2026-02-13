"use client";

import { useEffect, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "../providers/loading-provider";

function NavigationEvents() {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const { hideLoading, showLoading } = useLoading();

    // Hide loading when route changes are complete (pathname or searchParams change)
    useEffect(() => {
        hideLoading();
    }, [pathname, searchParams, hideLoading]);

    // Global click listener to detect internal link clicks
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = (e.target as HTMLElement).closest("a");
            if (
                target &&
                target instanceof HTMLAnchorElement &&
                target.href &&
                target.href.startsWith(window.location.origin) &&
                !target.href.includes("#") &&
                target.target !== "_blank"
            ) {
                // Only show loading if it's an internal link and not a hash link or new tab
                const currentUrl = window.location.href;
                const targetUrl = target.href;

                if (currentUrl !== targetUrl) {
                    showLoading();
                }
            }
        };

        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, [showLoading]);

    return null;
}

export default function RouteLoadingTrigger() {
    return (
        <Suspense fallback={null}>
            <NavigationEvents />
        </Suspense>
    );
}
