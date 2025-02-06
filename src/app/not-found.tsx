import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-2xl">Page not found</p>
      <Button asChild>
        <Link href="/">Home</Link>
      </Button>
    </div>
  );
}
