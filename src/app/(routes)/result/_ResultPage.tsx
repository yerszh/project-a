"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Progress } from "@/components/ui/progress";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";
import { createUserQuiz } from "@/lib/quiz/createUserQuiz";
import { Button } from "@/components/ui/button";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import { useLocale, useTranslations } from "next-intl";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface UserResult {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
  UserProfessions:
    | {
        name: string;
        name_kz: string;
        name_ru: string;
        percent: number;
        occupation_id: string;
      }[]
    | null;
}

interface ResultPageProps {
  userResult?: UserResult;
}

const ResultPage = ({ userResult }: ResultPageProps) => {
  const t = useTranslations("ResultPage");
  const locale = useLocale();

  const chartData = [
    { profs: t("realistic"), "": userResult?.R },
    { profs: t("investigative"), "": userResult?.I },
    { profs: t("artistic"), "": userResult?.A },
    { profs: t("social"), "": userResult?.S },
    { profs: t("enterprising"), "": userResult?.E },
    { profs: t("conventional"), "": userResult?.C },
  ];
  const router = useRouter();

  const handleRetakeQuiz = async () => {
    await createUserQuiz().then(() => {
      router.push("/quiz");
    });
  };
  return (
    <div className="p-4 w-full flex flex-col items-center">
      <div className="w-full flex justify-between mt-4">
        <Button
          onClick={handleRetakeQuiz}
          variant={"ghost"}
          size={"icon"}
          className="flex gap-2 items-center text-[#A5AAB3] text-xs	"
        >
          <Image
            src="/icons/refresh-button.svg"
            alt={"refresh-button.svg"}
            height={20}
            width={20}
          />
          {t("retakeQuiz")}
        </Button>

        <div className="flex flex-row gap-2">
          <LocaleSwitcher />
          <Link href="/profile">
            <Image
              className="rounded-lg"
              src="/icons/profile-icon.svg"
              alt={"profile"}
              height={24}
              width={24}
            />
          </Link>
        </div>
      </div>

      <div className="mt-9 w-full">
        <h1 className="text-base text-[#A5AAB3] font-medium text-center">
          {t("resultsTitle")}
        </h1>
        <p className="text-[32px] text-[#171A1D] font-semibold leading-8 text-center mt-6">
          {t("greatWork")}
        </p>
        <p className="text-sm text-[#171A1D] font-normal text-center mt-6">
          {t("baseText")}{" "}
          <span className="text-[#644CF8] font-semibold">{t("aiAdvisor")}</span>{" "}
          {t("selectedProfessions")}
        </p>
      </div>

      <div className="mt-8 w-full">
        <h2 className="text-base text-[#A5AAB3] font-normal text-center ">
          {t("directionsTitle")}
        </h2>

        <ChartContainer config={chartConfig} className="mx-auto w-full mt-7">
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="profs" />
            <Radar dataKey="" fill="#644CF8" fillOpacity={0.4} />
          </RadarChart>
        </ChartContainer>
      </div>

      <div className="mt-8 w-full">
        <h2 className="text-base text-[#171A1D] font-semibold">
          {t("professionsTitle")}
        </h2>
        <h3 className="text-xs	 text-[#A5AAB3] font-normal">
          {t("matchedProfessions")}
        </h3>

        <ScrollArea className="h-[170px] w-full mt-3">
          <div className="flex flex-col gap-1.5 ">
            {userResult?.UserProfessions?.map((profession) => (
              <div
                key={profession.name}
                className="border-[#E3E6EB] border border-solid rounded-lg shadow-sm p-4"
              >
                <div className="w-full flex justify-between mb-3">
                  <p>
                    {locale === "kz" ? profession.name_kz : profession.name_ru}
                  </p>{" "}
                  <p>{Math.floor(100 - profession.percent / 100)}%</p>
                </div>
                <Progress value={Math.floor(100 - profession.percent / 100)} />
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      <Link
        className="bg-[#212121] w-full flex flex-row items-center justify-center gap-2 py-5 text-white rounded-lg !mb-10 !mt-8 overflow-hidden"
        href={"/chat"}
      >
        <Image
          src="/icons/chat-button.svg"
          alt="chat-button"
          height={24}
          width={24}
        />
        <span className="truncate max-w-[70%] text-center">
          {t("discussWithAI")}
        </span>
        <Image
          src="/icons/arrow-forward.svg"
          alt="arrow-forward"
          height={24}
          width={24}
        />
      </Link>
    </div>
  );
};

export default ResultPage;
