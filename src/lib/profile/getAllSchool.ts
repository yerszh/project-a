"use server";

import { auth } from "@/lib/auth/authConfig";
import { prisma } from "@/lib/prisma";

export const getAllSchool = async () => {
  try {
    const session = await auth();
    const uuid = session?.user?.id;

    if (uuid) {
      const schools = await prisma.school.findMany();
      return schools;
    }
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
