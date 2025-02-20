import { Request, Response } from "express";
import { Hospital } from "../models/hospital.model";
import { IRequest } from "../interfaces/req.interface";

const getHospitals = async (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "getHospitals",
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
const updateHospital = async (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "updateHospital",
	});
};
const deleteHospital = async (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "deleteHospital",
	});
};

export { getHospitals, createHospital, updateHospital, deleteHospital };
