"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/layout/navbar";
import Link from "next/link";
import Image from "next/image";

const FormSchema = z.object({
  type: z.enum(["1", "2", "3", "4", "5"], {
    required_error: "You need to select a notification type.",
  }),
});

const mockOptions = [
  {
    value: "1",
    label: "Помогать другим и решать их проблемы",
  },
  {
    value: "2",
    label: "Помогать другим и решать их проблемы",
  },
  {
    value: "3",
    label: "Работать руками, создавать что-то полезное",
  },
  {
    value: "4",
    label: "Работать с цифрами и анализировать данныеasd",
  },
];

export default function RadioGroupForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  //TODO onSubmit
  function onSubmit(data: z.infer<typeof FormSchema>) {
    {
      console.log(data);
    }
  }

  return (
    <>
      <Navbar
        title={
          <div className="flex gap-1 items-center">
            <Image src="/icons/logo.svg" alt={"logo"} height={24} width={24} />
            <h1 className="text-sm text-[#171A1D] font-semibold">
              AI Профориентатор
            </h1>
          </div>
        }
        leftLinkButton={
          <Link href="/">
            <Image
              src="/icons/arrow-back.svg"
              alt={"arrow-back"}
              height={24}
              width={24}
            />
          </Link>
        }
        rightLinkButton={
          <Link href="/">
            <Image
              src="/icons/close-button.svg"
              alt={"close-button"}
              height={24}
              width={24}
            />
          </Link>
        }
      />

      <div className="bg-[#212121] text-white text-xs font-semibold p-2.5 rounded-lg mt-4">
        3 /32 вопросов
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 flex flex-col items-center"
        >
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xl font-semibold">
                  Что тебе нравится больше всего из перечисленного?
                </FormLabel>

                <FormControl className="my-20">
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col"
                  >
                    {mockOptions.map((option) => (
                      <FormItem
                        key={option.value}
                        className="bg-[#F1F4F8] flex gap-2.5 p-[17px_13px] rounded-lg items-center"
                      >
                        <FormControl>
                          <RadioGroupItem value={option.value} />
                        </FormControl>
                        <FormLabel className="text-sm font-medium">
                          {option.label}
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Дальше</Button>
        </form>
      </Form>
    </>
  );
}
