import { Router } from "express";
import { validateJWT } from "../middlewares/validator-jwt.middleware";
import {
	getCollectionFullSearch,
	getFullSearch,
} from "../controllers/full-search.controller";

const router = Router();

router.get("/:search", [validateJWT], getFullSearch);
router.get(
	"/collection/:table/:search",
	[validateJWT],
	getCollectionFullSearch
);

export default router;
