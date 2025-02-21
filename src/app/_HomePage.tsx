"use client";

import { Button } from "@/components/ui/button";
import { createUserQuiz } from "@/lib/quiz/createUserQuiz";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";

interface HomePageProps {
  activeQuiz?: {
    user_quizzes_id: string;
    isActive: boolean;
    current_question: number;
  } | null;
}

const HomePage = ({ activeQuiz }: HomePageProps) => {
  const t = useTranslations("HomePage");
  const router = useRouter();
  const searchParams = useSearchParams();
  const school = searchParams.get("school");

  useEffect(() => {
    if (school) {
      Cookies.set("school", school, { expires: 7 });
    }
  }, [school]);

  const handleSubmit = async () => {
    if (activeQuiz?.isActive) {
      router.push("/quiz");
    } else {
      await createUserQuiz().then(() => {
        router.push("/quiz");
      });
    }
  };
  return (
    <>
      <div className="flex justify-end gap-1 w-full mb-3 mt-9 px-4 text-[#9E9E9E]">
        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1">
          <Image
            src="/icons/logo-main2.svg"
            alt={t("logoAlt")}
            height={24}
            width={156}
          />
        </div>
        <LocaleSwitcher />
      </div>
      <div className="flex flex-col items-center absolute bottom-20">
        <div className="max-w-[236px]">
          <h1 className="text-[32px] text-white font-semibold leading-8 text-center">
            {t("findYourCalling")}
          </h1>
          <p className="mt-6 text-[14px] text-white font-normal leading-4 text-center">
            {t("interactiveHelperDescription")}
          </p>
        </div>
        <Button
          className="mt-8 bg-[#3761EE] flex gap-1.5 py-6 px-5 rounded-2xl text-white"
          onClick={handleSubmit}
        >
          <Image
            src="/icons/cursor-magic.svg"
            alt={t("cursorMagicAlt")}
            height={20}
            width={20}
          />
          {activeQuiz?.isActive ? t("continue") : t("startTest")}
        </Button>
      </div>
    </>
  );
};

export default HomePage;
