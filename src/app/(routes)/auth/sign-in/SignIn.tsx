"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { handleEmailSignIn } from "@/lib/auth/emailSignInServerAction";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";
import { useState, useTransition } from "react";
import Image from "next/image";

export const SignIn: React.FC = () => {
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({ email: "" as string });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    try {
      startTransition(async () => {
        await handleEmailSignIn(formData.email);
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 w-full flex flex-col items-center">
      <div className="flex gap-1 items-center mt-24">
        <Image src="/icons/logo.svg" alt={"logo"} height={24} width={24} />
        <h1 className="text-sm text-[#171A1D] font-semibold ">
          AI Профориентатор
        </h1>
      </div>

      <h2 className="text-2xl font-semibold mt-20">Авторизация</h2>
      <p className="text-sm text-[#A5AAB3]">
        Пожалуйста введите данные для входа.
      </p>

      <form className="w-full flex flex-col  mt-12" onSubmit={handleSubmit}>
        <label className="text-xs text-[#6F7581]">Email адрес</label>
        <Input
          className={
            "mt-1.5 h-14 px-4 flex w-full !border-transparent bg-[#F1F4F8]  text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          }
          placeholder="Введите свой email"
          type="email"
          maxLength={320}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFormData({ email: event.target.value })
          }
          disabled={isPending}
          required
        />

        <Button
          className="w-full h-12 rounded-lg mt-6"
          type="submit"
          disabled={isPending}
        >
          Войти
        </Button>
      </form>

      <div className="flex items-center w-full mt-8">
        <div className="flex-grow border-t border-[#E3E6EB]"></div>
        <span className="px-4 text-sm text-[#A5AAB3]">или</span>
        <div className="flex-grow border-t border-[#E3E6EB]"></div>
      </div>

      <Button
        variant={"ghost"}
        className="w-full h-12 border border-[#E3E6EB] rounded-lg mt-4"
        onClick={() => {
          handleGoogleSignIn();
        }}
      >
        <Image
          src="/icons/google-icon.svg"
          alt={"google-icon"}
          height={24}
          width={24}
        />
        Продолжить с Google
      </Button>
    </div>
  );
};
