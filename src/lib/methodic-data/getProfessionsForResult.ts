"use server";

import { prisma } from "@/lib/prisma";

type Profession = {
  job_id: string;
  soc_name: string;
  group_name: string;
  name: string;
  name_ru: string;
  name_kz: string;
  featured: string;
  score: number;
};

export const getProfessions = async (
  r: number,
  i: number,
  a: number,
  s: number,
  e: number,
  c: number
) => {
  try {
    const professions: Profession[] = await prisma.$queryRaw`
      SELECT job_id, soc_name, group_name, name, name_ru, name_kz, featured,
      (r - ${r})^2 + (i - ${i})^2 + (a - ${a})^2 + (s - ${s})^2 + (e - ${e})^2 + (c - ${c})^2 AS score
      FROM methodic_jobs
      WHERE (r - ${r})^2 + (i - ${i})^2 + (a - ${a})^2 + (s - ${s})^2 + (e - ${e})^2 + (c - ${c})^2 < 10000
      ORDER BY featured DESC, score ASC
      LIMIT 10;
    `;

    return professions || null;
  } catch (error) {
    console.error("Error fetching professions:", error);
    throw error;
  }
};
