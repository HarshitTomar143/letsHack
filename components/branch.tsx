"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
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

const branches = [
  { value: "Information Technology", label: "IT" },
  { value: "Computer Science Engineering", label: "CSE" },
  { value: "CSE- Artificial Inteligence", label: "CSE-AI" },
  { value: "CSE- AI & Machine Learning", label: "CSE-AIML" },
  { value: "Computer Science Information Technology", label: "CSIT" },
  { value: "Computer Science", label: "CS" },
  { value: "Electronics & Communication Engineering", label: "ECE" },
  { value: "Mechanical Engineering", label: "ME" },
  { value: "Electric and Electronic Engineering", label: "EEE" },
];

interface BranchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ComboboxDemo({ value, onChange }: BranchProps) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel =
    branches.find((branch) => branch.value === value)?.label || "Select Branch";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-100 justify-between"
        >
          {selectedLabel}
          <ChevronsUpDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search branch..." className="h-9" />
          <CommandList>
            <CommandEmpty>No branch found.</CommandEmpty>
            <CommandGroup>
              {branches.map((branch) => (
                <CommandItem
                  key={branch.value}
                  value={branch.value}
                  onSelect={() => {
                    onChange(branch.value);
                    setOpen(false);
                  }}
                >
                  {branch.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === branch.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
