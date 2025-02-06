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
