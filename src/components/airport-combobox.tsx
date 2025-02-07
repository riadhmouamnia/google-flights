"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Combobox } from "./combobox";
import { getAirportDetails } from "@/actions/get-airport-details";

export default function AirportCombobox({
  defaultValue,
  onValueChange,
  searchPlaceholder = "Search city ...",
  selectItemMsg = "Select an airport",
}: {
  defaultValue?: string;
  onValueChange: (value: AirportDetails | null) => void;
  searchPlaceholder?: string;
  selectItemMsg?: string;
}) {
  const [value, setValue] = useState(defaultValue);
  const [label, setLabel] = useState("");
  const [search, setSearch] = useState("");
  const { data, isLoading } = useQuery({
    queryKey: ["airports", search],
    queryFn: () =>
      getAirportDetails(search).then((res) =>
        res.map((airport) => ({
          details: airport,
          value: airport.iata,
          label:
            airport.city + ", " + airport.country + " (" + airport.iata + ")",
        }))
      ),
  });

  return (
    <Combobox
      className="w-full"
      items={data || []}
      value={value}
      label={label}
      isLoading={isLoading}
      onSelect={(value, label, item) => {
        onValueChange(item || null);
        setValue(value || "");
        setLabel(label || "");
      }}
      onSearchChange={setSearch}
      searchPlaceholder={searchPlaceholder}
      noResultsMsg="No airports found"
      selectItemMsg={selectItemMsg}
    />
  );
}
