import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LoadingPage() {
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <Skeleton className="w-16 h-16 rounded-full" />
            <div>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="ml-auto">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-16 mt-1" />
            </div>
          </div>
        </Card>

        {/* Flight Details Card */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-6 w-20" />
            </div>
            <Separator />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-24" />
                </div>
              ))}
            </div>
            <Separator />
            <div className="space-y-4">
              <Skeleton className="h-4 w-28" />
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <div className="grid gap-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-lg border flex justify-between items-center"
                    >
                      <div className="flex flex-col gap-2">
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-2 w-32" />
                      </div>
                      <div className="flex flex-col gap-2 items-end">
                        <Skeleton className="h-2 w-16" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            <div className="flex justify-end">
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </Card>
        {/* Destination Image */}
        <Skeleton className="w-full h-64 rounded-lg bg-muted" />
      </div>
    </div>
  );
}
