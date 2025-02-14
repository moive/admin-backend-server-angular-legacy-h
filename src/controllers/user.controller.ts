import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/jwt";

const getUsers = async (req: Request, res: Response) => {
	const users = await User.find({}, "name email role google");
	res.json({
		ok: true,
		users,
	});
};

const createUser = async (req: Request, res: Response): Promise<void> => {
	const { email, password } = req.body;

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

		const salt = bcrypt.genSaltSync(12);
		user.password = bcrypt.hashSync(password, salt);

		await user.save();
		const token = await generarJWT(user.id);
		res.json({
			ok: true,
			user,
			token,
		});
	} catch (error: any) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: error.message,
		});
	}
};

const updateUser = async (req: Request, res: Response) => {
	const uid = req.params.id;
	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			res.status(404).json({
				ok: false,
				msg: "User not found with that id.",
			});
			return;
		}

		const { password, google, email, ...fields } = req.body;

		if (userDB.email !== email) {
			const existUser = await User.findOne({ email });
			if (existUser) {
				res.status(400).json({
					ok: false,
					msg: "There is already a user with that email",
				});
				return;
			}
		}

		fields.email = email;

		const userUpdated = await User.findByIdAndUpdate(uid, fields, {
			new: true,
		});

		res.json({
			ok: true,
			user: userUpdated,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: true,
			msg: "Unexpected error 😥",
		});
	}
};

const deleteUser = async (req: Request, res: Response) => {
	const uid = req.params.id;
	try {
		const userDB = await User.findById(uid);

		if (!userDB) {
			res.status(404).json({
				ok: false,
				msg: "User not found with that id.",
			});
			return;
		}

		const userDeleted = await User.findByIdAndDelete(uid);

		res.json({
			ok: true,
			uid: uid,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: true,
			msg: "Unexpected error 😥",
		});
	}
};

export { getUsers, createUser, updateUser, deleteUser };
