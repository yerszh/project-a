import React from "react";
import CategoryButtons from "./CategoryButtons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface SelectProfessionProps {
  className?: string;
}

const items = [
  {
    id: "Технические",
    label: "Технические",
  },
  {
    id: "Педагогические",
    label: "Педагогические",
  },
  {
    id: "Юридические",
    label: "Юридические",
  },
  {
    id: "Медицинские",
    label: "Медицинские",
  },
  {
    id: "Экономические",
    label: "Экономические",
  },
  {
    id: "Творческие",
    label: "Творческие",
  },
] as const;

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
  ];

  const FormSchema = z.object({
    items: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: [],
    },
  });
  const handleCategoryClick = (category: string) => {
    //TODO handleCategoryClick
    console.log(`You clicked on: ${category}`);
  };

  const selectedFilters = form.watch("items");

  const handleRemoveFilter = (filter: string) => {
    const updatedFilters = selectedFilters.filter((item) => item !== filter);
    form.setValue("items", updatedFilters);
  };

  function onSubmit(data: z.infer<typeof FormSchema>) {
    //TODO onSubmit
    console.log(data);
  }

  return (
    <div className={className}>
      <div className="flex flex-row gap-4 justify-between my-4">
        <div
          className="w-full flex gap-2 items-center border-b"
          cmdk-input-wrapper=""
        >
          <Image
            src="/icons/search-icon.svg"
            alt={"search-icon"}
            height={21}
            width={20}
          />
          <Input
            placeholder="Поиск профессии"
            className={
              "flex w-full !border-transparent bg-transparent  text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
            }
          />
        </div>

        <Drawer>
          <DrawerTrigger>
            <Image
              className="max-w-fit"
              src="/icons/filter-button.svg"
              alt={"filter-button"}
              height={32}
              width={32}
            />
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader className="grid grid-cols-3 items-center pb-4 pt-3">
              <div></div>
              <DrawerTitle className="text-center text-[#171A1D] text-base font-semibold">
                Фильтр
              </DrawerTitle>
              <div
                onClick={() => form.reset()}
                className="text-right text-[#171A1D] text-xs cursor-pointer font-normal"
              >
                Сбросить
              </div>
            </DrawerHeader>

            <Tabs defaultValue="directions" className="">
              <TabsList>
                <TabsTrigger value="directions">По направлениям</TabsTrigger>
                <TabsTrigger value="subjects">По предметам</TabsTrigger>
              </TabsList>

              <TabsContent value="directions">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                    <FormField
                      control={form.control}
                      name="items"
                      render={() => (
                        <FormItem>
                          {items.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="items"
                              render={({ field }) => {
                                return (
                                  <>
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row  justify-between py-4 items-center"
                                    >
                                      <FormLabel className="font-normal">
                                        {item.label}
                                      </FormLabel>
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(
                                            item.id
                                          )}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([
                                                  ...field.value,
                                                  item.id,
                                                ])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                );
                                          }}
                                        />
                                      </FormControl>
                                    </FormItem>
                                    <div className="border-t border-[#E3E6EB]"></div>
                                  </>
                                );
                              }}
                            />
                          ))}
                        </FormItem>
                      )}
                    />

                    <DrawerClose asChild>
                      <Button
                        variant={"secondary"}
                        className="!my-7"
                        type="submit"
                      >
                        Применить
                      </Button>
                    </DrawerClose>
                  </form>
                </Form>
              </TabsContent>
              <TabsContent value="subjects">
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Профильный предмет 1</AccordionTrigger>
                    <AccordionContent>
                      <RadioGroup defaultValue="comfortable">
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="r1">Биология</Label>
                          <RadioGroupItem value="default" id="r1" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="r2">Всемирная история</Label>
                          <RadioGroupItem value="comfortable" id="r2" />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="r3">География</Label>
                          <RadioGroupItem value="compact" id="r3" />
                        </div>
                      </RadioGroup>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Профильный предмет 2</AccordionTrigger>
                    <AccordionContent>
                      Yes. It adheres to the WAI-ARIA design pattern.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
            </Tabs>
          </DrawerContent>
        </Drawer>
      </div>

      <div>
        <div className="flex flex-wrap gap-2">
          {selectedFilters.length > 0 &&
            selectedFilters.map((filter) => (
              <div
                key={filter}
                className="flex gap-1 items-center border border-[border-[#E3E6EB]] px-2 py-1.5 text-sm rounded-full"
              >
                <Image
                  onClick={() => handleRemoveFilter(filter)}
                  className="max-w-fit"
                  src="/icons/cancel-square.svg"
                  alt={"filter-button"}
                  height={32}
                  width={32}
                />
                <p className="font-medium">{filter}</p>
              </div>
            ))}
        </div>
      </div>

      <div>
        <h3 className="text-[#171A1D] text-base font-semibold leading-4	my-6">
          Выберите профессию
        </h3>
        <div className="flex flex-wrap gap-2 overflow-y-auto">
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
