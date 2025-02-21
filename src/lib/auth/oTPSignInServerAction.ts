"use server";

import { signIn } from "@/lib/auth/authConfig";
import { AuthError } from "next-auth";

export const handleOTPSignIn = async (email: string, code: string) => {
  try {
    if (!email || !code) {
      throw new Error("Missing email or code");
    }

    await signIn("credentials", {
      redirectTo: "/quiz",
      email,
      code,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      throw error.type;
    }
    throw error;
  }
};
