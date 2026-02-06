import { Router } from "express";
import {
  googleSignIn,
  login,
  renewToken,
} from "../controllers/auth.controller";
import { check } from "express-validator";
import { validatorFields } from "../middlewares/validator-fields.middleware";
import { validateJWT } from "../middlewares/validator-jwt.middleware";

const router = Router();

// https://developers.google.com/identity/gsi/web/guides/overview
// https://developers.google.com/identity/gsi/web/guides/display-button?hl=es-419#javascript

router.post(
  "/",
  [
    check("email", "The email is not valid").isEmail(),
    check("email", "The email is required").not().isEmpty(),
    check("password", "The password is required").not().isEmpty(),
    validatorFields,
  ],
  login,
);

router.post(
  "/google",
  [
    check("token", "The google token is required").not().isEmpty(),
    validatorFields,
  ],
  googleSignIn,
);

router.get("/renew", validateJWT, renewToken);

export default router;
