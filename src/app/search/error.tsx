"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  function onRetry() {
    startTransition(() => {
      router.refresh();
      reset();
    });
  }
  return (
    <div className="flex flex-col items-center justify-center p-8 animate-in fade-in">
      <Alert
        variant="destructive"
        className="max-w-2xl pg-primary-foreground bg-red-400/10  border-red-600 border-2 mb-6"
      >
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="ml-2 font-bold text-lg">{error.name}</AlertTitle>
        <AlertDescription className="ml-2 mt-2">
          {error.message}
        </AlertDescription>
      </Alert>
      <Button
        variant="outline"
        onClick={onRetry}
        className="flex items-center gap-2"
      >
        <RefreshCcw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
