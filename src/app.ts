import express from "express";
import cors from "cors";
import { envs } from "./config/envs";
const { PORT } = envs;

import { dbConnection } from "./database/db";

import UserRouter from "./routes/users.routes";

const app = express();

app.use(cors());

dbConnection();

app.use("/api/users", UserRouter);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
