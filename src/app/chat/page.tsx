"use client";

import React from "react";
import { Button } from "@/components/ui/button";
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
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import SelectProfession from "./SelectProfession";
import { Textarea } from "@/components/ui/textarea";

const ChatPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
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
          <h1 className="text-sm text-[#171A1D] font-semibold">
            Smart Bolashaq AI chat
          </h1>
        </div>

        <Image
          src="/icons/menu-icon.svg"
          alt={"menu-icon"}
          height={24}
          width={24}
        />
      </div>

      <div className="max-w-[236px]">
        <h1 className="text-[12px] text-[#171A1D] font-semibold leading-8 text-center">
          Привет, я AI Chat! Я тут чтобы помочь тебе узнать информацию о
          различных профессиях, вузах, грандах, стипендиях, и многое другое. Для
          начала работы выбери профессию.
        </h1>
        <p className="mt-6 text-[14px] text-[#171A1D] font-normal leading-4 text-center">
          Диалог в чате ведется на основе выбранной вами профессии
        </p>
      </div>
      <div>
        <Dialog>
          <DialogTrigger>Подробнее..</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Помощь</DialogTitle>
              <DialogDescription>
                Чат фокусируется на профессии, которую вы выбрали. Чтобы начать
                обсуждение другой профессии необходимо сначала сменить выбор.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      <div>
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Выбрать профессию</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit </DialogTitle>
              </DialogHeader>

              <SelectProfession />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline">Edit</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit </DrawerTitle>
              </DrawerHeader>
              <SelectProfession />
            </DrawerContent>
          </Drawer>
        )}
      </div>
      <div className="bg-[#F5F5F5] flex w-full items-center rounded-full p-1.5">
        <Textarea placeholder="Сообщение" />
        <Button type="submit" variant={"icon"} size={"icon"}>
          <Image
            src="/icons/send-message-button.svg"
            alt={"send"}
            height={30}
            width={30}
          />
        </Button>
      </div>
    </>
  );
};

export default ChatPage;
