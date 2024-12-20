"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { User } from "@prisma/client";
import { setUserInfo } from "@/lib/profile/setUserInfo";
import { handleSignOut } from "@/lib/auth/signOutServerAction";
import { useTranslations } from "next-intl";

interface UserProfileProps {
  type: "quiz" | "profile";
  userData?: User | null;
}

const UserProfile = ({ userData, type }: UserProfileProps) => {
  const [formData, setFormData] = useState({
    name: userData?.name,
    grade: userData?.grade,
    age: userData?.age,
    phoneNumber: userData?.phoneNumber,
  });
  const t = useTranslations("HomePage");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4 w-full flex flex-col">
      <h2>{t("title")}</h2>
      <div className="w-full flex justify-between">
        <div>
          <button style={{ cursor: "pointer" }} onClick={() => handleSignOut()}>
            Sign Out
          </button>
        </div>
        <Link href="/">
          <Image
            src="/icons/close-button.svg"
            alt={"close-button"}
            height={24}
            width={24}
          />
        </Link>
      </div>

      <h1 className="mt-20 text-xl text-[#171A1D] font-semibold text-center">
        Краткая информация о вас
      </h1>
      <h2 className="mt-3 text-[13px] leading-[13px] text-[#A5AAB3] font-normal text-center">
        Пожалуйста, заполните короткую анкету
      </h2>
      <form action={setUserInfo} className="mt-12">
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            ФИО
          </label>
          <Input
            className={
              "p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl"
            }
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Введите ФИО"
            maxLength={100}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            Класс
          </label>
          <Input
            className={
              "p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl"
            }
            type="text"
            name="grade"
            value={formData.grade || ""}
            onChange={handleChange}
            placeholder="Введите ваш класс"
            maxLength={2}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            Возраст
          </label>
          <Input
            className={
              "p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl"
            }
            type="text"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            placeholder="Введите ваш возраст"
            maxLength={2}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            Номер телефона
          </label>
          <Input
            className={
              "p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl"
            }
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            placeholder="Введите номер"
            maxLength={12}
          />
        </div>

        <Button className="my-8 w-full h-12 rounded-lg" type="submit">
          Продолжить
        </Button>
      </form>
    </div>
  );
};

export default UserProfile;
