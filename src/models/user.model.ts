import { Schema, model } from "mongoose";
import { IEntity } from "../interfaces/model.interface";

const UserSchema = new Schema<IEntity>({
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

UserSchema.method("toJSON", function () {
	const { __v, _id, password, ...object } = this.toObject() as IEntity & {
		__v: number;
		_id: string;
	};

	object.uid = _id;

	return object;
});

export const User = model<IEntity>("User", UserSchema);
