"use client"

import * as React from "react"
import { Check, ChevronsUpDown, Divide } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const frameworks = [
  {
    value: "web",
    label: "Web Development",
  },
  {
    value: "app",
    label: "App Development",
  },
  {
    value: "web3",
    label: "Web 3",
  },
  {
    value: "arvr",
    label: "AR/VR",
  },
  {
    value: "ai",
    label: "AI",
  },
   {
    value: "ml",
    label: "Machine Learning",
  },
   {
    value: "cyber",
    label: "Cyber Security",
  },
   {
    value: "devops",
    label: "DEV-OPS",
  },
   {
    value: "quant",
    label: "Quant Analytic",
  },
   {
    value: "uiux",
    label: "UI/UX",
  },
   {
    value: "animator",
    label: "Animator",
  },
  
  

]

export function SkillOne() {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  return (
   <div className="m-5">
     <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-80 justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select First Skill"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {frameworks.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue)
                    setOpen(false)
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
   </div>
    
  )
}
