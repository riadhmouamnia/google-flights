"use server";

export default async function getFlightDetails({
  legs,
  itineraryId,
  sessionId,
}: {
  legs: string;
  itineraryId: string;
  sessionId: string;
}) {
  const url = `https://sky-scrapper.p.rapidapi.com/api/v1/flights/getFlightDetails?itineraryId=${itineraryId}&legs=${legs}&sessionId=${sessionId}&adults=4&currency=USD&locale=en-US&market=en-US&cabinClass=economy&countryCode=US`;

  const options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY || "",
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result: FlightDetailsResponse = await response.json();
    if (result.status === false) {
      throw new Error(result.message);
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
