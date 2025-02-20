import { Router } from "express";

import { check } from "express-validator";
import { validatorFields } from "../middlewares/validator-fields.middleware";
import { validarJWT } from "../middlewares/validator-jwt.middleware";
import {
	createDoctor,
	deleteDoctor,
	getDoctors,
	updateDoctor,
} from "../controllers/doctor.controller";

const router = Router();

router.get("/", validarJWT, getDoctors);
router.post("/", [], createDoctor);
router.put("/:id", [], updateDoctor);

router.delete("/:id", validarJWT, deleteDoctor);

export default router;
