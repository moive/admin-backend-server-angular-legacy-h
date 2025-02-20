import { Document, model, Schema } from "mongoose";
import { IUser } from "./user.model";
import { IHospital } from "./hospital.model";

export interface IDoctor extends Document {
	name: string;
	img: string;
	user: IUser;
	hospital: IHospital;
}

const DoctorSchema = new Schema<IDoctor>({
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
	hospital: {
		type: Schema.Types.ObjectId,
		ref: "Hospital",
	},
});

DoctorSchema.method("toJSON", function () {
	const { __v, ...object } = this.toObject() as IDoctor & {
		__v: number;
	};
	return object;
});

export const Doctor = model<IDoctor>("Doctor", DoctorSchema);
