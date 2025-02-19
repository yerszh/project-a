import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { clearStaleTokens } from "./clearStaleTokensServerAction";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import { clearExpiredOTPs } from "./clearExpiredOTPsServerAction";

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  adapter: PrismaAdapter(prisma),
  secret: process.env.AUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/auth-success",
    error: "/auth/auth-error",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "OTP",
      credentials: {
        email: { label: "Email", type: "text" },
        code: { label: "OTP Code", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("No credentials provided");
        }
        const { email, code } = credentials as { email: string; code: string };

        if (!email || !code) {
          throw new Error("Email and OTP code are required");
        }

        const otpRecord = await prisma.oTP.findFirst({
          where: {
            email,
            code,
            used: false,
            expiresAt: { gt: new Date() },
          },
        });

        if (!otpRecord) {
          throw new Error("Invalid or expired OTP code");
        }

        await prisma.oTP.update({
          where: { id: otpRecord.id },
          data: { used: true },
        });

        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: { email, role: "USER" },
          });
        }
        return user;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        await clearExpiredOTPs();
        await clearStaleTokens();
        return {
          ...token,
          id: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
        },
      };
    },
  },
});
