import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return <FlightsListSkeleton />;
}

function FlightsListSkeleton() {
  return (
    <div className="mt-12 space-y-6">
      {[...Array(3)].map((_, index) => (
        <FlightCardSkeleton key={index} />
      ))}
    </div>
  );
}

function FlightCardSkeleton() {
  return (
    <Card className="rounded-xl dark:bg-primary-foreground dark:border-2 animate-pulse">
      <div className="p-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-4 w-full">
            <Skeleton className="w-8 h-8 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="w-24 h-4" />
              <Skeleton className="w-36 h-3" />
            </div>
          </div>

          <div className="flex flex-col items-center w-full">
            <Skeleton className="w-20 h-4" />
          </div>

          <div className="flex flex-col items-center w-full">
            <Skeleton className="w-16 h-4" />
            <Skeleton className="w-12 h-3 mt-1" />
          </div>

          <div className="flex items-center gap-4 w-full justify-end">
            <div className="flex flex-col items-end">
              <Skeleton className="w-16 h-6" />
              <Skeleton className="w-24 h-3 mt-1" />
            </div>
            <Skeleton className="w-5 h-5" />
          </div>
        </div>
      </div>
    </Card>
  );
}
