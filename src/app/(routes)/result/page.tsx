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

const chartData = [
  { profs: "Технические", points: 186 },
  { profs: "Юридические", points: 305 },
  { profs: "Военные", points: 153 },
  { profs: "Экономические", points: 237 },
  { profs: "Безопасность", points: 109 },
  { profs: "Творческие", points: 214 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const ResultPage: React.FC = () => {
  return (
    <div className="p-4 w-full flex flex-col items-center">
      <div className="w-full flex justify-between">
        <Link
          href="/quiz"
          className="flex gap-2 items-center text-[#A5AAB3] text-xs	"
        >
          <Image
            src="/icons/refresh-button.svg"
            alt={"refresh-button.svg"}
            height={20}
            width={20}
          />
          Пройти заново
        </Link>

        <Link href="/">
          <Image
            src="/icons/close-button.svg"
            alt={"close-button"}
            height={24}
            width={24}
          />
        </Link>
      </div>

      <div className="mt-9 w-full">
        <h1 className="text-base text-[#A5AAB3] font-medium text-center">
          Результаты
        </h1>
        <p className="text-[32px] text-[#171A1D] font-semibold leading-8 text-center mt-6">
          Отличная работа!
        </p>
        <p className="text-sm text-[#171A1D] font-normal text-center mt-6">
          На основе ваших ответов&nbsp;
          <span className="text-[#644CF8] font-semibold">
            AI профориентатор
          </span>
          &nbsp; подобрал профессии, которые лучше всего подходят вашим талантам
          и интересам.
        </p>
      </div>

      <div className="mt-9 w-full">
        <h2 className="text-base text-[#A5AAB3] font-normal text-center ">
          Направления
        </h2>

        <ChartContainer config={chartConfig} className="mx-auto w-full mt-7">
          <RadarChart data={chartData}>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarGrid gridType="circle" />
            <PolarAngleAxis dataKey="profs" />
            <Radar dataKey="points" fill="#644CF8" fillOpacity={0.5} />
          </RadarChart>
        </ChartContainer>
      </div>

      <div className="mt-10 w-full">
        <h2 className="text-base text-[#171A1D] font-semibold">Профессии</h2>
        <h3 className="text-xs	 text-[#A5AAB3] font-normal">
          Подобранные профессии
        </h3>

        <div className="flex flex-col gap-1.5 mt-4">
          <div className="border-[#E3E6EB] border border-solid rounded-lg shadow-sm p-4">
            <div className="w-full flex justify-between mb-3">
              <p>Программист</p> <p>91%</p>
            </div>
            <Progress value={91} />
          </div>

          <div className="border-[#E3E6EB] border border-solid rounded-lg shadow-sm p-4">
            <div className="w-full flex justify-between mb-3">
              <p>Учитель (технические)</p> <p>57%</p>
            </div>
            <Progress value={57} />
          </div>
        </div>
      </div>

      <Link
        className="bg-[#212121] w-full flex gap-2 py-5 text-white justify-center rounded-lg !my-10"
        href={"/select"}
      >
        <Image
          src="/icons/chat-button.svg"
          alt={"chat-button"}
          height={24}
          width={24}
        />
        Обсудить профессии с AI chat
        <Image
          src="/icons/arrow-forward.svg"
          alt={"arrow-forward"}
          height={24}
          width={24}
        />
      </Link>
    </div>
  );
};

export default ResultPage;