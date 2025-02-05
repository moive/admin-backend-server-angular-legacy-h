import { Schema, model } from "mongoose";

export interface IUser {
	name: string;
	email: string;
	password: string;
	img: string;
	role: string;
	google: boolean;
}

const UserSchema = new Schema<IUser>({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	role: {
		type: String,
		required: true,
		default: "USER_ROLE",
	},
	google: {
		type: Boolean,
		default: false,
	},
});

export const User = model<IUser>("User", UserSchema);
