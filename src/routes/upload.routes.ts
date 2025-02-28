import { Router } from "express";
import expressFileUpload from "express-fileupload";
import { fileUpload, getImage } from "../controllers/upload.controller";
import { validarJWT } from "../middlewares/validator-jwt.middleware";

const router = Router();

router.use(expressFileUpload());

router.put("/:type/:id", validarJWT, fileUpload);
router.get("/:type/:photo", getImage);

export default router;
