import nodemailer from "nodemailer";
import { SentMessageInfo } from "nodemailer/lib/sendmail-transport";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false,
  ignoreTLS: false,
  auth: {
    user: "ong22280@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD as string,
  },
});

const sendMail = (
  mailOptions: nodemailer.SendMailOptions
): Promise<SentMessageInfo> => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

export { sendMail };
