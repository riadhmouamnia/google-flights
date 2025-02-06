interface AirportResponse {
  status: boolean;
  timestamp: number;
  data: AirportData[] | [];
}

interface AirportData {
  skyId: string;
  entityId: string;
  presentation: Presentation;
  navigation: Navigation;
}

interface Presentation {
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

interface Navigation {
  entityId: string;
  entityType: string;
  localizedName: string;
  relevantFlightParams: RelevantFlightParams;
  relevantHotelParams: RelevantHotelParams;
}

interface AirportDetails {
  SkyId: string;
  EntityId: string;
  city: string;
  country: string;
  iata: string;
}

type Config = {
  status: boolean;
  message: string;
  timestamp: number;
  data: {
    country: string;
    countryCode: string;
    market: string;
    currencyTitle: string;
    currency: string;
    currencySymbol: string;
    site: string;
  }[];
};

type FlightsResponse = {
  status: boolean;
  timestamp: number;
  sessionId: string;
  data: {
    context: {
      status: string;
      sessionId: string;
      totalResults: number;
    };
    itineraries: Itinerary[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    messages: any[];
    filterStats: FilterStats;
    flightsSessionId: string;
    destinationImageUrl: string;
  };
};

type Itinerary = {
  id: string;
  price: Price;
  legs: FlightLeg[];
  isSelfTransfer: boolean;
  isProtectedSelfTransfer: boolean;
  farePolicy: FarePolicy;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fareAttributes: Record<string, any>;
  tags: string[];
  isMashUp: boolean;
  hasFlexibleOptions: boolean;
  score: number;
};

type FilterStats = {
  duration: {
    min: number;
    max: number;
    multiCityMin: number;
    multiCityMax: number;
  };
  airports: CityAirport[];
  carriers: Airline[];
  stopPrices: StopPrices;
};

type Price = {
  raw: number;
  formatted: string;
  pricingOptionId: string;
};

type FlightLeg = {
  id: string;
  origin: Airport;
  destination: Airport;
  durationInMinutes: number;
  stopCount: number;
  isSmallestStops: boolean;
  departure: string;
  arrival: string;
  timeDeltaInDays: number;
  carriers: Carriers;
  segments: FlightSegment[];
};

type Airport = {
  id: string;
  entityId: string;
  name: string;
  displayCode: string;
  city: string;
  country: string;
  isHighlighted: boolean;
};

type Carriers = {
  marketing: Airline[];
  operationType: string;
};

type Airline = {
  id: number;
  alternateId: string;
  logoUrl: string;
  name: string;
};

type FlightSegment = {
  id: string;
  origin: FlightPlace;
  destination: FlightPlace;
  departure: string;
  arrival: string;
  durationInMinutes: number;
  flightNumber: string;
  marketingCarrier: Carrier;
  operatingCarrier: Carrier;
};

type FlightPlace = {
  flightPlaceId: string;
  displayCode: string;
  parent: {
    flightPlaceId: string;
    displayCode: string;
    name: string;
    type: string;
  };
  name: string;
  type: string;
  country: string;
};

type Carrier = {
  id: number;
  name: string;
  alternateId: string;
  allianceId: number;
  displayCode: string;
};

type FarePolicy = {
  isChangeAllowed: boolean;
  isPartiallyChangeable: boolean;
  isCancellationAllowed: boolean;
  isPartiallyRefundable: boolean;
};

type CityAirport = {
  city: string;
  airports: AirportDetails[];
};

type AirportDetails = {
  id: string;
  entityId: string;
  name: string;
};

type StopPrices = {
  direct?: StopPrice;
  one?: StopPrice;
  twoOrMore?: Partial<StopPrice>;
};

type StopPrice = {
  isPresent: boolean;
  formattedPrice?: string;
};
