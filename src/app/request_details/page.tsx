"use client";

import ActionButtons from "@/components/ui/ActionButtons";
import WorkflowStatus from "@/components/ui/status_workflow";
import UploadAnalyze from "@/components/update_analyse";
import VendorForm from "@/components/vendor_form";
import { WorkflowStage } from "@/lib/utils";
import React, { useState } from "react";

const RequestDetailsPage = () => {
	// 📦 Replace these with real data (from props, context, or API)
	const requestCreatedBy = "John Doe";
	const department = "IT Department";
	const createdAt = "2025-07-11 10:00 AM";
	const scopeOfWork = [
		"Setup VPN access for remote workers.",
		"Configure firewall rules for new servers.",
		"Perform security audit and submit report.",
		"Integrate SSO with internal applications.",
		"Test deployment scripts on staging environment.",
		"Migrate legacy systems to new architecture.",
		"Implement CI/CD pipeline for microservices.",
		"Schedule weekly reviews with IT head.",
	];

	const approvalTimeline = [
		{
			stage: "Stage 1",
			approver: "Jane Smith",
			time: "2025-07-11 at 11:00 AM",
			status: "Approved",
		},
		{
			stage: "Stage 2",
			approver: "Michael Lee",
			time: "2025-07-11 at 01:30 PM",
			status: "Approved",
		},
		{ stage: "Stage 3", approver: "", time: "", status: "Pending" },
	];

	const [areFilesUploaded, setFilesUploadedProp] = useState(false);

	const handleGenerateIOM = () => {
		console.log("✅ Generating IOM...");
		// Add logic to generate IOM
	};

	const handleCloseTicket = () => {
		console.log("❌ Closing ticket...");
		// Add logic to close the ticket
	};

	return (
		<div className="min-h-screen bg-gray-50 p-6 space-y-8">
			{/* Section 1: Request Info */}
			<section className="bg-white shadow rounded-lg p-6 space-y-4">
				<h2 className="text-xl font-semibold text-blue-600">
					Request Details
				</h2>
				<div className="space-y-2 text-gray-700 text-sm">
					<p>
						<strong>Request Created By:</strong> {requestCreatedBy}
					</p>
					<p>
						<strong>Department:</strong> {department}
					</p>
					<p>
						<strong>Time:</strong> {createdAt}
					</p>
					<div>
						<strong>Scope of Work:</strong>
						<ul className="list-disc ml-5 mt-1 text-gray-600">
							{scopeOfWork.map((line, idx) => (
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
				<WorkflowStatus
					currentStage={WorkflowStage.QUOTATION_UPLOADED}
				/>
			</section>

			<section className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-semibold text-blue-600 mb-4">
					Upload Quotations
				</h2>
				<UploadAnalyze uploadFiles={setFilesUploadedProp} />
			</section>

			<section>{areFilesUploaded && <VendorForm />}</section>

			<section>
				<ActionButtons />
			</section>

			{/* Section 3: Approval Timeline */}
			<section className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-semibold text-blue-600 mb-4">
					Approval Timeline
				</h2>
				<ul className="space-y-3 text-sm text-gray-700">
					{approvalTimeline.map(
						({ stage, approver, time, status }, idx) => (
							<li key={idx}>
								<strong>{stage}:</strong>{" "}
								{status === "Pending"
									? "Pending"
									: `Approved by ${approver} on ${time}`}
							</li>
						),
					)}
				</ul>
			</section>

			{/* ...Other sections like Request Details, Upload, Approval, etc... */}

			{/* ✅ Final Section with Buttons */}
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
		</div>
	);
};

export default RequestDetailsPage;
