"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import { WorkflowStage } from "./utils";

interface WorkflowContextType {
	currentStage: WorkflowStage;
	setCurrentStage: (stage: WorkflowStage) => void;
}

const WorkflowContext = createContext<WorkflowContextType | undefined>(
	undefined,
);

export function WorkflowProvider({ children }: { children: ReactNode }) {
	const [currentStage, setCurrentStage] = useState<WorkflowStage>(
		WorkflowStage.REVIEWED,
	);

	return (
		<WorkflowContext.Provider value={{ currentStage, setCurrentStage }}>
			{children}
		</WorkflowContext.Provider>
	);
}

export function useWorkflow() {
	const context = useContext(WorkflowContext);
	if (context === undefined) {
		throw new Error("useWorkflow must be used within a WorkflowProvider");
	}
	return context;
}
