import React from "react";
import CategoryButtons from "./CategoryButtons";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface SelectProfessionProps {
  className?: string;
}

const SelectProfession: React.FC<SelectProfessionProps> = ({ className }) => {
  const categories = [
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
    "Медицинский работник",
    "Программис",
    "Учитель",
    "Юрист",
    "Экономист",
    "Юрист",
    "Экономист",
    "Медицинский работник",
  ];

  const handleCategoryClick = (category: string) => {
    //TODO handleCategoryClick
    alert(`You clicked on: ${category}`);
  };

  return (
    <div className={className}>
      <Drawer>
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Фильтр</DrawerTitle>
          </DrawerHeader>

          <Tabs defaultValue="account" className="">
            <TabsList>
              <TabsTrigger value="account">По направлениям</TabsTrigger>
              <TabsTrigger value="password">По предметам</TabsTrigger>
            </TabsList>

            <TabsContent value="account">По направлениям</TabsContent>
            <TabsContent value="password">По предметам</TabsContent>
          </Tabs>
        </DrawerContent>
      </Drawer>
      <div>
        <h3>Выберите профессию</h3>
        <div className="max-h-[300px] overflow-y-auto">
          <CategoryButtons
            categories={categories}
            onClick={handleCategoryClick}
          />
        </div>
      </div>
    </div>
  );
};

export default SelectProfession;
