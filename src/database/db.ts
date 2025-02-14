import mongoose from "mongoose";
import chalk from "chalk";
import { envs } from "../config/envs";

export const dbConnection = async () => {
	try {
		await mongoose.connect(envs.DB_CNN);
		console.log(chalk.blue.bgRed.bold("DB Online"));
	} catch (error) {
		console.log(error);
		throw new Error("Error connecting to database");
	}
};
