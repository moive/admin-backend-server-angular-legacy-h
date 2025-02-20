import { Schema, model, Document } from "mongoose";
import { IUser } from "./user.model";

export interface IHospital extends Document {
	name: string;
	img: string;
	user: IUser;
}

const HospitalSchema = new Schema<IHospital>({
	name: {
		type: String,
		required: true,
	},
	img: {
		type: String,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

HospitalSchema.method("toJSON", function () {
	const { __v, ...object } = this.toObject() as IHospital & {
		__v: number;
	};

	return object;
});

export const Hospital = model<IHospital>("Hospital", HospitalSchema);
