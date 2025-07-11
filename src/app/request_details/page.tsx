"use client";
import WorkflowStatus from "@/components/ui/status_workflow";
// Make sure this points to your actual workflow tracker
import React from "react";

const RequestDetailsPage = () => {
	return (
		<div className="min-h-screen bg-gray-50 p-6 space-y-8">
			{/* Section 1: Request Info */}
			<section className="bg-white shadow rounded-lg p-6 space-y-4">
				<h2 className="text-xl font-semibold text-blue-600">
					Request Details
				</h2>
				<div className="space-y-2 text-gray-700 text-sm">
					<p>
						<strong>Request Created By:</strong> John Doe
					</p>
					<p>
						<strong>Department:</strong> IT Department
					</p>
					<p>
						<strong>Time:</strong> 2025-07-11 10:00 AM
					</p>
					<div>
						<strong>Scope of Work:</strong>
						<p className="mt-1 text-gray-600 whitespace-pre-line">
							{`1. Setup VPN access for remote workers.
2. Configure firewall rules for new servers.
3. Perform security audit and submit report.
4. Integrate SSO with internal applications.
5. Test deployment scripts on staging environment.
6. Migrate legacy systems to new architecture.
7. Implement CI/CD pipeline for microservices.
8. Schedule weekly reviews with IT head.`}
						</p>
					</div>
				</div>
			</section>

			{/* Section 2: Workflow Tracker */}
			<section className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-semibold text-blue-600 mb-4">
					Workflow Progress
				</h2>
				<WorkflowStatus
					stages={[
						"Request",
						"ProofReading",
						"Processing",
						"Purchase",
					]}
					currentStage={"Processing"}
				/>
			</section>

			{/* Section 3: Approval Timeline */}
			<section className="bg-white shadow rounded-lg p-6">
				<h2 className="text-xl font-semibold text-blue-600 mb-4">
					Approval Timeline
				</h2>
				<ul className="space-y-3 text-sm text-gray-700">
					<li>
						<strong>Stage 1:</strong> Approved by Jane Smith on
						2025-07-11 at 11:00 AM
					</li>
					<li>
						<strong>Stage 2:</strong> Approved by Michael Lee on
						2025-07-11 at 01:30 PM
					</li>
					<li>
						<strong>Stage 3:</strong> Pending
					</li>
				</ul>
			</section>
		</div>
	);
};

export default RequestDetailsPage;
