import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	img: string;
	role: string;
	google: boolean;
	uid: string;
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

UserSchema.method("toJSON", function () {
	const { __v, _id, password, ...object } = this.toObject() as IUser & {
		__v: string;
		_id: string;
	};

	object.uid = _id;

	return object;
});

export const User = model<IUser>("User", UserSchema);
