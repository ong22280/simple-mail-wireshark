import express from "express";
import cors from "cors";
import mailRoutes from "./routes/mailRoutes";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());
app.use("/", mailRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
