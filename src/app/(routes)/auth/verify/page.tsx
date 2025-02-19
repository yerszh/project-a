"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function VerifyPage() {
  const [isPending, startTransition] = useTransition();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      
      const result = await signIn("credentials", {
        redirect: false,
        email,
        code,
      });
      if (result?.ok) {
        router.push("/quiz");
      } else {
        alert("Неверный или истекший OTP код");
      }
    });
  };

  return (
    <div className="p-4 w-full flex flex-col items-center">
      <div className="flex gap-1 items-center mt-24">
        <Image src="/icons/logo.svg" alt="logo" height={24} width={24} />
        <h1 className="text-sm text-[#171A1D] font-semibold">AI Профориентатор</h1>
      </div>

      <h2 className="text-2xl font-semibold mt-20">Проверка OTP</h2>
      <p className="text-sm text-[#A5AAB3]">
        Введите ваш email и OTP код, который вы получили на почту.
      </p>

      <form className="w-full flex flex-col mt-12" onSubmit={handleSubmit}>
        <label className="text-xs text-[#6F7581]">Email адрес</label>
        <Input
          className="mt-1.5 h-14 px-4 w-full !border-transparent bg-[#F1F4F8] text-sm outline-none placeholder:text-muted-foreground"
          placeholder="Введите свой email"
          type="email"
          maxLength={320}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
          required
        />
        <label className="text-xs text-[#6F7581] mt-4">OTP код</label>
        <Input
          className="mt-1.5 h-14 px-4 w-full !border-transparent bg-[#F1F4F8] text-sm outline-none placeholder:text-muted-foreground"
          placeholder="Введите OTP код"
          type="text"
          maxLength={6}
          onChange={(e) => setCode(e.target.value)}
          disabled={isPending}
          required
        />
        <Button className="w-full h-12 rounded-lg mt-6" type="submit" disabled={isPending}>
          Войти
        </Button>
      </form>
    </div>
  );
}