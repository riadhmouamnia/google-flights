"use client";
import { useState } from "react";
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
  const [passengers, setPassengers] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isFlightDetailsRoute = pathname?.includes("/flight-details");

  if (isFlightDetailsRoute) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (!departure || !origin || !destination || !passengers) return;
    updateURLParams();
    setIsLoading(false);
  };

  const updateURLParams = () => {
    // Create a new URLSearchParams object
    const params = new URLSearchParams();

    // Clear existing parameters
    params.delete("originIata");
    params.delete("originCountry");
    params.delete("originCity");
    params.delete("originSkyid");
    params.delete("originEntityid");
    params.delete("destinationIata");
    params.delete("destinationCountry");
    params.delete("destinationCity");
    params.delete("destinationSkyid");
    params.delete("destinationEntityid");
    params.delete("date");
    params.delete("passengers");

    // if no params are passed, we don't want to add them to the URL
    if (!origin && !destination && !departure && !passengers) {
      return;
    }

    // Add parameters only if they have a value
    if (origin) {
      params.set("originIata", origin.iata);
      params.set("originCountry", origin.country);
      params.set("originCity", origin.city);
      params.set("originSkyid", origin.SkyId);
      params.set("originEntityid", origin.EntityId);
    }

    if (destination) {
      params.set("destinationIata", destination.iata);
      params.set("destinationCountry", destination.country);
      params.set("destinationCity", destination.city);
      params.set("destinationSkyid", destination.SkyId);
      params.set("destinationEntityid", destination.EntityId);
    }
    if (departure) {
      params.set("departure", format(departure, "yyyy-MM-dd"));
    }
    if (passengers) {
      params.set("passengers", passengers.toString());
    }

    // Update the URL without causing a full page reload
    router.push(`flights/search?${params.toString()}`);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-primary-foreground rounded-xl shadow-sm max-w-4xl mx-auto"
    >
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
          <Label htmlFor="destination">To</Label>
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
            id="passengers"
            type="number"
            min="1"
            max="10"
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="h-12"
          />
        </div>
      </div>
      <Button
        type="submit"
        className={`w-full h-12 text-lg font-medium ${
          isLoading && "animate-pulse"
        }`}
        disabled={isLoading || !origin || !destination || !departure}
      >
        {isLoading ? (
          <Loader2 className="w-full h-12 text-lg font-medium mr-2 animate-spin" />
        ) : (
          "Explore"
        )}
      </Button>
    </form>
  );
}
