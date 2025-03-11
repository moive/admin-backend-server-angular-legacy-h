import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envs } from "../config/envs";
import { IRequest } from "../interfaces/req.interface";

const validateJWT = (req: IRequest, res: Response, next: NextFunction) => {
	const token = req.header("x-token");
	if (!token) {
		res.status(401).json({
			ok: false,
			msg: "No token exists in the request",
		});
		return;
	}

	try {
		const { uid } = jwt.verify(token, envs.JWT_SECRET) as JwtPayload;
		req.uid = uid;
		next();
	} catch (err) {
		console.log(err);
		res.status(401).json({
			ok: false,
			msg: "Invalid token",
		});
	}
};

export { validateJWT };
