"use server";

import { auth } from "@/lib/auth/authConfig";
import { prisma } from "@/lib/prisma";


export const getSchoolByUrl = async (urlName: string) => {
  try {
    const session = await auth();
    const uuid = session?.user?.id;

    if (uuid) {
      const school = await prisma.school.findUnique({
        where: { url_name: urlName },
      });
    
      return school;
    }
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
