"use client";

import ActionButtons from "@/components/ui/ActionButtons";
import WorkflowStatus from "@/components/ui/status_workflow";
import UploadAnalyze from "@/components/update_analyse";
import VendorForm from "@/components/vendor_form";
import { get } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { UserRole, WorkflowStage } from "@/lib/utils";
import { useWorkflow } from "@/lib/workflow-context";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// Define an interface for the request details
interface RequestDetails {
	requestId: number;
	title: string;
	category: string;
	description: string;
	subCategory: string;
	requesterId: number;
	stageId: string;
	contractParty: string | null;
	briefDescription: string | null;
	annexure: string;
	costCenter: string | null;
	subCostCenter: string | null;
	scopeOfWork: string | null; // API sends a single string
	recommendationAndRationale: string | null;
	initiatedBy: string | null;
	reviewedBy: string | null;
	approvedBy: string | null;
	formType: string;
	date: string;
	orderValue: string | null;
	l1Name: string;
	l2Name: string;
	l3Name: string;
	l1Price: string;
	l2Price: string;
	l3Price: string;
	l1Total: string;
	l2Total: string;
	l3Total: string;
	amount: string;
	contractPeriod: string | null;
	budgeted: string;
	comparativeCostAnalysis: string | null;
	roleInitiated: string;
	toleReview: string;
	roleApprove: string;
	cmc: string;
	rmc: string;
	tmc: string;
	selectedVendor: string | null;
}

interface ApiResponse {
	message: string;
	status: number;
	data: RequestDetails;
}

const RequestDetailsPage = () => {
	const { user } = useAuth();
	const { currentStage } = useWorkflow();
	const params = useParams();
	const id = params.id as string;

	const [requestDetails, setRequestDetails] = useState<RequestDetails | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (id) {
			const fetchRequestDetails = async () => {
				try {
					setLoading(true);
					const response = await get<ApiResponse>(`data/${id}`);
					setRequestDetails(response.data);
				} catch (err) {
					setError("Failed to fetch request details.");
					console.error(err);
				} finally {
					setLoading(false);
				}
			};
			fetchRequestDetails();
		}
	}, [id]);

	const isDone = currentStage === WorkflowStage.CLOSED;

	// 📦 Replace these with real data (from props, context, or API)

	const [areFilesUploaded, setFilesUploadedProp] = useState(false);

	const handleGenerateIOM = () => {
		console.log("✅ Generating IOM...");
		// Add logic to generate IOM
	};

	const handleCloseTicket = () => {
		console.log("❌ Closing ticket...");
		// Add logic to close the ticket
	};

	if (loading) {
		return <div className="min-h-screen bg-gray-50 p-6">Loading...</div>;
	}

	if (error) {
		return <div className="min-h-screen bg-gray-50 p-6">{error}</div>;
	}

	if (!requestDetails) {
		return (
			<div className="min-h-screen bg-gray-50 p-6">
				No request details found.
			</div>
		);
	}

	const {
		title,
		description, // Using description as scopeOfWork
		category,
	} = requestDetails;

	// The API returns scopeOfWork as a single string, but the UI expects an array.
	// We'll use the description and split it by newlines for the list display.
	const scopeOfWorkList = description ? description.split("\\n") : [];

	return (
		<div className="min-h-screen bg-gray-50 p-6 space-y-8">
			{/* Section 1: Request Info */}
			<section className="bg-white shadow rounded-lg p-6 space-y-4">
				<h2 className="text-xl font-semibold text-blue-600">
					Request Details
				</h2>
				<div className="space-y-2 text-gray-700 text-sm">
					<p>
						<strong>Request Created By:</strong> associate@ex.com
					</p>
					<p>
						<strong>Title:</strong> {title}
					</p>
					<div>
						<strong>Scope of Work:</strong>
						<ul className="list-disc ml-5 mt-1 text-gray-600">
							{scopeOfWorkList.map((line, idx) => (
								<li key={idx}>{line}</li>
							))}
						</ul>
					</div>
				</div>
			</section>

			{/* Section 2: Workflow Tracker */}
			<section className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-semibold text-blue-600 mb-4">
					Workflow Progress
				</h2>
				<WorkflowStatus currentStage={currentStage} />
			</section>

			{/* Section 3: Upload Quotations */}
			{!isDone && currentStage === WorkflowStage.QUOTATION_UPLOADED && (
				<>
					<section className="bg-white shadow rounded-lg p-6">
						<h2 className="text-xl font-semibold text-blue-600 mb-4">
							Upload Quotations
						</h2>
						<UploadAnalyze uploadFiles={setFilesUploadedProp} />
					</section>

					<section>{areFilesUploaded && <VendorForm />}</section>
				</>
			)}

			{/* Section 4: Take an Action */}
			{!isDone &&
				(user?.role === UserRole.AVP || user?.role === UserRole.CTO) &&
				(currentStage === WorkflowStage.REVIEWED ||
					currentStage === WorkflowStage.APPROVED) && (
					<section>
						<ActionButtons />
					</section>
				)}

			{/* Section 6: Final Actions */}
			{!isDone && currentStage === WorkflowStage.IOM_GENERATED && (
				<section className="bg-white shadow rounded-lg p-6">
					<h2 className="text-xl font-semibold text-blue-600 mb-4">
						Final Actions
					</h2>
					<div className="flex justify-center gap-4">
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
				</section>
			)}
		</div>
	);
};

export default RequestDetailsPage;
