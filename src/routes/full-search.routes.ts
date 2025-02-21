import { Router } from "express";
import { validarJWT } from "../middlewares/validator-jwt.middleware";
import { getFullSearch } from "../controllers/full-search.controller";

const router = Router();

router.get("/:search", [validarJWT], getFullSearch);

export default router;
