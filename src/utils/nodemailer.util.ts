import { createTransport } from 'nodemailer';

export const sendEmail = async (
  email: string,
  subject: string,
  message: string,
) => {
  try {
    const transporter = createTransport({
      service: 'gmail',
      // host: process.env.MAIL_HOST,
      // port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to: email,
      subject: subject,
      text: message,
    });
  } catch (error) {
    throw error;
  }
};
