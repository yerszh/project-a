"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SelectProfession from "./SelectProfession";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SelectPage: React.FC = () => {
  return (
    <div className="p-4 w-full h-full flex flex-col items-center">
      <div className="w-full flex justify-between">
        <Link href="/result">
          <Image
            src="/icons/arrow-back.svg"
            alt={"arrow-back"}
            height={24}
            width={24}
          />
        </Link>

        <div className="flex gap-1 items-center">
          <h1 className="text-sm text-[#171A1D] font-bold">
            Smart Bolashaq AI chat
          </h1>
        </div>

        <Sheet>
          <SheetTrigger className="">
            <Image
              src="/icons/menu-icon.svg"
              alt={"menu-icon"}
              height={24}
              width={24}
            />
          </SheetTrigger>

          <SheetContent
            closeIcon={
              <Image
                src="/icons/menu-icon.svg"
                alt={"menu-icon"}
                height={24}
                width={24}
              />
            }
            side={"right"}
            className=""
          >
            <SheetHeader>
              <SheetTitle>
                <p className="text-sm text-[#171A1D] font-bold">
                  Smart Bolashaq AI chat
                </p>
              </SheetTitle>
            </SheetHeader>

            <div
              className="w-full h-10 flex gap-2 p-2.5 items-center bg-[#F5F5F5] rounded-lg mt-8"
              cmdk-input-wrapper=""
            >
              <Image
                src="/icons/search-icon.svg"
                alt={"search-icon"}
                height={20}
                width={20}
              />
              <Input
                placeholder="Поиск чата"
                className={
                  "flex w-full !border-transparent bg-transparent  text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                }
              />
            </div>

            <h3 className="text-[#A5AAB3] text-sm leading-4 mt-7">Чаты</h3>
          </SheetContent>
        </Sheet>
      </div>

      <div className="mt-56 mx-5">
        <h2 className="text-[#171A1D] text-sm font-normal leading-4 text-center">
          Привет, я <span className="font-semibold">AI Chat!</span> Я тут чтобы
          помочь тебе узнать информацию о различных профессиях, вузах, грандах,
          стипендиях, и многое другое. Для начала работы выбери профессию.
        </h2>
        <p className="mt-6 mx-14 text-[#757575] text-xs font-normal leading-3 text-center">
          Диалог в чате ведется на основе выбранной вами профессии
        </p>
      </div>
      <div>
        <Dialog>
          <DialogTrigger className="mt-2.5 text-[#171A1D] text-xs font-medium leading-3 text-center">
            Подробнее..
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex flex-row gap-1.5 text-[#171A1D] text-base	font-semibold leading-4">
                <Image
                  src="/icons/help-icon.svg"
                  alt={"help-icon"}
                  height={16}
                  width={16}
                />
                Помощь
              </DialogTitle>
              <DialogDescription className="text-[#171A1D] text-[13px] font-medium leading-5 !mt-4">
                Чат фокусируется на профессии, которую вы выбрали. Чтобы начать
                обсуждение другой профессии необходимо сначала сменить выбор.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        <Sheet>
          <SheetTrigger className=" mt-11 flex flex-row gap-1.5 text-[#171A1D] text-[13px] font-medium leading-4 text-center border rounded-3xl p-3">
            <Image
              src="/icons/message-search.svg"
              alt="message-search"
              height={16}
              width={16}
            />
            Выбрать профессию
          </SheetTrigger>

          <SheetContent side={"bottom"} className="max-h-[80vh]">
            <SheetHeader>
              <SheetTitle>Профессии</SheetTitle>
            </SheetHeader>
            <SheetDescription></SheetDescription>
            <SelectProfession />
          </SheetContent>
        </Sheet>
      </div>
      <div className="w-full h-full flex items-end">
        <div className="bg-[#F5F5F5] flex w-full items-center rounded-full p-1.5 h-[42px]">
          <Textarea className="ml-3" placeholder="Сообщение" />
          <Button type="submit" variant={"icon"} size={"icon"}>
            <Image
              src="/icons/send-message-button.svg"
              alt={"send"}
              height={30}
              width={30}
            />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SelectPage;
