"use server";

import { prisma } from "@/lib/prisma";
import { Results } from "@prisma/client";
import { getProfessions } from "@/lib/methodic-data/getProfessionsForResult";

export const setUserProfessions = async (userResult: Results) => {
  try {
    const { R, I, A, S, E, C } = userResult;

    const professions = await getProfessions(R, I, A, S, E, C);
    
   
    const userProfessionsData = professions.map((profession) => ({
      result_id: userResult.result_id,
      name: profession.name,
      percent: profession.score,
      occupation_id: profession.job_id,
      name_ru: profession.name_ru,
      name_kz: profession.name_kz,
    }));

    await prisma.$transaction(
   
      userProfessionsData.map((data) =>
        prisma.userProfessions.create({
          data,
        })
      )
    );
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};