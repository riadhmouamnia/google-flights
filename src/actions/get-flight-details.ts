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
      "x-rapidapi-key": "a0689f32d1msh055a01a4b1b6181p16c8adjsnabf82ff06283",
      "x-rapidapi-host": "sky-scrapper.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result: FlightDetailsResponse = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
