import { WorkflowStage } from "@/lib/utils";
import { CheckCircle2, Circle } from "lucide-react";

interface WorkflowStatusProps {
	currentStage: WorkflowStage;
}

const STAGES = [
	WorkflowStage.REQUEST_CREATED,
	WorkflowStage.REVIEWED,
	WorkflowStage.QUOTATION_UPLOADED,
	WorkflowStage.APPROVED,
	WorkflowStage.IOM_GENERATED,
];

export default function WorkflowStatus({ currentStage }: WorkflowStatusProps) {
	return (
		<div className="flex flex-col sm:flex-row items-center sm:space-x-8 space-y-8 sm:space-y-0 relative">
			{STAGES.map((stage, index) => {
				const isClosed = currentStage === WorkflowStage.CLOSED;
				const isCompleted =
					isClosed || STAGES.indexOf(currentStage) > index;
				const isCurrent = STAGES.indexOf(currentStage) === index;

				return (
					<div
						key={stage}
						className="flex flex-col items-center relative sm:flex-1"
					>
						{/* Horizontal Line */}
						{index !== 0 && (
							<div className="hidden sm:block absolute -left-1/2 top-6 w-full h-1 bg-gray-300 z-0">
								<div
									className={`h-full ${
										isCompleted
											? "bg-green-400"
											: isCurrent
												? "bg-amber-400"
												: "bg-gray-300"
									}`}
								/>
							</div>
						)}

						{/* Vertical Line */}
						{index !== 0 && (
							<div className="sm:hidden absolute -top-8 h-8 w-1 bg-gray-300 z-0">
								<div
									className={`w-full h-full ${
										isCompleted
											? "bg-green-400"
											: isCurrent
												? "bg-amber-400"
												: "bg-gray-300"
									}`}
								/>
							</div>
						)}

						{/* Circle */}
						<div
							className={`w-12 h-12 z-10 flex items-center justify-center rounded-full border-2 transition-all duration-300
                ${
					isCompleted
						? "bg-gradient-to-br from-green-400 to-lime-500 border-green-400 shadow-[0_0_12px_2px_#86efac]"
						: isCurrent
							? "bg-amber-400 border-amber-400 text-white shadow-[0_0_12px_2px_#facc15]"
							: "bg-gray-100 border-gray-300 text-gray-500"
				}
              `}
						>
							{isCompleted ? (
								<CheckCircle2 className="text-white w-6 h-6" />
							) : (
								<Circle className="w-5 h-5" />
							)}
						</div>

						{/* Label */}
						<div
							className={`mt-2 text-sm font-semibold text-center ${
								isCompleted
									? "text-green-600"
									: isCurrent
										? "text-amber-500"
										: "text-gray-500"
							}`}
						>
							{stage}
						</div>
					</div>
				);
			})}
		</div>
	);
}
