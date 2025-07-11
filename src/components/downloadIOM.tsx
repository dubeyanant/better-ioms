"use client";

import { api } from "@/lib/api";
import { type AxiosResponse } from "axios";

type IOMActionsProps = {
	onCloseTicket?: () => void;
};

export default function IOMActions({ onCloseTicket }: IOMActionsProps) {
	const handleGenerateIOM = async () => {
		const id = 1;
		console.log("✅ Generating IOM...");
		try {
			const response: AxiosResponse<Blob> = await api.get(
				`/getDoc/${id}`,
				{
					responseType: "blob",
				},
			);

			// response.data is already a Blob
			const url = URL.createObjectURL(response.data);
			const link = document.createElement("a");
			link.href = url;
			link.download = "downloaded.docx";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			URL.revokeObjectURL(url);

			console.log("📄 File downloaded successfully");
		} catch (error) {
			console.error("❌ Error downloading IOM:", error);
			alert("Failed to download the Word document.");
		}
	};
	return (
		<div className="flex justify-center gap-4 mt-6">
			<button
				onClick={handleGenerateIOM}
				className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
			>
				Generate IOM
			</button>

			<button
				onClick={onCloseTicket}
				className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
			>
				Close Ticket
			</button>
		</div>
	);
}
