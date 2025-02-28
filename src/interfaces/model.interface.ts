import { Document } from "mongoose";

export interface IEntity extends IUser, IHospital, IDoctor {
	img: string;
}

export interface IUser extends Document {
	name: string;
	email: string;
	password: string;
	role: string;
	google: boolean;
	uid: string;
}

export interface IHospital extends Document {
	name: string;
	user: IUser;
}

export interface IDoctor extends Document {
	name: string;
	user: IUser;
	hospital: IHospital;
}
