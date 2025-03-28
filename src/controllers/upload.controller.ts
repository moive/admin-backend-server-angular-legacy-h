import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { FileArray, UploadedFile } from "express-fileupload";
import { updateImage } from "../helpers/updated-image";

const fileUpload = (req: Request, res: Response) => {
	const { type, id } = req.params;
	const typeValid = ["doctors", "users", "hospitals"];

	if (!typeValid.includes(type)) {
		res.json({
			ok: false,
			msg: "No is a doctor, user or hospital",
		});
		return;
	}

	if (!req.files || Object.keys(req.files).length === 0) {
		res.status(400).json({ ok: false, msg: "No files were uploaded." });
		return;
	}

	const files = req.files.images as UploadedFile;
	let orderFile;

	orderFile = files.name.split(".");
	const ext = orderFile[orderFile.length - 1];

	const extenstionsValid = ["png", "jpg", "jpeg", "gif"];
	if (!extenstionsValid.includes(ext)) {
		res.json({
			ok: false,
			msg: "Extentions not valid",
		});
		return;
	}

	const nameFile = `${uuidv4()}.${ext}`;
	const uploadPath = `./uploads/${type}/${nameFile}`;

	files.mv(uploadPath, (err: any) => {
		if (err) {
			console.log(err);
			res.status(500).json({
				ok: false,
				msg: "Error to move file",
			});
			return;
		}

		updateImage({ type, id, nameFile });

		res.json({
			ok: true,
			msg: "File uploaded",
			nameFile,
		});
	});
};

const getImage = (req: Request, res: Response) => {
	const { type, photo } = req.params;
	const pathImage = path.join(__dirname, `../../uploads/${type}/${photo}`);

	if (fs.existsSync(pathImage)) {
		res.sendFile(pathImage);
	} else {
		const pathImage = path.join(
			__dirname,
			`../../uploads/no-image-available.jpeg`
		);
		res.sendFile(pathImage);
	}
};

export { fileUpload, getImage };
