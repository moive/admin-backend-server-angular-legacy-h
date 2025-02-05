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

const createUser = async (req: Request, res: Response): Promise<void> => {
	const { email, password, name } = req.body;
	try {
		const existsUser = await User.findOne({ email });
		if (existsUser) {
			res.status(400).json({
				ok: false,
				msg: "The email is already registered",
			});
			return;
		}

		const user = new User(req.body);
		await user.save();

		res.json({
			ok: true,
			user,
		});
	} catch (error: any) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: error.message,
		});
	}
};

export { getUsers, createUser };
