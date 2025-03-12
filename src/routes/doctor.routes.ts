import { Router } from "express";

import { check } from "express-validator";
import { validatorFields } from "../middlewares/validator-fields.middleware";
import { validateJWT } from "../middlewares/validator-jwt.middleware";
import {
	createDoctor,
	deleteDoctor,
	getDoctors,
	updateDoctor,
} from "../controllers/doctor.controller";

const router = Router();

router.get("/", validateJWT, getDoctors);
router.post(
	"/",
	[
		validateJWT,
		check("name", "The doctor name is required").not().isEmpty(),
		check("hospital", "The id hospital is must be valid").isMongoId(),
		validatorFields,
	],
	createDoctor
);
router.put(
	"/:id",
	[
		validateJWT,
		check("name", "The doctor name is required").not().isEmpty(),
		check("hospital", "The id hospital is must be valid").isMongoId(),
		validatorFields,
	],
	updateDoctor
);

router.delete("/:id", validateJWT, deleteDoctor);

export default router;
