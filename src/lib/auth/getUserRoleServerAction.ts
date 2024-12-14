"use server";

import { pool } from "@/lib/postgres";
import { auth } from "./authConfig";

export const getUserRole = async () => {
  const session = await auth();

  if (session) {
    const uuid = session.user!.id;

    const uuidRegExp: RegExp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
      throw new Error("Invalid UUID");
    }

    const { rows } = await pool.query(
      "SELECT name, email, grade, age FROM users WHERE id = $1",
      [uuid]
    );

    return rows[0];
  }
};
