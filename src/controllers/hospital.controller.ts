import { Request, Response } from "express";
import { Hospital } from "../models/hospital.model";
import { IRequest } from "../interfaces/req.interface";

const getHospitals = async (req: Request, res: Response) => {
	const hospitals = await Hospital.find().populate("user", "name email");
	res.json({
		ok: true,
		hospitals,
	});
};
const createHospital = async (req: IRequest, res: Response) => {
	try {
		const uid = req.uid;
		const hospital = new Hospital({
			user: uid,
			...req.body,
		});

		const hospitalDB = await hospital.save();

		res.json({
			ok: true,
			hospital: hospitalDB,
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Please talk to the administrator",
		});
	}
};
const updateHospital = async (req: IRequest, res: Response) => {
	const { id } = req.params;
	const uid = req.uid;

	try {
		const hospital = await Hospital.findById(id);

		if (!hospital) {
			res.status(404).json({
				ok: false,
				msg: "Hospital not found",
			});
			return;
		}

		const changesHospital = {
			...req.body,
			user: uid,
		};

		const hospitalUpdated = await Hospital.findByIdAndUpdate(
			id,
			changesHospital,
			{ new: true }
		);

		res.json({
			ok: true,
			msg: "updateHospital",
			hospital: hospitalUpdated,
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({
			ok: false,
			msg: "Please talk to the administrator",
		});
	}
};
const deleteHospital = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const hospital = await Hospital.findById(id);

		if (!hospital) {
			res.status(404).json({
				ok: false,
				msg: "Hospital not found",
			});
			return;
		}
		await Hospital.findByIdAndDelete(id);
		res.json({
			ok: true,
			msg: "delete Hospital",
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

export { getHospitals, createHospital, updateHospital, deleteHospital };
