import { Router } from "express";
import {
	createUser,
	deleteUser,
	getUsers,
	updateUser,
} from "../controllers/user.controller";
import { check } from "express-validator";
import { validatorFields } from "../middlewares/validator-fields.middleware";
import { validateJWT } from "../middlewares/validator-jwt.middleware";

const router = Router();

router.get("/", validateJWT, getUsers);
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
router.put(
	"/:id",
	[
		validateJWT,
		check("name", "The name is required.").not().isEmpty(),
		check("email", "The email is required.").isEmail(),
		check("role", "the role is required.").not().isEmpty(),
		validatorFields,
	],
	updateUser
);

router.delete("/:id", validateJWT, deleteUser);

export default router;
