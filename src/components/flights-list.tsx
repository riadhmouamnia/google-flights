import { format } from "date-fns";
import { FlightCard } from "./flight-card";

export default function FlightsList({
  flights,
}: {
  flights: FlightsResponse["data"];
}) {
  return (
    <div className="mt-12 space-y-6 animate-in">
      {flights.itineraries.map((itinerary, index) => {
        const flightDetails = [
          {
            destination: itinerary.legs[0].destination.id,
            origin: itinerary.legs[0].origin.id,
            date: format(itinerary.legs[0].departure, "yyyy-MM-dd"),
          },
        ];
        const itineraryId = itinerary.id;
        const sessionId = flights.context.sessionId;
        const legs = encodeURIComponent(JSON.stringify(flightDetails));
        return (
          <FlightCard
            key={index}
            flight={itinerary}
            legs={legs}
            itineraryId={itineraryId}
            sessionId={sessionId}
          />
        );
      })}
    </div>
  );
}
