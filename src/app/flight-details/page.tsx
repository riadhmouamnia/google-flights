import getFlightDetails from "@/actions/get-flight-details";
import FlightDetails from "@/components/flight-details";
export default async function FlightDetailsPage({
  searchParams,
}: {
  searchParams: Promise<{
    legs: string;
    itineraryId: string;
    sessionId: string;
  }>;
}) {
  const { legs, itineraryId, sessionId } = await searchParams;

  const flightDetails = await getFlightDetails({
    legs,
    itineraryId,
    sessionId,
  });

  if (!flightDetails?.data.itinerary.legs.length) {
    return <div>Flight not found</div>;
  }

  return <FlightDetails flightDetails={flightDetails} />;
}
