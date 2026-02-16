"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  // hooks
  const router = useRouter();

  // handle go back
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="text-center max-w-lg w-full">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="p-4 rounded-2xl bg-muted">
            <BarChart3 className="h-10 w-10 text-foreground" />
          </div>
        </div>

        {/* 404 Heading */}
        <h1 className="text-7xl font-bold tracking-tight text-foreground">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold text-foreground">
          This Page doesn't exist.
        </h2>

        {/* Description */}
        <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
          Looks like this page went bankrupt or never had a budget assigned.
          <br />
          Let’s get you back to tracking profits instead of chasing ghosts.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/dashboard">
            <Button className="w-full sm:w-auto">Go to Dashboard</Button>
          </Link>

          <Button
            variant="outline"
            className="w-full sm:w-auto flex items-center gap-2"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Button>
        </div>

        {/* Footer Note */}
        <p className="mt-10 text-xs text-muted-foreground">
          Error Code: PAGE_NOT_FOUND
        </p>
      </div>
    </div>
  );
}
