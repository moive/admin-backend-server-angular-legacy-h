import fs from "fs";
import { Doctor } from "../models/doctor.model";
import { Hospital } from "../models/hospital.model";
import { User } from "../models/user.model";
import { Model } from "mongoose";
import { IDoctor, IEntity } from "../interfaces/model.interface";

type IUpdateImage = {
	type: string;
	id: string;
	nameFile: string;
};

const deleteImg = (path: string) => {
	if (fs.existsSync(path)) {
		fs.unlinkSync(path);
	}
};

const updateImage = async ({ type, id, nameFile }: IUpdateImage) => {
	let model: Model<IEntity>;
	let oldPath;

	switch (type) {
		case "doctors":
			model = Doctor;
			break;

		case "hospitals":
			model = Hospital;
			break;
		case "users":
			model = User;
			break;

		default:
			console.log("Invalid type");
			return false;
	}

	if (model) {
		const entity = await model.findById(id);
		if (!entity) {
			console.log(
				`${type.charAt(0).toUpperCase() + type.slice(1)} not found by id`
			);
			return false;
		}
		oldPath = `./uploads/${type}/${entity.img}`;

		deleteImg(oldPath);

		entity.img = nameFile;
		await entity.save();

		return true;
	}
};

export { updateImage };
