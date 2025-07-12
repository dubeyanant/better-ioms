"use client";

import { api } from "@/lib/api";
import { WorkflowStage } from "@/lib/utils";
import { useWorkflow } from "@/lib/workflow-context";
import { type AxiosResponse } from "axios";

type IOMActionsProps = {
	requestId: string;
	onClose: () => void;
};

export default function IOMActions({ requestId, onClose }: IOMActionsProps) {
	const { setCurrentStage } = useWorkflow();
	const handleGenerateIOM = async () => {
		console.log("✅ Generating IOM...");
		try {
			const response: AxiosResponse<Blob> = await api.get(
				`/getDoc/${requestId}`,
				{
					responseType: "blob",
				},
			);

			// response.data is already a Blob
			const url = URL.createObjectURL(response.data);
			const link = document.createElement("a");
			link.href = url;
			link.download = "BetterIOM.docx";
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

	const handleCloseTicket = async () => {
		try {
			await api.post(`data/update/${requestId}`, { stageId: "CLOSED" });
			setCurrentStage(WorkflowStage.CLOSED);
			onClose();
		} catch (error) {
			console.error("❌ Error closing ticket:", error);
			alert("Failed to close ticket.");
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
				onClick={handleCloseTicket}
				className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
			>
				Close Ticket
			</button>
		</div>
	);
}
