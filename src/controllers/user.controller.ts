import { Request, Response } from "express";

const getUsers = (req: Request, res: Response) => {
	res.json({
		ok: true,
		users: [
			{
				id: 145,
				name: "John",
			},
		],
	});
};

export { getUsers };
