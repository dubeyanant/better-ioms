"use client";

import IOMActions from "@/components/downloadIOM";
import ActionButtons from "@/components/ui/ActionButtons";
import WorkflowStatus from "@/components/ui/status_workflow";
import UploadAnalyze from "@/components/update_analyse";
import VendorForm from "@/components/vendor_form";
import api, { get } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { UserRole, WorkflowStage } from "@/lib/utils";
import { useWorkflow } from "@/lib/workflow-context";
import { AxiosResponse } from "axios";
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

const stageIdToWorkflowStage: { [key: string]: WorkflowStage } = {
	"stage-1": WorkflowStage.REQUEST_CREATED,
	REVIEWED: WorkflowStage.REVIEWED,
	QUOTATION_UPLOADED: WorkflowStage.QUOTATION_UPLOADED,
	APPROVED: WorkflowStage.APPROVED,
	IOM_GENERATED: WorkflowStage.IOM_GENERATED,
	CLOSED: WorkflowStage.CLOSED,
};

const RequestDetailsPage = () => {
	const { user } = useAuth();
	const { currentStage, setCurrentStage } = useWorkflow();
	const params = useParams();
	const id = params.id as string;

	const [requestDetails, setRequestDetails] = useState<RequestDetails | null>(
		null,
	);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const [areFilesUploaded, setFilesUploadedProp] = useState(false);
	const [isVendorFormVisible, setIsVendorFormVisible] = useState(true);
	const [isIomActionsVisible, setIsIomActionsVisible] = useState(true);

	useEffect(() => {
		if (id) {
			const fetchRequestDetails = async () => {
				try {
					setLoading(true);
					const response = await get<ApiResponse>(`data/${id}`);
					setRequestDetails(response.data);
					if (response.data.stageId) {
						const workflowStage =
							stageIdToWorkflowStage[response.data.stageId];
						if (workflowStage) {
							setCurrentStage(workflowStage);
						}
					}
					console.log(response.data);
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
		stageId,
	} = requestDetails;

	// The API returns scopeOfWork as a single string, but the UI expects an array.
	// We'll use the description and split it by newlines for the list display.
	const scopeOfWorkList = description ? description.split("\\n") : [];

	console.log(user?.role);

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
			{!isDone &&
				currentStage === WorkflowStage.QUOTATION_UPLOADED &&
				user?.role === UserRole.IOM && (
					<>
						<section className="bg-white shadow rounded-lg p-6">
							<h2 className="text-xl font-semibold text-blue-600 mb-4">
								Upload Quotations
							</h2>
							<UploadAnalyze uploadFiles={setFilesUploadedProp} />
						</section>

						<section>
							{isVendorFormVisible && areFilesUploaded && (
								<VendorForm
									requestID={requestDetails.requestId.toString()}
									onFormSubmit={() =>
										setIsVendorFormVisible(false)
									}
								/>
							)}
						</section>
					</>
				)}

			{/* Section 4: Take an Action */}
			{!isDone &&
				(user?.role === UserRole.AVP || user?.role === UserRole.CTO) &&
				(currentStage === WorkflowStage.REVIEWED ||
					currentStage === WorkflowStage.APPROVED) && (
					<section>
						<ActionButtons requestId={id} />
					</section>
				)}

			{/* Section 5: Approval Timeline */}
			{!isDone &&
				currentStage === WorkflowStage.IOM_GENERATED &&
				user?.role === UserRole.CTO &&
				isIomActionsVisible && (
					<IOMActions
						requestId={id}
						onClose={() => setIsIomActionsVisible(false)}
					/>
				)}
		</div>
	);
};

export default RequestDetailsPage;
