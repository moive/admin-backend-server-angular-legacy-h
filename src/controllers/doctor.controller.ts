import { Request, Response } from "express";
import { IRequest } from "../interfaces/req.interface";
import { Doctor } from "../models/doctor.model";

const getDoctors = async (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "getDoctors",
	});
};
const createDoctor = async (req: IRequest, res: Response) => {
	const uid = req.uid;
	const doctor = await new Doctor({
		user: uid,
		...req.body,
	});

	try {
		const doctorDB = await doctor.save();
		res.json({
			ok: true,
			doctor: doctorDB,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Please talk to the administrator",
		});
	}
};
const updateDoctor = async (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "updateDoctor",
	});
};
const deleteDoctor = async (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "deleteDoctor",
	});
};

export { getDoctors, createDoctor as createDoctor, updateDoctor, deleteDoctor };
