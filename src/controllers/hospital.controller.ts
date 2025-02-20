import { Request, Response } from "express";

const getHospitals = async (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "getHospitals",
	});
};
const createHospital = async (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "createHospital",
	});
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
