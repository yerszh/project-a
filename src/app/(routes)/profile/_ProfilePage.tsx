"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { User } from "@prisma/client";
import { setUserInfo } from "@/lib/profile/setUserInfo";
import { handleSignOut } from "@/lib/auth/signOutServerAction";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

interface ProfilePageProps {
  userData?: User | null;
  selectedSchool?: {
    id: string;
    name_ru: string;
    name_kz: string;
    url_name: string;
  } | null;
}

const ProfilePage = ({ userData, selectedSchool }: ProfilePageProps) => {
  const searchParams = useSearchParams();
  const pageType = searchParams.get("type") || "profile";
  const t = useTranslations("ProfilePage");
  const locale = useLocale();

  const [isPending, setIsPending] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: userData?.name || null,
    grade: userData?.grade || null,
    age: userData?.age || null,
    phoneNumber: userData?.phoneNumber || null,
    schoolId: userData?.schoolId
      ? userData?.schoolId
      : selectedSchool?.id || null,
  });

  const [isPhoneValid, setIsPhoneValid] = useState(true);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "phoneNumber") {
      const phoneRegex = /^(?:\+7|7|8)[0-9]{10,11}$/;
      setIsPhoneValid(phoneRegex.test(value));
    }
  };

  useEffect(() => {
    const isNameValid = formData.name && formData.name.trim() !== "";
    const isGradeValid = formData.grade && formData.grade.trim() !== "";
    const isAgeValid = formData.age && formData.age.trim() !== "";
    const isPhoneValidLocal = isPhoneValid && formData.phoneNumber;

    setIsFormValid(
      Boolean(isNameValid) &&
        Boolean(isGradeValid) &&
        Boolean(isAgeValid) &&
        Boolean(isPhoneValidLocal)
    );
  }, [formData, isPhoneValid]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isPending) return;

    setIsPending(true);
    try {
      await setUserInfo(formData, pageType);
      toast({
        title: t("updatedTitle"),
      });
    } catch (error) {
      toast({
        title: t("errorTitle"),
      });
    }
    setIsPending(false);
  };

  return (
    <div className="p-4 w-full flex flex-col">
      <div className="w-full flex justify-between">
        <button style={{ cursor: "pointer" }} onClick={handleSignOut}>
          {t("signOut")}
        </button>

        <div className="flex flex-row gap-2 mt-4">
          <LocaleSwitcher />
          <Link href={pageType === "quiz" ? "/" : "/result"}>
            <Image
              src="/icons/close-button.svg"
              alt={t("closeButtonAlt")}
              height={24}
              width={24}
            />
          </Link>
        </div>
      </div>

      <h1 className="mt-20 text-xl text-[#171A1D] font-semibold text-center">
        {t("shortInfoTitle")}
      </h1>
      <h2 className="mt-3 text-[13px] leading-[13px] text-[#A5AAB3] font-normal text-center">
        {t("shortInfoDescription")}
      </h2>
      <form onSubmit={handleSubmit} className="mt-12">
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            {t("fullName")}
          </label>
          <Input
            className="p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl"
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder={t("fullNamePlaceholder")}
            maxLength={100}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            {t("school")}
          </label>
          <Input
            className="p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl"
            value={
              locale === "kz"
                ? selectedSchool?.name_kz
                : selectedSchool?.name_ru || ""
            }
            readOnly
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            {t("grade")}
          </label>
          <Input
            className="p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl"
            type="text"
            name="grade"
            value={formData.grade || ""}
            onChange={handleChange}
            placeholder={t("gradePlaceholder")}
            maxLength={2}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            {t("age")}
          </label>
          <Input
            className="p-4 flex w-full border border-[#E3E6EB] h-12 text-sm rounded-2xl"
            type="text"
            name="age"
            value={formData.age || ""}
            onChange={handleChange}
            placeholder={t("agePlaceholder")}
            maxLength={2}
          />
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            {t("phoneNumber")}
          </label>
          <Input
            className={`p-4 flex w-full border h-12 text-sm rounded-2xl ${
              isPhoneValid ? "border-[#E3E6EB]" : "border-red-500"
            }`}
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber || ""}
            onChange={handleChange}
            placeholder={t("phoneNumberPlaceholder")}
            maxLength={12}
          />
        </div>

        <Button
          className="my-8 w-full h-12 rounded-lg"
          type="submit"
          disabled={!isFormValid || isPending}
        >
          {pageType === "profile" ? t("save") : t("continue")}
        </Button>
      </form>
    </div>
  );
};

export default ProfilePage;
