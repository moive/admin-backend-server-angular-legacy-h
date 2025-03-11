import "dotenv/config";
import * as env from "env-var";

export const envs = {
	PORT: env.get("PORT").required().asPortNumber(),
	DB_CNN: env.get("DB_CNN").required().asString(),
	JWT_SECRET: env.get("JWT_SECRET").required().asString(),
	GOOGLE_ID: env.get("GOOGLE_ID").required().asString(),
	GOOGLE_SECRET: env.get("GOOGLE_SECRET").required().asString(),
};
