import { Request, Response } from "express";
import { IRequest } from "../interfaces/req.interface";
import { Doctor } from "../models/doctor.model";

const getDoctors = async (req: Request, res: Response) => {
	try {
		const doctors = await Doctor.find()
			.populate("user", "name")
			.populate("hospital", "name");
		res.json({
			ok: true,
			doctors,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Please talk to the administrator",
		});
	}
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
const updateDoctor = async (req: IRequest, res: Response) => {
	const { id } = req.params;
	const uid = req.uid;

	try {
		const doctor = await Doctor.findById(id);

		if (!doctor) {
			res.status(404).json({
				ok: false,
				msg: "Doctor not found",
			});
			return;
		}

		const changesDoctor = {
			...req.body,
			user: uid,
		};

		const doctorUpdated = await Doctor.findByIdAndUpdate(id, changesDoctor, {
			new: true,
		});

		res.json({
			ok: true,
			msg: "update Doctor",
			hospital: doctorUpdated,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Please talk to the administrator",
		});
	}
};
const deleteDoctor = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const doctor = await Doctor.findById(id);

		if (!doctor) {
			res.status(404).json({
				ok: false,
				msg: "Doctor not found",
			});
			return;
		}
		const doctorDeleted = await Doctor.findByIdAndDelete(id);

		res.json({
			ok: true,
			msg: `Delete doctor '${doctorDeleted?.name}' successfully`,
			id,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Please talk to the administrator",
		});
	}
};

export { getDoctors, createDoctor as createDoctor, updateDoctor, deleteDoctor };
