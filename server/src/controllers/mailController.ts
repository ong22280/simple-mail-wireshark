import { Request, Response } from "express";
import { sendMail } from "../services/mailService";
import Mail from "../models/mailModel";

const sendMailController = async (req: Request, res: Response) => {
  const { from, to, subject, message } = req.body;

  const mail: Mail = new Mail(from, to, subject, message);

  const mailOptions = {
    from: mail.from,
    to: mail.to,
    subject: mail.subject,
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Valentine's Day Greeting</title>
  <style>
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 8px;
      box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #e63946;
      text-align: center;
      font-size: 36px;
      margin-bottom: 20px;
    }
    p {
      color: #333;
      text-align: center;
      font-size: 20px;
      line-height: 1.6;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
    }
    .footer p {
      font-size: 14px;
      color: #666;
    }
    img {
      display: block;
      margin: 20px auto;
      max-width: 100%;
      height: auto;
      border-radius: 8px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Happy Valentine's Day!</h1>
    <p>${message}</p>
    <img src="https://images.unsplash.com/photo-1549763204-2af507b4a9f5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Valentine's Day Image">
    <div class="footer">
      <p>From ${from}</p>
    </div>
  </div>
</body>
</html>
    `,
  };

  try {
    const info = await sendMail(mailOptions);
    res.status(200).send("Email sent: " + info.response);
    console.log("Email sent: " + info.response);
  } catch (error: any) {
    console.error(error);
    res.status(500).send(error.toString());
  }
};

export { sendMailController };
