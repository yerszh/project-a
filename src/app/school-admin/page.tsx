"use client";

import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SchoolAdminLogin } from "@/lib/school-admin/schoolAdminLogin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";

const SchoolAdminLoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale();
  const t = useTranslations("SchoolAdminPage");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const formData = new FormData(e.currentTarget);
    try {
      const lookerId = await SchoolAdminLogin(formData);
      if (lookerId) {
        router.push(`school-admin/${lookerId}`);
      }
    } catch (err: any) {
      setError(err.message || t("errorMessage"));
    }
  };

  return (
    <main className="bg-[#171A1D] flex items-center justify-center h-screen">
      <div className="max-w-[960px] w-full bg-white rounded-3xl flex shadow-lg overflow-hidden">
        <div className="w-1/2 p-8 flex flex-col justify-center relative">
          <div className="absolute top-4 right-4">
            <LocaleSwitcher />
          </div>
          <h2 className="text-xl font-semibold mb-6 text-center">
            {t("adminLogin")}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              name="login"
              className="h-14 px-4 bg-[#F1F4F8] text-sm outline-none placeholder:text-muted-foreground"
              placeholder={t("login")}
              required
            />
            <Input
              name="password"
              type="password"
              className="h-14 px-4 bg-[#F1F4F8] text-sm outline-none placeholder:text-muted-foreground"
              placeholder={t("password")}
              required
            />
            <Button className="w-full h-12 rounded-lg mt-4" type="submit">
              {t("submitButton")}
            </Button>
            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </form>
        </div>
        <div className="w-1/2 flex items-center justify-center bg-gray-100 p-0 m-0">
          <Image
            src="/images/admin-bg.webp"
            alt="Admin Background"
            height={400}
            width={400}
            className="object-cover w-full h-full"
          />
        </div>
      </div>
    </main>
  );
};

export default SchoolAdminLoginPage;
