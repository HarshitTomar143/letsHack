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

const skills = [
  { value: "web", label: "Web Development" },
  { value: "app", label: "App Development" },
  { value: "web3", label: "Web 3" },
  { value: "arvr", label: "AR/VR" },
  { value: "ai", label: "AI" },
  { value: "ml", label: "Machine Learning" },
  { value: "cyber", label: "Cyber Security" },
  { value: "devops", label: "DEV-OPS" },
  { value: "quant", label: "Quant Analytic" },
  { value: "uiux", label: "UI/UX" },
  { value: "animator", label: "Animator" },
];

export function SkillOne({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);

  const selectedLabel =
    skills.find((skill) => skill.value === value)?.label ?? "Select First Skill";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-80 justify-between"
        >
          {selectedLabel}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0">
        <Command>
          <CommandInput placeholder="Search skill..." className="h-9" />
          <CommandList>
            <CommandEmpty>No skill found.</CommandEmpty>
            <CommandGroup>
              {skills.map((skill) => (
                <CommandItem
                  key={skill.value}
                  value={skill.value}
                  onSelect={(currentValue) => {
                    onChange(currentValue);
                    setOpen(false);
                  }}
                >
                  {skill.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === skill.value ? "opacity-100" : "opacity-0"
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
