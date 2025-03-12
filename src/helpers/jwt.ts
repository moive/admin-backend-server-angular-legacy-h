import jwt from "jsonwebtoken";
import { envs } from "../config/envs";

const generateJWT = (uid: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const payload = {
			uid,
		};

		jwt.sign(
			payload,
			envs.JWT_SECRET,
			{
				expiresIn: "12h",
			},
			(err, token) => {
				if (err) {
					console.log(err);
					reject("Could not generate the token");
				} else {
					resolve(token!);
				}
			}
		);
	});
};

export { generateJWT };
