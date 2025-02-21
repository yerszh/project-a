"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { handleGoogleSignIn } from "@/lib/auth/googleSignInServerAction";
import { sendEmailOTP } from "@/lib/auth/sendEmailOTPServerAction";
import { handleOTPSignIn } from "@/lib/auth/oTPSignInServerAction";

export default function SignInVerifyPage() {
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState<"email" | "verify">("verify");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  

  const handleOTPRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      await sendEmailOTP(email);
      setStep("verify");
    });
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    startTransition(async () => {
      await handleOTPSignIn(email, code);  
    });
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; 
  
    const newOtp = [...otp];
  
    if (value.length === otp.length) {
      const otpArray = value.split("").slice(0, otp.length);
      setOtp(otpArray);
      document.getElementById(`otp-${otp.length - 1}`)?.focus();
    } else {
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`)?.focus();
      }
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pasteData = e.clipboardData.getData("text");
    if (/^\d{4}$/.test(pasteData)) {
      e.preventDefault();
      setOtp(pasteData.split(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleBackToEmail = () => {
    setStep("email");
    setOtp(["", "", "", ""]);
  };


  return (
    <div className="p-4 w-full flex flex-col items-center">
      {step === "email" ? (
        <>
          <div className="flex gap-1 items-center mt-24">
            <Image src="/icons/logo.svg" alt="logo" height={24} width={24} />
            <h1 className="text-sm text-[#171A1D] font-semibold">AI Профориентатор</h1>
          </div>
          <h2 className="text-2xl font-semibold mt-20">Авторизация</h2>
          <p className="text-sm text-[#A5AAB3]">Пожалуйста введите данные для входа.</p>
          <form className="w-full flex flex-col mt-12" onSubmit={handleOTPRequest}>
            <label className="text-xs text-[#6F7581]">Email адрес</label>
            <Input
              value={email}
              className="mt-1.5 h-14 px-4 w-full !border-transparent bg-[#F1F4F8] text-sm outline-none placeholder:text-muted-foreground"
              placeholder="Введите свой email"
              type="email"
              maxLength={320}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              required
            />
            <Button className="w-full h-12 rounded-lg mt-6" type="submit" disabled={isPending}>
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
            onClick={handleGoogleSignIn}
          >
            <Image src="/icons/google-icon.svg" alt="google-icon" height={24} width={24} />
            Продолжить с Google
          </Button>
        </>
      ) : (
        <>
          <div className="w-full flex justify-between mt-4">
            <Button onClick={handleBackToEmail} variant={"ghost"} size={"icon"}>
              <Image src="/icons/arrow-back.svg" alt={"arrowBack"} height={24} width={24} />
            </Button>
          </div>

          <div className="mt-40 w-full">
            <h2 className="text-xl font-bold">Подтвердите вашу электронную почту</h2>
            <p className="mt-6 text-sm">Мы отправили код на вашу электронную почту</p>
            <p className="text-sm font-semibold">{email}</p>
            <p className="text-sm">Введите его ниже для подтверждения</p>
          </div>

          <form className="w-full flex flex-col mt-8" onSubmit={handleVerify}>
            <div className="flex gap-2 justify-center">
              {otp.map((digit, index) => (
                <Input
                  key={index}
                  id={`otp-${index}`}
                  className="w-16 h-16 text-center text-2xl font-semibold border border-gray-300 bg-[#F1F4F8] focus:border-blue-500"
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste} 
                  disabled={isPending}
                  autoComplete="off"
                  required
              />
              ))}
            </div>

            <Button className="w-full h-12 rounded-lg mt-6" type="submit" disabled={isPending}>
              Подтвердить
            </Button>
          </form>
        </>
      )}
    </div>
  );
}