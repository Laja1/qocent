
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
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
import { getIn } from "formik";

export type ComboBoxOption = {
  label: string;
  value: string;
};

type ComboBoxFieldProps = {
  label?: string;
  name: string;
  options: ComboBoxOption[];
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  formik: any;
  className?: string;
  width?: string;
  disabled?: boolean;
  allowClear?: boolean;
};

export const ComboBoxField = ({
  label,
  name,
  options,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  emptyMessage = "No options found.",
  formik,
  className = "",
  width = "w-full",
  disabled = false,
  allowClear = false,
}: ComboBoxFieldProps) => {
  const [open, setOpen] = React.useState(false);

  const value = getIn(formik.values, name) || "";
  const error = getIn(formik.errors, name);
  const touched = getIn(formik.touched, name);

  const selectedOption = options.find((option) => option.value === value);

  const handleSelect = (currentValue: string) => {
    const newValue =
      currentValue === value ? (allowClear ? "" : currentValue) : currentValue;
    formik.setFieldValue(name, newValue);
    setOpen(false);
  };

  return (
    <div className={`${width} ${className} `}>
      {label && (
        <label className="block text-sm text-gray-600 mb-1">{label}</label>
      )}

      <Popover open={open} onOpenChange={setOpen} >
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between border-green-800 border dark:border-green-600 dark:text-black rounded-xs text-xs",
              !selectedOption && "text-muted-foreground",
              error && touched && "border-red-500 focus:border-red-500"
            )}
            disabled={disabled}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput className="text-xs" placeholder={searchPlaceholder} />
            <CommandList >
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup >
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    className="text-xs overflow-y-hidden overflow-auto"
                    onSelect={handleSelect}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === option.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      {touched && error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};
