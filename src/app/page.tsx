import { mockChatServerAction } from "@/lib/chat/mockChatServerAction";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  mockChatServerAction();
  return (
    <>
      <div className="flex gap-1 items-center mt-9 text-[#9E9E9E]">
        <Image
          src="/icons/logo-main.svg"
          alt={"logo-main"}
          height={24}
          width={156}
        />
      </div>

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

      <Link
        href="/quiz"
        className="mt-8 bg-[#3761EE] flex gap-1.5 py-3 px-5 rounded-2xl	text-white"
      >
        <Image
          src="/icons/cursor-magic.svg"
          alt={"cursor-magic"}
          height={20}
          width={20}
        />
        Начать тест
      </Link>
    </>
  );
}
