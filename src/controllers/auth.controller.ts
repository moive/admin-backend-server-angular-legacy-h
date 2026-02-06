import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import { generateJWT } from "../helpers/jwt";
import { googleVerify } from "../helpers/google-verified";
import { IRequest } from "../interfaces/req.interface";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userDb = await User.findOne({ email });
    if (!userDb) {
      res.status(404).json({
        msg: "Email not found",
      });
      return;
    }

    const validPassword = bcrypt.compareSync(password, userDb.password);
    if (!validPassword) {
      res.status(400).json({
        ok: false,
        msg: "Password is not valid",
      });
      return;
    }

    const token = await generateJWT(userDb.id);

    res.json({
      ok: true,
      msg: "Login success",
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Internal Server Error.",
    });
  }
};

const googleSignIn = async (req: Request, res: Response) => {
  try {
    const googleUser = await googleVerify(req.body.token);
    if (!googleUser) {
      res.status(400).json({
        ok: false,
        msg: "Token google is not correct",
      });
      return;
    }
    const { email, name, picture } = googleUser;

    const userDB = await User.findOne({ email });
    let user;
    if (!userDB) {
      user = new User({
        name,
        email,
        password: "@@@",
        img: picture,
        google: true,
      });
    } else {
      user = userDB;
      user.google = true;
    }

    await user.save();
    const token = await generateJWT(user.id);

    res.json({
      ok: true,
      msg: "Google sign-in success",
      email,
      name,
      picture,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      ok: false,
      msg: "Token google is not correct",
    });
  }
};

const renewToken = async (req: IRequest, res: Response) => {
  const uid = req.uid!;
  const token = await generateJWT(uid);
  res.json({
    ok: true,
    token,
  });
};

export { login, googleSignIn, renewToken };
