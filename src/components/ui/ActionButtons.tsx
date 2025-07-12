"use client";
import { post } from "@/lib/api";
import { WorkflowStage } from "@/lib/utils";
import { useWorkflow } from "@/lib/workflow-context";
import React, { useState } from "react";

interface ActionButtonsProps {
	requestId: string;
}

export default function ActionButtons({ requestId }: ActionButtonsProps) {
	const [isSubmitting, setIsSubmitting] = useState(false);
	const { setCurrentStage, currentStage } = useWorkflow();

	const handleAction = async (stageId: string) => {
		if (isSubmitting) return;
		setIsSubmitting(true);
		try {
			if (currentStage === WorkflowStage.APPROVED) {
				setCurrentStage(WorkflowStage.IOM_GENERATED);
				await post(`data/update/${requestId}`, {
					stageId: "IOM_GENERATED",
				});
			} else if (currentStage === WorkflowStage.REVIEWED) {
				setCurrentStage(WorkflowStage.QUOTATION_UPLOADED);
				await post(`data/update/${requestId}`, {
					stageId: "QUOTATION_UPLOADED",
				});
			}
		} catch (error) {
			console.error(`Failed to set stage to ${stageId}`, error);
			setIsSubmitting(false); // Re-enable buttons on error
		}
	};

	return (
		<div className="flex flex-col bg-white shadow rounded-2xl p-6 space-y-6 transition-all">
			<h2 className="text-xl font-semibold text-blue-600 text-center">
				Take an Action
			</h2>

			<div className="flex flex-col sm:flex-row gap-4 w-full">
				<button
					onClick={() => handleAction("QUOTATION_UPLOADED")}
					disabled={isSubmitting}
					className="flex-1 min-w-[120px] bg-green-500 hover:bg-green-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300 text-white font-medium py-2.5 px-4 rounded-md shadow transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					Approve
				</button>
				<button
					onClick={() => handleAction("DISAPPROVED")}
					disabled={isSubmitting}
					className="flex-1 min-w-[120px] bg-red-500 hover:bg-red-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300 text-white font-medium py-2.5 px-4 rounded-md shadow transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					Disapprove
				</button>
				<button
					onClick={() => handleAction("ON_HOLD")}
					disabled={isSubmitting}
					className="flex-1 min-w-[120px] bg-yellow-500 hover:bg-yellow-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white font-medium py-2.5 px-4 rounded-md shadow transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
				>
					Hold
				</button>
			</div>
		</div>
	);
}
