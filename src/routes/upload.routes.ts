import { Router } from "express";
import expressFileUpload from "express-fileupload";
import { fileUpload } from "../controllers/upload.controller";
import { validarJWT } from "../middlewares/validator-jwt.middleware";

const router = Router();

router.use(expressFileUpload());

router.put("/:type/:id", validarJWT, fileUpload);

export default router;
