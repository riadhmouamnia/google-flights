"use server";

export async function getAirportDetails(city: string) {
  if (!city) return [];
  try {
    const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport?query=${encodeURIComponent(
      city
    )}`;
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
        "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
      },
    };

    const response = await fetch(url, options);
    const result: AirportResponse = await response.json();
    if (!result?.data) return [];

    // Extract relevant details from response
    return result.data.map((airport: AirportData) => ({
      SkyId: airport.skyId,
      EntityId: airport.entityId,
      city: airport.presentation.title,
      country: airport.presentation.subtitle,
      iata: airport.skyId,
    }));
  } catch (error) {
    console.error("Error fetching airport details:", error);
    return [];
  }
}
