import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Image
        src={`/images/main-image.jpg`}
        alt={"main-image"}
        width="480"
        height="480"
      />

      <div className="max-w-[236px]">
        <h1 className="text-[32px] text-[#171A1D] font-semibold leading-8 text-center">
          Найди своё призвание
        </h1>
        <p className="mt-6 text-[14px] text-[#171A1D] font-normal leading-4 text-center">
          Интерактивный помощник для определения талантов и выбора подходящей
          профессии
        </p>
      </div>

      <Button className="mt-8">
        <Image
          src="/icons/cursor-magic-selection-02.svg"
          alt={"cursor-magic-selection-02"}
          height={30}
          width={20}
        />
        Начать тест
      </Button>
    </>
  );
}
