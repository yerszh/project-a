"use server";

import { auth } from "@/lib/auth/authConfig";
import { prisma } from "@/lib/prisma";


export const getSchools = async () => {
  try {
    const session = await auth();
    const uuid = session?.user?.id;

    if (uuid) {
      const schools = await prisma.school.findMany({
        select: {
          id: true,
          name_ru: true,
          name_kz: true,
          url_name:  true,
        },
      });
      return schools;
    }
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
