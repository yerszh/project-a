"use server";

import { pool } from "@/lib/postgres";

export const mockChatServerAction = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT job_id, SOC_name, name FROM jobs"
    );
    console.log(rows);
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
