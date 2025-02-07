import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";

const validatorFields = (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		res
			.status(400)
			.json({ ok: false, errors: errors.formatWith((e) => e.msg).array() });
		return;
	}
	next();
};

export { validatorFields };
