import express from "express";
import cors from "cors";
import { envs } from "./config/envs";
import { dbConnection } from "./database/db";
const { PORT } = envs;

const app = express();

app.use(cors());

dbConnection();

app.get("/", (req, res) => {
	res.json({ ok: true, msg: "Hello world!" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
