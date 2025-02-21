import { Router } from "express";

import { check } from "express-validator";
import { validatorFields } from "../middlewares/validator-fields.middleware";
import { validarJWT } from "../middlewares/validator-jwt.middleware";
import {
	createHospital,
	deleteHospital,
	getHospitals,
	updateHospital,
} from "../controllers/hospital.controller";

const router = Router();

router.get("/", validarJWT, getHospitals);
router.post(
	"/",
	[
		validarJWT,
		check("name", "The hospital name is required").not().isEmpty(),
		validatorFields,
	],
	createHospital
);
router.put("/:id", [validarJWT], updateHospital);

router.delete("/:id", validarJWT, deleteHospital);

export default router;
