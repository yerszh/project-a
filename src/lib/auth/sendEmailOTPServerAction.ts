"use server";

import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer";

export const sendEmailOTP = async (email: string) => {
  const code = Math.floor(1000 + Math.random() * 9000).toString();

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
    subject: "Ваш код для входа",
    text: `Ваш код: ${code}. Он будет действителен в течение 10 минут.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; text-align: center;">
        <h2 style="color: #333;">Одноразовый пароль</h2>
        <p style="font-size: 18px; color: #555;">Используйте этот код для входа:</p>
        <div style="font-size: 22px; font-weight: bold; color: #2c3e50; background: #F1F4F8; padding: 10px; border-radius: 5px; display: inline-block; margin: 10px 0;">
          ${code}
        </div>
        <p style="font-size: 14px; color: #777;">Если вы не запрашивали вход, проигнорируйте это письмо.</p>
        <p style="font-size: 12px; color: #999;">Этот код действителен в течение <strong>10 минут</strong>.</p>
      </div>
    `,
  };

  await transporter.sendMail(message);
};
