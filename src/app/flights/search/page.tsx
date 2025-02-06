import getConfig from "@/actions/get-config";
import getFlights from "@/actions/get-flights";

export default async function Search({
  searchParams,
}: {
  searchParams: {
    originCountry: string;
    originSkyId: string;
    originEntityId: string;
    destinationSkyId: string;
    destinationEntityId: string;
    departure: string;
    adults: string;
  };
}) {
  const {
    originCountry,
    originSkyId,
    originEntityId,
    destinationSkyId,
    destinationEntityId,
    departure,
    adults,
  } = await searchParams;
  const config = await getConfig(originCountry);
  const cabinClass = "economy"; //economy: Economy premium_economy: Premium Economy business: Business first: First
  const sortBy = "best"; //best : Best price_high : Cheapest fastest : Fastest outbound_take_off_time : Outbound Take Off Time outbound_landing_time : Outbound Landing Time return_take_off_time : Return Take Off Time return_landing_time : Return Landinf Time
  const currency = config?.currency; //currency can be retrieved from api/v1/getConfig endpoint(data->currency) Default value: USD Ex: USD
  const market = config?.market; //market can be retrieved from api/v1/getConfig endpoint(data->market) Default value: en-US Ex: en-US
  const countryCode = config?.countryCode; //countryCode can be retrieved from api/v1/getConfig endpoint(data->countryCode) Default value: US Ex: US
  const flights = await getFlights({
    originSkyId,
    destinationSkyId,
    originEntityId,
    destinationEntityId,
    departure,
    adults,
    cabinClass,
    sortBy,
    currency,
    market,
    countryCode,
  });
  return (
    <div>
      <h1>Search</h1>
      <p>{JSON.stringify(flights)}</p>
    </div>
  );
}
