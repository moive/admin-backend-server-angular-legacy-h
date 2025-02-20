import { Request, Response } from "express";

const getDoctors = async (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "getDoctors",
	});
};
const createDoctor = async (req: Request, res: Response) => {
	res.json({
		ok: true,
		msg: "createDoctor",
	});
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
