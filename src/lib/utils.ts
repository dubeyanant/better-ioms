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

export enum WorkflowStage {
	REQUEST_CREATED = "Request Created",
	REVIEWED = "Reviewed",
	QUOTATION_UPLOADED = "Quotation Uploaded",
	APPROVED = "Approved",
	IOM_GENERATED = "IOM Generated",
	CLOSED = "Closed",
}

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
