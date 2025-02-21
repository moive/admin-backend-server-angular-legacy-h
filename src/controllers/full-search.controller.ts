import { Request, Response } from "express";

const getFullSearch = async (req: Request, res: Response) => {
	const search = req.params.search;
	try {
		res.json({ ok: true, search });
	} catch (error) {
		console.log(error);
		res.status(500).json({
			ok: false,
			msg: "Please talk to the administrator",
		});
	}
};

export { getFullSearch };
