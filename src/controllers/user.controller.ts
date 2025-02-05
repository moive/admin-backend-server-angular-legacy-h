import { Request, Response } from "express";
import { User } from "../models/user.model";

const getUsers = async (req: Request, res: Response) => {
	const users = await User.find({}, "name email role google");
	console.log(users);

	res.json({
		ok: true,
		users,
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
