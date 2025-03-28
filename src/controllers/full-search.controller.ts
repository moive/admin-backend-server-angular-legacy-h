import { Request, Response } from "express";
import { User } from "../models/user.model";
import { Hospital } from "../models/hospital.model";
import { Doctor } from "../models/doctor.model";

const getFullSearch = async (req: Request, res: Response) => {
	const search = req.params.search;
	const name = new RegExp(search, "i");

	try {
		const [user, hospital, doctor] = await Promise.all([
			User.find({ name }, "name email"),
			Hospital.find({ name }, "name"),
			Doctor.find({ name }, "name email"),
		]);

		res.json({ ok: true, user, hospital, doctor });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Please talk to the administrator",
		});
	}
};

const getCollectionFullSearch = async (req: Request, res: Response) => {
	const search = req.params.search;
	const table = req.params.table;
	const name = new RegExp(search, "i");
	let data: any = [];
	try {
		switch (table) {
			case "doctors":
				data = await Doctor.find({ name })
					.populate("user", "name img")
					.populate("hospital", "name img");
				break;
			case "hospitals":
				data = await Hospital.find({ name }).populate("user", "name img");
				break;
			case "users":
				data = await User.find({ name });
				break;

			default:
				res.status(400).json({
					ok: false,
					msg: "Table not found",
				});
		}

		res.json({
			ok: false,
			results: data,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Please talk to the administrator",
		});
	}
};

export { getFullSearch, getCollectionFullSearch };
