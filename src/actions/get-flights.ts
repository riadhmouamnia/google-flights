"use server";

export default async function getFlights({
  originSkyId,
  destinationSkyId,
  originEntityId,
  destinationEntityId,
  departure,
  adults,
  cabinClass = "economy",
  sortBy = "best",
  currency = "USD",
  market = "en-US",
  countryCode = "US",
}: {
  originSkyId: string;
  destinationSkyId: string;
  originEntityId: string;
  destinationEntityId: string;
  departure: string;
  adults: string;
  cabinClass?: string;
  sortBy?: string;
  currency?: string;
  market?: string;
  countryCode?: string;
}) {
  try {
    const parsedAdults = parseInt(adults || "1");
    const url = `https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlights?originSkyId=${originSkyId}&destinationSkyId=${destinationSkyId}&originEntityId=${originEntityId}&destinationEntityId=${destinationEntityId}&date=${departure}&cabinClass=${cabinClass}&adults=${parsedAdults}&sortBy=${sortBy}&currency=${currency}&market=${market}&countryCode=${countryCode}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };
    const response = await fetch(url, options);
    const result: FlightsResponse = await response.json();
    if (result.message?.startsWith("You have exceeded")) {
      throw new Error(
        "You have exceeded the MONTHLY quota for Requests on your current plan, BASIC. Upgrade your plan at https://rapidapi.com/apiheya/api/sky-scrapper"
      );
    }
    if (result.data.context.status === "failure") {
      throw new Error("faild to fetch flights");
    }
    const flights = result.data;
    return flights;
  } catch (error) {
    console.error("Error fetching flights:", error);
    throw error;
  }
}
