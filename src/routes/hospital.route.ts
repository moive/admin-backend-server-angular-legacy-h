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
router.post("/", [], createHospital);
router.put("/:id", [], updateHospital);

router.delete("/:id", validarJWT, deleteHospital);

export default router;
