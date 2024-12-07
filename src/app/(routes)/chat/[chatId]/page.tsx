"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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

        <Popover>
          <PopoverTrigger>
            <Image
              src="/icons/more-button.svg"
              alt={"more-button"}
              height={24}
              width={24}
            />
          </PopoverTrigger>
          <PopoverContent
            withOverlay
            side="left"
            sideOffset={-20}
            align={"start"}
            className="!w-fit !flex !flex-col !p-0 !rounded-xl"
          >
            <Button
              variant={"ghost"}
              size={"icon"}
              className="pt-4 pb-3 pr-6 pl-4"
            >
              <Image
                src="/icons/edit-button.svg"
                alt={"edit-button.svg"}
                height={24}
                width={24}
              />
              Действие 1
            </Button>
            <Button
              variant={"ghost"}
              size={"icon"}
              className="text-[#F44336] pt-3 pb-4 pr-6 pl-4"
            >
              <Image
                src="/icons/delete-button.svg"
                alt={"delete-button.svg"}
                height={24}
                width={24}
              />
              Удалить чат
            </Button>
          </PopoverContent>
        </Popover>
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
