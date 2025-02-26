"use server";

import { prisma } from "@/lib/prisma";

export const getSchoolById = async (schoolId: string) => {
  try {
    if (schoolId) {
      const school = await prisma.school.findUnique({
        where: { id: schoolId },
      });
      return school;
    }
    return null;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
