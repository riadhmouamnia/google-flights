"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Plane, Usb, MonitorPlay } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { formatDuration } from "@/lib/utils";

interface FlightCardProps {
  flight: Itinerary;
  itineraryId: string;
  sessionId: string;
  legs: string;
}

export function FlightCard({
  flight,
  itineraryId,
  sessionId,
  legs,
}: FlightCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const leg = flight.legs[0] as FlightLeg;
  const segment = leg.segments[0];

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a");
  };

  return (
    <Card className="rounded-xl dark:bg-primary-foreground dark:border-2 animate-in ease-in-out duration-300">
      <div
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center justify-center md:justify-start gap-4 w-full">
            <div className="w-8 h-8 rounded-full ring-2 ring-secondary overflow-hidden flex items-center justify-center">
              {!leg.carriers.marketing[0].logoUrl ? (
                <div className="flex items-center justify-center w-full h-full">
                  <Plane className="w-8 h-8" />
                </div>
              ) : (
                <Image
                  src={leg.carriers.marketing[0].logoUrl}
                  alt={leg.carriers.marketing[0].name}
                  className="w-full h-full object-cover"
                  width={32}
                  height={32}
                />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2 text-sm text-center lg:text-left">
                <span className="font-bold">{formatTime(leg.departure)}</span>
                <span className="text-muted-foreground"> - </span>
                <span className="font-bold">{formatTime(leg.arrival)}</span>
              </div>
              <p className="text-sm text-muted-foreground text-center lg:text-left">
                {leg.carriers.marketing[0].name} ·{" "}
                {formatDuration(leg.durationInMinutes)}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-start w-full">
            <p className="text-sm font-bold">
              {leg.origin.displayCode} → {leg.destination.displayCode}
            </p>
          </div>

          <div className="flex flex-col items-center justify-start w-full">
            <p className="font-bold text-sm text-muted-foreground">
              {!leg.stopCount ? "NONSTOP" : "STOPS"}
            </p>
            <p>{leg.isSmallestStops && "Smallest stops"}</p>
            <p className="text-xs text-muted-foreground">
              {leg.stopCount > 0
                ? leg.stopCount === 1
                  ? "1 stop"
                  : `${leg.stopCount} stops`
                : ""}
            </p>
          </div>

          <div className="flex items-center gap-4 w-full justify-end">
            <div className="flex flex-col items-end">
              <p className="text-2xl font-bold">{flight.price.formatted}</p>
              <p className="text-sm text-muted-foreground">round trip</p>
            </div>
            {isExpanded ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </div>
        </div>
      </div>

      {isExpanded && (
        <div className="px-4 pb-4 border-t">
          <div className="pt-4 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 flex-shrink-0">
                <div className="w-8 h-8 flex items-center justify-center">
                  <Plane className="text-primary" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-medium">{leg.carriers.marketing[0].name}</p>
                <p className="text-sm text-muted-foreground">
                  Flight {segment.flightNumber}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-8 flex-shrink-0" />
              <div className="flex-1">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <MonitorPlay className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">On-demand video</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Usb className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">In-seat USB outlet</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>Checked baggage not included in price</p>
                    <p>Full refund for cancellations</p>
                    <p>Free change, possible fare difference</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <Button asChild variant="secondary">
                <Link
                  href={{
                    pathname: "/flight-details",
                    query: {
                      legs,
                      itineraryId,
                      sessionId,
                    },
                  }}
                >
                  View
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
