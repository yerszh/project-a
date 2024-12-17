"use server";

import { pool } from "@/lib/postgres";

export const mockChatServerAction = async (): Promise<null> => {
  try {
    const { rows } = await pool.query("SELECT * FROM questions");
    console.log(rows);
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
