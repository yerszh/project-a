"use client";

import React, { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useLocale, useTranslations } from "next-intl";

interface Profession {
  occupation_id: string;
  name: string;
  name_ru: string;
  name_kz: string;
  percent: number;
}

interface Job {
  job_id: string;
  name: string;
  name_kz: string;
  name_ru: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  name_ru: string;
  name_kz: string;
}

interface Subject {
  subjects: string;
}

interface ChatSelectionProps {
  userProfessions?: Profession[];
  onSelectProfession: (profession: Profession | Job) => void;
  allJobs: Job[];
  allCategories: Category[];
  allSubjects: Subject[];
}

const ChatSelection: React.FC<ChatSelectionProps> = ({
  userProfessions,
  onSelectProfession,
  allJobs,
  allCategories,
  allSubjects,
}) => {
 
  const t = useTranslations("ChatPage");
  const locale = useLocale();
  const [searchTerm, setSearchTerm] = useState("");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    ((typeof allCategories)[0] | (typeof allSubjects)[0])[]
  >([]);
  const [activeTab, setActiveTab] = useState<"directions" | "subjects">(
    "directions"
  );
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);

  useEffect(() => {
    const filtered = allJobs
      .filter((job) => {
        const jobName =
          locale === "kz"
            ? job.name_kz.toLowerCase()
            : job.name_ru.toLowerCase();
        const isMatchingSearchTerm = jobName.includes(searchTerm.toLowerCase());

        const isMatchingCategory =
          selectedFilters.length === 0 ||
          selectedFilters.some((filter) =>
            isCategory(filter) ? filter.id === job.category_id : false
          );

        return isMatchingSearchTerm && isMatchingCategory;
      })
      .sort((a, b) => {
        const nameA = locale === "kz" ? a.name_kz : a.name_ru;
        const nameB = locale === "kz" ? b.name_kz : b.name_ru;
        return nameA.localeCompare(nameB);
      });

    setFilteredJobs(filtered);
  }, [searchTerm, selectedFilters, locale, allJobs]);

  const handleCategoryClick = (profession: Profession | Job) => {
    onSelectProfession(profession);
    setIsSheetOpen(false);
  };

  const handleRemoveFilter = (
    filter: (typeof allCategories)[0] | (typeof allSubjects)[0]
  ) => {
    setSelectedFilters(selectedFilters.filter((item) => item !== filter));
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as "directions" | "subjects");
    setSelectedFilters([]);
  };

  const handleCheckboxChange = (
    item: (typeof allCategories)[0] | (typeof allSubjects)[0],
    checked: boolean
  ) => {
    if (checked) {
      setSelectedFilters([...selectedFilters, item]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== item));
    }
  };

  const resetFilters = () => {
    setSelectedFilters([]);
  };

  const isCategory = (item: any): item is (typeof allCategories)[0] =>
    "name" in item;
  const isSubject = (item: any): item is (typeof allSubjects)[0] =>
    "subjects" in item;

  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger className="mt-11 flex flex-row gap-1.5 text-[#171A1D] text-[13px] font-medium leading-4 text-center border rounded-3xl p-3">
        <Image
          src="/icons/message-search.svg"
          alt="message-search"
          height={16}
          width={16}
        />
        {t("selectProfession")}
      </SheetTrigger>

      <SheetContent side="bottom" className="max-h-[80vh]">
        <SheetHeader>
          <SheetTitle>{t("professions")}</SheetTitle>
        </SheetHeader>
        <SheetDescription></SheetDescription>

        <div className="flex flex-row gap-4 justify-between my-4">
          <div
            className="w-full flex gap-2 items-center border-b"
            cmdk-input-wrapper=""
          >
            <Image
              src="/icons/search-icon.svg"
              alt="search-icon"
              height={21}
              width={20}
            />
            <Input
              placeholder={t("searchProfession")}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex w-full !border-transparent bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>

          <Drawer>
            <DrawerTrigger>
              <Image
                className="max-w-fit"
                src="/icons/filter-button.svg"
                alt="filter-button"
                height={32}
                width={32}
              />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="grid grid-cols-3 items-center pb-4 pt-3">
                <DrawerDescription></DrawerDescription>
                <DrawerTitle className="text-center text-[#171A1D] text-base font-semibold">
                  {t("filter")}
                </DrawerTitle>
                <div
                  onClick={resetFilters}
                  className="text-right text-[#171A1D] text-xs cursor-pointer font-normal"
                >
                  {t("reset")}
                </div>
              </DrawerHeader>

              <Tabs value={activeTab} onValueChange={handleTabChange}>
                <TabsList>
                  <TabsTrigger value="directions">
                    {t("byDirections")}
                  </TabsTrigger>
                  <TabsTrigger value="subjects">{t("bySubjects")}</TabsTrigger>
                </TabsList>

                <TabsContent value="directions">
                  <ScrollArea className="h-[280px] w-full mt-6">
                    {allCategories.map((category) => (
                      <div key={category.id}>
                        <div className="flex flex-row justify-between py-4 items-center">
                          <Label className="font-normal">
                            {locale === "kz"
                              ? category.name_kz
                              : category.name_ru}
                          </Label>
                          <Checkbox
                            checked={selectedFilters.includes(category)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(category, checked as boolean)
                            }
                          />
                        </div>
                        <div className="border-t border-[#E3E6EB]"></div>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>

                <TabsContent value="subjects">
                  <ScrollArea className="h-[280px] w-full mt-6">
                    {allSubjects.map((subject, index) => (
                      <div key={index}>
                        <div className="flex flex-row justify-between py-4 items-center">
                          <Label className="font-normal">
                            {subject.subjects}
                          </Label>
                          <Checkbox
                            checked={selectedFilters.includes(subject)}
                            onCheckedChange={(checked) =>
                              handleCheckboxChange(subject, checked as boolean)
                            }
                          />
                        </div>
                        <div className="border-t border-[#E3E6EB]"></div>
                      </div>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>

              <DrawerClose asChild>
                <Button variant="secondary" className="!my-7">
                  {t("apply")}
                </Button>
              </DrawerClose>
            </DrawerContent>
          </Drawer>
        </div>

        {selectedFilters.length > 0 && (
          <ScrollArea className="whitespace-nowrap pb-4 pt-2">
            <div className="flex w-max space-x-2">
              {selectedFilters.map((filter, index) => (
                <div
                  key={index}
                  className="flex gap-1 items-center border border-[#E3E6EB] px-2 py-1.5 text-sm rounded-full"
                >
                  <Image
                    onClick={() => handleRemoveFilter(filter)}
                    className="max-w-fit"
                    src="/icons/cancel-square.svg"
                    alt="filter-button"
                    height={32}
                    width={32}
                  />
                  <p className="font-medium">
                    {isCategory(filter)
                      ? locale === "kz"
                        ? filter.name_kz
                        : filter.name_ru
                      : isSubject(filter)
                      ? filter.subjects
                      : ""}
                  </p>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}

        <div className="mt-4">
          <h3 className="text-[#6F7581] text-sm font-normal">
            {t("recommendedProfessions")}
          </h3>
          <ScrollArea className="h-[180px] w-full mt-4">
            <div className="flex flex-wrap gap-1.5">
              {userProfessions?.map((profession, index) => (
                <Badge
                  key={index}
                  onClick={() => handleCategoryClick(profession as Profession)}
                >
                  {locale === "kz" ? profession.name_kz : profession.name_ru}
                </Badge>
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="mt-8">
          <h3 className="text-[#171A1D] text-base font-semibold leading-4">
            {t("allProfessions")}
          </h3>
          <ScrollArea className="h-[280px] w-full mt-6">
            <div className="flex flex-wrap gap-1.5">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job) => (
                  <Badge
                    key={job.job_id}
                    onClick={() => handleCategoryClick(job as Job)}
                    variant="secondary"
                  >
                    {locale === "kz" ? job.name_kz : job.name_ru}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-gray-500">
                  {t("professionNotFound")}
                </p>
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ChatSelection;
