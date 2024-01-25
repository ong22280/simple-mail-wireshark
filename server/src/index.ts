import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  host: "smtp.resend.com",
  port: 25,
  auth: {
    user: "resend",
    pass: "",
  },
});

app.post("/send-mail", (req, res) => {
  const { from, subject, text } = req.body;
  console.log(req.body);

  const mailOptions = {
    from,
    to: "hemloun.s@gmail.com",
    subject,
    text,
    html: "<h1>Hi there</h1><p>Thanks for testing my app!</p>",
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
