import express from "express";
import chalk from "chalk";
import cors from "cors";
import { envs } from "./config/envs";
const { PORT } = envs;

import { dbConnection } from "./database/db";

import UserRouter from "./routes/users.routes";
import AuthRouter from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

dbConnection();

app.use("/api/users", UserRouter);
app.use("/api/login", AuthRouter);

const msgListening =
	`################################################ \n` +
	`🛡️  Server listening on port: ${PORT} 🛡️ \n` +
	`################################################`;

app.listen(PORT, () => console.log(chalk.bold.green(msgListening)));
