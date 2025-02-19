"use server";

import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export const handleEmailSignIn = async (email: string) => {
  const code = Math.floor(100000 + Math.random() * 900000).toString();

  await prisma.oTP.create({
    data: {
      email,
      code,
    },
  });

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: "Ваш OTP код для входа",
    text: `Ваш OTP код: ${code}. Он будет действителен в течение 10 минут.`,
    html: `<p>Ваш OTP код: <strong>${code}</strong></p><p>Он будет действителен в течение 10 минут.</p>`,
  };

  await transporter.sendMail(message);
};