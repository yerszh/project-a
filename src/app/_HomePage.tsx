"use client";

import { Button } from "@/components/ui/button";
import { createUserQuiz } from "@/lib/quiz/createUserQuiz";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

  const handleSubmit = async () => {
    await createUserQuiz().then(() => {
      router.push("/quiz");
    });
  };
  return (
    <>
      <div className="flex gap-1 items-center mt-9 text-[#9E9E9E]">
        <Image
          src="/icons/logo-main.svg"
          alt={t("logoAlt")}
          height={24}
          width={156}
        />
      </div>

      <Image
        src="/images/main-image.jpg"
        alt={t("mainImageAlt")}
        width="480"
        height="480"
      />

      <div className="max-w-[236px]">
        <h1 className="text-[32px] text-[#171A1D] font-semibold leading-8 text-center">
          {t("findYourCalling")}
        </h1>
        <p className="mt-6 text-[14px] text-[#171A1D] font-normal leading-4 text-center">
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
        {activeQuiz?.isActive ? "continue" : t("startTest")}
      </Button>
    </>
  );
};

export default HomePage;
