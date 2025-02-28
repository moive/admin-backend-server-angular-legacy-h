import { model, Schema } from "mongoose";
import { IDoctor, IEntity } from "../interfaces/model.interface";

const DoctorSchema = new Schema<IEntity>({
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
		required: true,
	},
	hospital: {
		type: Schema.Types.ObjectId,
		ref: "Hospital",
		required: true,
	},
});

DoctorSchema.method("toJSON", function () {
	const { __v, ...object } = this.toObject() as IEntity & {
		__v: number;
	};
	return object;
});

export const Doctor = model<IEntity>("Doctor", DoctorSchema);
