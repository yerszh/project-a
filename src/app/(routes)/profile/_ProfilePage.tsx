"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { School, User } from "@prisma/client";
import { setUserInfo } from "@/lib/profile/setUserInfo";
import { handleSignOut } from "@/lib/auth/signOutServerAction";
import { useLocale, useTranslations } from "next-intl";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import { useSearchParams } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProfilePageProps {
  userData?: User | null;
  schoolByUrl?: School | null;
  allSchools?: School[];
}

const ProfilePage = ({
  userData,
  schoolByUrl,
  allSchools,
}: ProfilePageProps) => {
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
    schoolId: userData?.schoolId ? userData?.schoolId : schoolByUrl?.id || null,
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

  const userSchoolInfo = allSchools?.find(
    (item) => item.id === userData?.schoolId
  );

  const schoolRegions = Array.from(
    new Map(allSchools?.map((item) => [item.region_ru, item])).values()
  );

  const [selectedRegion, setSelectedRegion] = useState<string>(
    userSchoolInfo?.region_ru || ""
  );

  const regionCities = Array.from(
    new Map(
      allSchools
        ?.filter((school) => school.region_ru === selectedRegion)
        .map((school) => [school.city_ru, school])
    ).values()
  );

  const [selectedCity, setSelectedCity] = useState<string>(
    userSchoolInfo?.city_ru || ""
  );

  const citySchools = allSchools?.filter(
    (school) => school.city_ru === selectedCity
  );

  const [selectedSchool, setSelectedSchool] = useState<string>(
    userSchoolInfo?.name_ru || ""
  );

  return (
    <div className="p-4 w-full flex flex-col">
      <div className="w-full flex justify-between mt-4">
        <Button
          onClick={handleSignOut}
          variant={"ghost"}
          size={"icon"}
          className="flex gap-2 items-center text-[#A5AAB3] text-xs	"
        >
          <Image
            src="/icons/logout-icon.svg"
            alt={"logout"}
            height={20}
            width={20}
          />
          {t("signOut")}
        </Button>

        <div className="flex flex-row gap-2">
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
            {t("region")}
          </label>

          <Select
            defaultValue={userSchoolInfo?.region_ru || ""}
            onValueChange={(value) => {
              setSelectedRegion(value);
              setSelectedCity("");
              setSelectedSchool("");
            }}
          >
            <SelectTrigger className="justify-start h-12 rounded-2xl p-4 border text-inherit">
              <SelectValue placeholder={t("regionChoose")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {schoolRegions.map((school, index) => (
                  <SelectItem
                    className="justify-start p-3"
                    key={school.id || index}
                    value={school.region_ru || ""}
                  >
                    {locale === "kz" ? school.region_kz : school.region_ru}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            {t("city")}
          </label>

          <Select
            value={selectedCity || ""}
            onValueChange={(value) => {
              setSelectedCity(value);
              setSelectedSchool("");
            }}
          >
            <SelectTrigger className="justify-start h-12 rounded-2xl p-4 border text-inherit">
              <SelectValue placeholder={t("cityChoose")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {regionCities.map((school, index) => (
                  <SelectItem
                    className="justify-start p-3"
                    key={index}
                    value={school.city_ru || ""}
                  >
                    {locale === "kz" ? school.city_kz : school.city_ru}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <label className="text-[#333944] text-[13px] leading-[13px]">
            {t("school")}
          </label>

          <Select
            value={selectedSchool || ""}
            onValueChange={(value) => {
              setSelectedSchool(value);
            }}
          >
            <SelectTrigger className="justify-start h-12 rounded-2xl p-4 border text-inherit">
              <SelectValue placeholder={t("schoolChoose")} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {citySchools?.map((school, index) => (
                  <SelectItem
                    className="justify-start p-3"
                    key={index}
                    value={school.name_ru}
                    onClick={() => {
                      setFormData((prev) => ({
                        ...prev,
                        schoolId: school.id || null,
                      }));
                    }}
                  >
                    {locale === "kz" ? school.name_kz : school.name_ru}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
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
            maxLength={3}
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
