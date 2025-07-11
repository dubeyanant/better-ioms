import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export enum UserRole {
	ASSOCIATE = "Associate",
	AVP = "AVP",
	IOM = "IOM",
	VP = "Vp",
	CTO = "CTO",
	CEO = "CEO",
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
