import { Router } from "express";
import { validarJWT } from "../middlewares/validator-jwt.middleware";
import {
	getCollectionFullSearch,
	getFullSearch,
} from "../controllers/full-search.controller";

const router = Router();

router.get("/:search", [validarJWT], getFullSearch);
router.get("/collection/:table/:search", [validarJWT], getCollectionFullSearch);

export default router;
