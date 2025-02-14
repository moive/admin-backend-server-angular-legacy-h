import "dotenv/config";
import * as env from "env-var";

export const envs = {
	PORT: env.get("PORT").required().asPortNumber(),
	DB_CNN: env.get("DB_CNN").required().asString(),
	JWT_SECRET: env.get("JWT_SECRET").required().asString(),
};
