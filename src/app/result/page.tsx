"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

const ResultPage: React.FC = () => {
  return (
    <>
      <div className="w-full flex justify-between">
        <Link href="/" className="flex gap-2">
          <Image
            src="/icons/refresh-button.svg"
            alt={"refresh-button.svg"}
            height={24}
            width={24}
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
    </>
  );
};

export default ResultPage;
