"use client";

import { useTransition } from "react";
import { Locale } from "@/i18n/config";
import { setUserLocale } from "@/services/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  defaultValue: string;
  items: Array<{ value: string; label: string }>;
  label: string;
};

export default function LocaleSwitcherSelect({
  defaultValue,
  items,
  label,
}: Props) {
  const [isPending, startTransition] = useTransition();

  function onChange(value: string) {
    const locale = value as Locale;
    startTransition(() => {
      setUserLocale(locale);
    });
  }

  return (
    <div className="relative ">
      <Select onValueChange={onChange}>
        <SelectTrigger
          hideChevron
          aria-label={label}
          className={"bg-[#F1F4F8] text-[#6F7581] h-6 px-0 w-8 justify-center"}
        >
          <SelectValue placeholder={defaultValue} />
        </SelectTrigger>
        <SelectContent className="min-w-8">
          {items.map((item) => (
            <SelectItem
              className="py-1.5 pl-1 pr-1"
              hideCheck
              key={item.value}
              value={item.value}
            >
              <span>{item.label}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
