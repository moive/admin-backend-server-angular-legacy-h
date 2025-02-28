import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generarJWT } from "../helpers/jwt";

const login = async (req: Request, res: Response) => {
	const { email, password } = req.body;
	try {
		const userDb = await User.findOne({ email });
		if (!userDb) {
			res.status(404).json({
				msg: "Email not found",
			});
			return;
		}

		const validPassword = bcrypt.compareSync(password, userDb.password);
		if (!validPassword) {
			res.status(400).json({
				ok: false,
				msg: "Password is not valid",
			});
			return;
		}

		const token = await generarJWT(userDb.id);

		res.json({
			ok: true,
			msg: "Login success",
			token,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Internal Server Error.",
		});
	}
};

export { login };
