"use client";

import Chatbot from "@/components/chatbot";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Request {
	id: number;
	title: string;
	description: string;
}

export default function Dashboard() {
	const [requests, setRequests] = useState<Request[]>([
		{ id: 1, title: "Ticket ID: 1", description: "Pending" },
		{ id: 2, title: "Ticket ID: 2", description: "Completed" },
	]);

	// ✅ Toggle this to false to hide all chatbot logic
	const showChatBotOn = true;

	// ✅ Mobile chatbot modal toggle
	const [showChatbotMobile, setShowChatbotMobile] = useState(false);
	const router = useRouter();
	const createNewRequest = () => {
		const newId = requests.length + 1;
		const newRequest = {
			id: newId,
			title: `Ticket ID: ${String.fromCharCode(64 + newId)}`,
			description: `Processing`,
		};

		router.push("/create");
		setRequests([...requests, newRequest]);
	};

	function handleRequestClick(id: number): void {
		router.push(`/request_details`);
	}

	return (
		<div className="relative h-screen flex flex-col sm:flex-row">
			{/* 🧱 Left section: Dashboard */}
			<div
				className={`p-6 bg-gray-100 overflow-y-auto transition-all duration-300 h-full ${
					showChatBotOn ? "w-full sm:w-[70%]" : "w-full"
				}`}
			>
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

				<div>
					<h2 className="text-xl font-semibold text-gray-800">
						Created requests
					</h2>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-2">
						{requests.map(req => (
							<div
								key={req.id}
								onClick={() => handleRequestClick(req.id)}
								className="bg-white p-4 rounded-lg shadow hover:shadow-md transition
								"
							>
								<h3 className="text-md font-semibold text-gray-700">
									{req.title}
								</h3>
								<p className="text-sm text-gray-500 mt-1">
									{req.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* 🧱 Right section: Chatbot (only if showChatBotOn = true) */}
			{showChatBotOn && (
				<>
					{/* Desktop Sidebar Chatbot */}
					<div className="hidden sm:block w-[30%] h-full">
						<Chatbot />
					</div>

					{/* FAB on Mobile */}
					<button
						type="button"
						onClick={() => setShowChatbotMobile(true)}
						className="fixed bottom-6 right-6 z-50 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition sm:hidden"
					>
						💬
					</button>

					{/* Mobile Chatbot Modal */}
					{showChatbotMobile && (
						<div className="fixed inset-0 z-40 bg-white flex flex-col sm:hidden">
							<div className="flex justify-between items-center p-4 border-b text-lg font-semibold text-blue-600">
								<span>🤖 Chatbot</span>
								<button
									type="button"
									onClick={() => setShowChatbotMobile(false)}
									className="text-sm text-blue-500 hover:underline"
								>
									Close
								</button>
							</div>
							<div className="flex-1">
								<Chatbot />
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
}
