"use server";

import { signIn } from "@/lib/auth/authConfig";

export const handleOTPSignIn = async (email: string, code: string) => {
  try {
    await signIn("credentials", {
            redirectTo: "/quiz",
            email,
            code,
          });
  } catch (error) {
    throw error;
  }
};