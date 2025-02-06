"use client";
import { useState, useTransition } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AirportCombobox from "./airport-combobox";
import { usePathname, useRouter } from "next/navigation";

export function SearchForm() {
  const [origin, setOrigin] = useState<AirportDetails | null>(null);
  const [destination, setDestination] = useState<AirportDetails | null>(null);
  const [departure, setDeparture] = useState<Date>();
  const [adults, setAdults] = useState(1);
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isFlightDetailsRoute = pathname?.includes("/flight-details");

  if (isFlightDetailsRoute) return null;

  const handleSearch = () => {
    const queryParams = new URLSearchParams({
      originCountry: origin?.country || "",
      originSkyId: origin?.SkyId || "",
      originEntityId: origin?.EntityId || "",
      destinationSkyId: destination?.SkyId || "",
      destinationEntityId: destination?.EntityId || "",
      departure: departure ? format(departure, "yyyy-MM-dd") : "",
      adults: String(adults),
    }).toString();

    startTransition(() => {
      router.push(`/search?${queryParams}`);
    });
  };

  return (
    <form className="space-y-6 p-6 bg-primary-foreground dark:border-2 rounded-xl shadow-sm max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="origin">From</Label>
          <AirportCombobox
            searchPlaceholder="Search an origin airport..."
            selectItemMsg="Select an origin city"
            key="origin"
            onValueChange={(value) => setOrigin(value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="destination">Where to</Label>
          <AirportCombobox
            searchPlaceholder="Search an destination airport..."
            selectItemMsg="Select an destination city"
            key="destination"
            onValueChange={(value) => setDestination(value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Departure Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full h-12 justify-start text-left font-normal",
                  !departure && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departure ? format(departure, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={departure}
                onSelect={setDeparture}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <Label htmlFor="passengers">Passengers</Label>
          <Input
            id="adults"
            type="number"
            min="1"
            max="10"
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="h-12"
          />
        </div>
      </div>
      <Button
        type="submit"
        className="w-full text-md font-medium"
        disabled={!origin || !destination || !departure || isPending}
        onClick={handleSearch}
      >
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Explore"
        )}
      </Button>
    </form>
  );
}
