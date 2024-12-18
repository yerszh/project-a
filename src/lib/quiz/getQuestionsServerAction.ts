"use server";

import { pool } from "@/lib/postgres";

export const getQuestions = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM questions");

    if (rows) {
      return rows;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
