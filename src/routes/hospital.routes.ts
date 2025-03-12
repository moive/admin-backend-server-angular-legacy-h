import { Router } from "express";

import { check } from "express-validator";
import { validatorFields } from "../middlewares/validator-fields.middleware";
import { validateJWT } from "../middlewares/validator-jwt.middleware";
import {
	createHospital,
	deleteHospital,
	getHospitals,
	updateHospital,
} from "../controllers/hospital.controller";

const router = Router();

router.get("/", validateJWT, getHospitals);
router.post(
	"/",
	[
		validateJWT,
		check("name", "The hospital name is required").not().isEmpty(),
		validatorFields,
	],
	createHospital
);
router.put(
	"/:id",
	[
		validateJWT,
		check("name", "The hospital name is required").not().isEmpty(),
		validatorFields,
	],
	updateHospital
);

router.delete("/:id", validateJWT, deleteHospital);

export default router;
