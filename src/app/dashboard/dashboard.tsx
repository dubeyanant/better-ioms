"use client";

import FinancialDashboard from "@/components/financial-dashboard";
import { get } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { UserRole } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Request {
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
	scopeOfWork: string | null;
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

export default function Dashboard() {
	const { user } = useAuth();
	const [requests, setRequests] = useState<Request[]>([]);
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
		setIsClient(true);
		const fetchRequests = async () => {
			try {
				const data = await get<Request[]>("data/getAll");
				setRequests(data);
			} catch (error) {
				console.error("Failed to fetch requests:", error);
			}
		};
		fetchRequests();
	}, []);

	// ✅ Toggle this to false to hide all chatbot logic
	const showChatBotOn = true;

	// ✅ Mobile chatbot modal toggle
	const router = useRouter();
	const createNewRequest = () => {
		router.push("/create");
	};

	function handleRequestClick(id: number): void {
		router.push(`/request_details/${id}`);
	}

	console.log(user?.role);
	return (
		<div>
			{isClient &&
				(user?.role === UserRole.CEO ||
					user?.role === UserRole.CTO) && <FinancialDashboard />}
			<div className="relative h-screen flex flex-col sm:flex-row">
				{/* 🧱 Left section: Dashboard */}
				<div
					className={`p-6 bg-gray-100 overflow-y-auto transition-all duration-300 h-full ${
						showChatBotOn ? "w-full " : "w-full"
					}`}
				>
					{isClient && user?.role === UserRole.ASSOCIATE && (
						<div className="mb-6">
							<h2 className="text-xl font-semibold text-gray-800">
								Create a request
							</h2>
							<button
								type="button"
								onClick={createNewRequest}
								className="w-full mt-2 bg-white border-2 border-dashed border-blue-400 hover:border-blue-500 hover:shadow-md transition p-6 rounded-xl text-center"
							>
								<p className="text-blue-600 font-medium text-base">
									+ New Request
								</p>
							</button>
						</div>
					)}

					<div>
						<h2 className="text-xl font-semibold text-gray-800">
							Created requests
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
							{requests.map(req => (
								<div
									key={req.requestId}
									onClick={() =>
										handleRequestClick(req.requestId)
									}
									className="bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
								>
									<h3 className="text-md font-semibold text-gray-700">
										Title: {req.title}
									</h3>
									<p className="text-sm text-gray-500 mt-1">
										Request ID: {req.requestId}
									</p>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
