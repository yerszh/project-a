"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/authConfig";
import { redirect } from "next/navigation";

export const setUserInfo = async (formData: FormData) => {
  try {
    const session = await auth();
    const uuid = session?.user?.id;

    if (uuid) {
      const name = formData.get("name")?.toString() || null;
      const grade = formData.get("grade")?.toString() || null;
      const age = formData.get("age")?.toString() || null;
      const phoneNumber = formData.get("phoneNumber")?.toString() || null;

      if (name && grade && age && phoneNumber) {
        await prisma.user.update({
          where: { id: uuid },
          data: {
            name,
            grade,
            age,
            phoneNumber,
          },
        });

        return redirect("/quiz");
      }
    }
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
