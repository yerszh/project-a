"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SchoolAdminLogin } from "@/lib/school-admin/schoolAdminLogin";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SchoolAdminLoginPage = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

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
      setError(err.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-[360px] mt-20 p-4 h-full w-full mx-auto flex flex-col items-center">
      <form onSubmit={handleSubmit} className="w-full flex flex-col">
        <Input
          name="login"
          className="mt-1.5 h-14 px-4 flex w-full !border-transparent bg-[#F1F4F8] text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="login"
          required
        />

        <Input
          name="password"
          type="password"
          className="mt-1.5 h-14 px-4 flex w-full !border-transparent bg-[#F1F4F8] text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          placeholder="password"
          required
        />

        <Button className="w-full h-12 rounded-lg mt-6" type="submit">
          Войти
        </Button>

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default SchoolAdminLoginPage;
