import express from "express";
import chalk from "chalk";
import cors from "cors";
import { envs } from "./config/envs";
const { PORT } = envs;

import { dbConnection } from "./database/db";

import UserRouter from "./routes/users.routes";
import AuthRouter from "./routes/auth.routes";
import HospitalRouter from "./routes/hospital.routes";
import DoctorRouter from "./routes/doctor.routes";
import FullSearchRouter from "./routes/full-search.routes";
import UploadRouter from "./routes/upload.routes";

const app = express();

app.use(
  cors(),
  // 	{
  //   origin: ["http://localhost:4200", "http://localhost:3000"],
  //   credentials: true,
  //   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  //   allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  //   exposedHeaders: ["Content-Range", "X-Content-Range"],
  // }
);

app.use(express.static("public"));
app.use(express.json());

dbConnection();

app.use("/api/users", UserRouter);
app.use("/api/login", AuthRouter);
app.use("/api/hospitals", HospitalRouter);
app.use("/api/doctors", DoctorRouter);
app.use("/api/full-search", FullSearchRouter);
app.use("/api/upload", UploadRouter);

const msgListening =
  `################################################ \n` +
  `🛡️  Server listening on port: ${PORT} 🛡️ \n` +
  `################################################`;

app.listen(PORT, () => console.log(chalk.bold.green(msgListening)));
