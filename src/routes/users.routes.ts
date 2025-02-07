import { Router } from "express";
import { createUser, getUsers } from "../controllers/user.controller";
import { check } from "express-validator";
import { validatorFields } from "../middlewares/validator-fields.middleware";

const router = Router();

router.get("/", getUsers);
router.post(
	"/",
	[
		check("name", "The name is required.").not().isEmpty(),
		check("password", "The password is required.").not().isEmpty(),
		check("email", "The email is required.").isEmail(),
		validatorFields,
	],
	createUser
);

export default router;
