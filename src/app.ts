import express from "express";
import { envs } from "./config/envs";
const { PORT } = envs;

const app = express();

app.get("/", (req, res) => {
	res.json({ ok: true, msg: "Hello world!" });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
