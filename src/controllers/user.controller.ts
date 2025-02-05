import { Request, Response } from "express";
import { User } from "../models/user.model";

const getUsers = (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "get Users",
	});
};

const createUser = async (req: Request, res: Response) => {
	const { email, password, name } = req.body;

	const user = new User(req.body);
	await user.save();

	res.json({
		ok: true,
		user,
	});
};

export { getUsers, createUser };
