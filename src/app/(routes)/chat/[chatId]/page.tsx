"use client";

import React from "react";

import Link from "next/link";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
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

        <Image
          src="/icons/more-button.svg"
          alt={"more-button"}
          height={24}
          width={24}
        />
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
