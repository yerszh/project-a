"use server";

import { prisma } from "@/lib/prisma";

export const getJobs = async () => {
  try {
    const allJobs = await prisma.methodic_jobs.findMany({
      select: {
        job_id: true,
        name: true,
        name_kz: true,
        name_ru: true,
        specs: true,
      },
    });
    return allJobs || null;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
