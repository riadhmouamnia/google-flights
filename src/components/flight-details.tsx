"use client";
import { useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Plane,
  Clock,
  Calendar,
  Star,
  ArrowRight,
  Luggage,
  Coffee,
  Wifi,
  Monitor,
  ArrowLeft,
} from "lucide-react";
import { formatDuration } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function FlightDetails({
  flightDetails,
}: {
  flightDetails: FlightDetailsResponse;
}) {
  // Default to the first pricing option.
  const [selectedPriceOption, setSelectedPriceOption] = useState(
    flightDetails.data.itinerary.pricingOptions[0]
  );
  const flight = flightDetails.data.itinerary;
  const router = useRouter();

  // Get the agent and its first segment from the currently selected pricing option.
  const selectedAgent = selectedPriceOption.agents[0];
  const agentSegment = selectedAgent.segments[0];

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a");
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), "EEE, MMM d, yyyy");
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <nav className="mb-8 w-full">
        <Button variant="ghost" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </Button>
      </nav>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="bg-primary-foreground dark:border-2 rounded-lg shadow-sm p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center">
                <Image
                  src={agentSegment.marketingCarrier.logo}
                  alt={agentSegment.marketingCarrier.name}
                  className="w-full h-full object-contain"
                  width={48}
                  height={48}
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold">
                  {agentSegment.marketingCarrier.name}
                </h1>
                <p className="text-sm text-muted-foreground">
                  Flight {agentSegment.flightNumber}
                </p>
                <p className="text-sm text-muted-foreground">
                  Agent: {selectedAgent.name}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-3xl font-bold">
                ${selectedPriceOption.totalPrice.toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground">per person</p>
            </div>
          </div>
        </div>

        {/* Flight Details Card */}
        <Card className="p-6 dark:border-2 bg-primary-foreground shadow-sm">
          <div className="space-y-6">
            {/* Route and Time */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="flex items-center gap-4">
                <Plane className="text-primary h-6 w-6" />
                <div className="space-y-1">
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-semibold">
                      {formatTime(agentSegment.departure)}
                    </span>
                    <ArrowRight className="h-5 w-5 text-muted-foreground" />
                    <span className="text-2xl font-semibold">
                      {formatTime(agentSegment.arrival)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>
                      {agentSegment.origin.city} (
                      {agentSegment.origin.displayCode})
                    </span>
                    <span>to</span>
                    <span>
                      {agentSegment.destination.city} (
                      {agentSegment.destination.displayCode})
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>{formatDuration(agentSegment.duration)}</span>
              </div>
            </div>

            {/* Date and Flight Details */}
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-muted-foreground" />
                <span>{formatDate(agentSegment.departure)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400" />
                <span className="text-sm">
                  {selectedAgent.rating.value.toFixed(1)} (
                  {selectedAgent.rating.count} reviews)
                </span>
              </div>
            </div>

            {/* Amenities */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-2">
                <Luggage className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Carry-on included</span>
              </div>
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Meals available</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">Wi-Fi on board</span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm">In-flight entertainment</span>
              </div>
            </div>

            {/* Pricing Options */}
            <Separator />
            <div className="space-y-4">
              <h3 className="font-semibold">Available Options</h3>
              <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                <div className="grid gap-4">
                  {flight.pricingOptions.map((option) => (
                    <div
                      key={option.agents[0].id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        selectedPriceOption.agents[0].id === option.agents[0].id
                          ? "border-primary bg-primary/5"
                          : "hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedPriceOption(option)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">{option.agents[0].name}</p>
                          <p className="text-sm text-muted-foreground">
                            Direct booking available
                          </p>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex gap-2 items-center">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="text-sm">
                              {option.agents[0].rating.value.toFixed(1)}
                            </span>
                          </div>
                          <p className="text-xl font-bold">
                            ${option.totalPrice.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Book Button */}
            <div className="flex justify-end">
              <Button asChild variant="secondary" className="w-full md:w-auto">
                <Link href={selectedPriceOption.agents[0].url} target="_blank">
                  Book Flight
                </Link>
              </Button>
            </div>
          </div>
        </Card>

        {/* Destination Image */}
        {flight.destinationImage && (
          <div className="rounded-lg overflow-hidden shadow-sm">
            <Image
              src={flight.destinationImage}
              alt={`${agentSegment.destination.city} destination`}
              className="w-full h-64 object-cover"
              width={1024}
              height={384}
            />
          </div>
        )}
      </div>
    </div>
  );
}
