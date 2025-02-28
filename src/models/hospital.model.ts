import { Schema, model } from "mongoose";
import { IEntity } from "../interfaces/model.interface";

const HospitalSchema = new Schema<IEntity>({
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
});

HospitalSchema.method("toJSON", function () {
	const { __v, ...object } = this.toObject() as IEntity & {
		__v: number;
	};

	return object;
});

export const Hospital = model<IEntity>("Hospital", HospitalSchema);
