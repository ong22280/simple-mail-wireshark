import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
require('dotenv').config();

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // host of email provider
  secure: false, // use SSL
  ignoreTLS: false, // do not fail on invalid certs
  auth: {
    // replace `user` and `pass` values from <https://forwardemail.net>
    user: "ong22280@gmail.com",
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

app.post("/send-mail", (req, res) => {
  const { from, to, subject, message } = req.body;
  console.log(req.body);

  const mailOptions = {
    from, // sender address
    to, // list of receivers
    subject, // Subject line
    html: `<h1>Hi there</h1><p>${message}</p><img src="https://images.unsplash.com/photo-1683009427540-c5bd6a32abf6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Email sent: " + info.response);
    console.log("Email sent: " + info.response);
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
