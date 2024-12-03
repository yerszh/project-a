"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

const ChatPage: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return (
    <>
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
              <Button variant="outline">Edit Profile</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
              </DialogHeader>

              <SelectProfession />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline">Edit Profile</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader className="text-left">
                <DrawerTitle>Edit profile</DrawerTitle>
              </DrawerHeader>
              <SelectProfession />
            </DrawerContent>
          </Drawer>
        )}
      </div>
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Subscribe</Button>
      </div>
    </>
  );
};

export default ChatPage;
