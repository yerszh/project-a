"use server";

import { prisma } from "@/lib/prisma";

export const SchoolAdminLogin = async (formData: FormData) => {
  try {
    const login = formData.get("login") as string;
    const password = formData.get("password") as string;

    if (!login || !password) {
      throw new Error("Логин и пароль обязательны");
    }

    const admin = await prisma.schoolAdmin.findUnique({
      where: { login },
    });

    if (!admin || admin.password !== password) {
      throw new Error("Неверные учетные данные");
    }

    return admin.looker_id;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};