import fs from "fs";
import { Doctor } from "../models/doctor.model";
import { Hospital } from "../models/hospital.model";
import { User } from "../models/user.model";

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
	let oldPath;
	switch (type) {
		case "doctors":
			const doctor = await Doctor.findById(id);
			if (!doctor) {
				console.log("Doctor not found by id");
				return;
			}
			oldPath = `./uploads/doctors/${doctor.img}`;

			deleteImg(oldPath);

			doctor.img = nameFile;
			await doctor.save();
			return true;

			break;
		case "hospitals":
			const hospital = await Hospital.findById(id);
			if (!hospital) {
				console.log("Doctor not found by id");
				return;
			}
			oldPath = `./uploads/hospitals/${hospital.img}`;

			deleteImg(oldPath);

			hospital.img = nameFile;
			await hospital.save();
			return true;
			break;
		case "users":
			const user = await User.findById(id);
			if (!user) {
				console.log("Doctor not found by id");
				return;
			}
			oldPath = `./uploads/users/${user.img}`;

			deleteImg(oldPath);

			user.img = nameFile;
			await user.save();
			return true;
			break;

		default:
			break;
	}
};

export { updateImage };
