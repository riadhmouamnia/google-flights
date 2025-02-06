"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { useDebouncedCallback } from "use-debounce";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ALIGN_OPTIONS } from "@radix-ui/react-popper";

export type ComboBoxItemType = {
  details?: AirportDetails;
  value: string;
  label: string;
};

type ComboboxProps = {
  value?: string;
  label?: string;
  onSelect: (value: string, label?: string, item?: AirportDetails) => void;
  items: ComboBoxItemType[];
  searchPlaceholder?: string;
  noResultsMsg?: string;
  selectItemMsg?: string | React.ReactNode;
  className?: string;
  unselect?: boolean;
  unselectMsg?: string;
  onSearchChange?: (e: string) => void;
  isLoading?: boolean;
  disabled?: boolean;
  selected?: string[];
  popoverSameWidthAsTrigger?: boolean;
  align?: (typeof ALIGN_OPTIONS)[number];
  popoverContentClassName?: string;
  total?: number;
};

const popOverStyles = {
  width: "var(--radix-popover-trigger-width)",
};

export function Combobox({
  value,
  label,
  onSelect,
  items,
  searchPlaceholder = "Search item...",
  noResultsMsg = "No items found",
  selectItemMsg = "Select an item",
  className,
  onSearchChange,
  isLoading,
  disabled = false,
  selected = [],
  popoverSameWidthAsTrigger = true,
  align,
  popoverContentClassName,
  total,
}: ComboboxProps) {
  const [open, setOpenState] = React.useState(false);

  const more = total ? total - items.length : 0;

  const handleOnSearchChange = useDebouncedCallback((e: string) => {
    onSearchChange?.(e);
  }, 300);

  function setOpen(isOpen: boolean) {
    if (!isOpen) handleOnSearchChange("");
    setOpenState(isOpen);
  }

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("justify-between", className)}
          disabled={disabled}
        >
          <span className="truncate flex items-center">
            {label || selectItemMsg}
          </span>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        style={popoverSameWidthAsTrigger ? popOverStyles : {}}
        className={cn("p-0", popoverContentClassName)}
        align={align}
      >
        <Command shouldFilter={false}>
          <CommandInput
            placeholder={searchPlaceholder}
            onValueChange={handleOnSearchChange}
          />
          <CommandList>
            {isLoading && <CommandEmpty>Loading...</CommandEmpty>}
            {!isLoading && items.length === 0 && (
              <CommandEmpty>{noResultsMsg}</CommandEmpty>
            )}
            <CommandGroup>
              {items.map((item) => {
                const isSelected =
                  value === item.value || selected.includes(item.value);
                return (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    keywords={[item.label]}
                    onSelect={(value) => {
                      onSelect(value, item.label, item.details);
                      setOpen(false);
                    }}
                    disabled={isSelected}
                  >
                    {item.label}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        isSelected ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
          {!!more && (
            <div className="px-3 py-2.5 text-sm opacity-50">
              {more} additional options are hidden.
            </div>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
