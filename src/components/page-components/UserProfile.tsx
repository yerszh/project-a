"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setUserInfo } from "@/lib/profile/setUserInfoServerAction";
import { UserInfo } from "@/types/UserInfo";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { handleSignOut } from "@/lib/auth/signOutServerAction";
interface UserProfileProps {
  userData?: UserInfo | null;
}

const UserProfile = ({ userData }: UserProfileProps) => {
  const [user, setUser] = useState<UserInfo | null>(userData || null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleChange = (key: keyof UserInfo, value: string | number) => {
    if (user) {
      setUser({ ...user, [key]: value });
    }
  };

  const handleSubmit = async () => {
    if (!user) return;

    setIsSubmitting(true);
    try {
      await setUserInfo(user);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-4 w-full flex flex-col ">
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
      <h2 className="mt-3 text-[13px] leading-[13px] text-[#A5AAB3] font-normal	 text-center">
        Пожалуйста, заполните короткую анкету
      </h2>
      <div className="mt-12">
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            ФИО
          </label>
          <Input
            className={
              "p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl	"
            }
            type="text"
            value={user?.name || ""}
            placeholder="Введите ФИО"
            maxLength={200}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            Класс
          </label>
          <Input
            className={
              "p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl	"
            }
            type="text"
            value={user?.grade || ""}
            placeholder="Введите ваш класс"
            maxLength={20}
            onChange={(e) => handleChange("grade", e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            Возраст
          </label>
          <Input
            className={
              "p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl	"
            }
            type="number"
            value={user?.age || ""}
            placeholder="Введите ваш восраст"
            maxLength={2}
            onChange={(e) => handleChange("age", Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            Номер телефона
          </label>
          <Input
            className={
              "p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl	"
            }
            type="text"
            value={user?.phone_number || ""}
            placeholder="Введите номер"
            maxLength={20}
            onChange={(e) => handleChange("phone_number", e.target.value)}
          />
        </div>

        <Button
          className="my-8 w-full h-12 rounded-lg"
          type="submit"
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          Продолжить
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
