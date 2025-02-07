"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 animate-in fade-in">
      <Alert
        variant="destructive"
        className="max-w-2xl pg-primary-foreground border-red-400 border-2 mb-6"
      >
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="ml-2 font-bold text-lg">{error.name}</AlertTitle>
        <AlertDescription className="ml-2 mt-2">
          {error.message}
        </AlertDescription>
      </Alert>
    </div>
  );
}
