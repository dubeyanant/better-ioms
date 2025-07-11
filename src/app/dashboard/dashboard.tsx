"use client";

import { useState } from "react";

interface Request {
	id: number;
	title: string;
	description: string;
}

export default function Dashboard() {
	const [requests, setRequests] = useState<Request[]>([
		{ id: 1, title: "Request A", description: "Initial test request A" },
		{ id: 2, title: "Request B", description: "Initial test request B" },
	]);

	const createNewRequest = () => {
		const newId = requests.length + 1;
		const newRequest = {
			id: newId,
			title: `Request ${String.fromCharCode(64 + newId)}`,
			description: `Auto-generated request ${newId}`,
		};
		setRequests([...requests, newRequest]);
	};

	return (
		<div className="min-h-screen bg-gray-100 p-6">
			<div className="max-w-4xl mx-auto space-y-6">
				{/* Label: Create a request */}
				<h2 className="text-xl font-semibold text-gray-800">
					Create a request
				</h2>

				{/* Card-style Button */}
				<button
					type="button"
					onClick={createNewRequest}
					className="w-full bg-white border-2 border-dashed border-blue-400 hover:border-blue-500 hover:shadow-md transition p-6 rounded-xl text-center"
				>
					<p className="text-blue-600 font-medium text-base">
						+ New Request
					</p>
				</button>

				{/* Label: Created Requests */}
				<h2 className="text-xl font-semibold text-gray-800 pt-4">
					Created requests
				</h2>

				{/* Grid of Requests */}
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
					{requests.map(req => (
						<div
							key={req.id}
							className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
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
	);
}
