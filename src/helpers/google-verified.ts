import { OAuth2Client } from "google-auth-library";
import { envs } from "../config/envs";
const client = new OAuth2Client(envs.GOOGLE_SECRET);
const googleVerify = async (token: string) => {
	const ticket = await client.verifyIdToken({
		idToken: token,
		audience: envs.GOOGLE_ID, // Specify the WEB_CLIENT_ID of the app that accesses the backend
		// Or, if multiple clients access the backend:
		//[WEB_CLIENT_ID_1, WEB_CLIENT_ID_2, WEB_CLIENT_ID_3]
	});
	const payload = ticket.getPayload();
	// const userid = payload["sub"];
	console.log({ payload });
	// If the request specified a Google Workspace domain:
	// const domain = payload['hd'];
	return payload;
};

export { googleVerify };
