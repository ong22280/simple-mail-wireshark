import express, { Router } from "express";
import { sendMailController } from "../controllers/mailController";

const router: Router = express.Router();

router.post("/send-mail", sendMailController);

export default router;
