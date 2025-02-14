import { Router } from "express";
import { login } from "../controllers/auth.controller";
import { check } from "express-validator";
import { validatorFields } from "../middlewares/validator-fields.middleware";

const router = Router();

router.post(
	"/",
	[
		check("email", "The email is not valid").isEmail(),
		check("email", "The email is required").not().isEmpty(),
		check("password", "The password is required").not().isEmpty(),
		validatorFields,
	],
	login
);

export default router;
