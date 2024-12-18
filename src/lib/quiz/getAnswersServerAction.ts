"use server";

import { pool } from "@/lib/postgres";

export const getAnswers = async () => {
  try {
    const { rows } = await pool.query("SELECT * FROM answers");
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
