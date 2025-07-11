"use client";
import React from "react";

export default function ActionButtons() {
	const handleApprove = () => {
		console.log("Approved!");
	};

	const handleDisapprove = () => {
		console.log("Disapproved!");
	};

	const handleHold = () => {
		console.log("On Hold!");
	};

	return (
		<div className="flex flex-col bg-white shadow rounded-2xl p-6 space-y-6 transition-all">
			<h2 className="text-xl font-semibold text-blue-600 text-center">
				Take an Action
			</h2>

			<div className="flex flex-col sm:flex-row gap-4 w-full">
				<button
					onClick={handleApprove}
					className="flex-1 min-w-[120px] bg-green-500 hover:bg-green-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-300 text-white font-medium py-2.5 px-4 rounded-md shadow transition-all"
				>
					Approve
				</button>
				<button
					onClick={handleDisapprove}
					className="flex-1 min-w-[120px] bg-red-500 hover:bg-red-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-red-300 text-white font-medium py-2.5 px-4 rounded-md shadow transition-all"
				>
					Disapprove
				</button>
				<button
					onClick={handleHold}
					className="flex-1 min-w-[120px] bg-yellow-500 hover:bg-yellow-600 active:scale-95 focus:outline-none focus:ring-2 focus:ring-yellow-300 text-white font-medium py-2.5 px-4 rounded-md shadow transition-all"
				>
					Hold
				</button>
			</div>
		</div>
	);
}
