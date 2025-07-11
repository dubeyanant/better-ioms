"use client";

import { useState } from "react";

export default function VendorForm() {
	const [vendorName, setVendorName] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [selectedRadio, setSelectedRadio] = useState("");
	const [justification, setJustification] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const payload = {
			vendorName,
			selectedOption,
			selectedRadio,
			justification,
		};

		// ✅ Just print in console
		console.log("Form submitted data: ", payload);

		// ✅ Optionally: clear the form
		setVendorName("");
		setSelectedOption("");
		setSelectedRadio("");
		setJustification("");
	};

	const approvers = [
		"IT-Production - Arun Kp",
		"IT-Security - Amit Jaokar",
		"IT-Backoffice - Mehul Vora",
		"IT-Channel - Ashokraj",
		"IT-Trading - Rizwan",
		"IT-Middleware - Shatish Babu",
	];

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full p-6 bg-white rounded-xl shadow space-y-6"
		>
			<h2 className="text-xl font-semibold text-blue-600">
				Vendor Details Form
			</h2>

			{/* Vendor Name */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Vendor Name
				</label>
				<input
					type="text"
					value={vendorName}
					onChange={e => setVendorName(e.target.value)}
					className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
					placeholder="Enter vendor name"
				/>
			</div>

			{/* Dropdown */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Select Approver
				</label>
				<select
					value={selectedOption}
					onChange={e => setSelectedOption(e.target.value)}
					className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				>
					<option value="">-- Select --</option>
					{approvers.map((name, index) => (
						<option key={index} value={name}>
							{name}
						</option>
					))}
				</select>
			</div>

			{/* Radio Buttons */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Select Category
				</label>
				<div className="flex gap-4 flex-wrap">
					<label className="flex items-center gap-2">
						<input
							type="radio"
							name="category"
							value="L1"
							checked={selectedRadio === "L1"}
							onChange={e => setSelectedRadio(e.target.value)}
						/>
						<span className="text-gray-700 text-sm">L1</span>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="radio"
							name="category"
							value="L2"
							checked={selectedRadio === "L2"}
							onChange={e => setSelectedRadio(e.target.value)}
						/>
						<span className="text-gray-700 text-sm">L2</span>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="radio"
							name="category"
							value="L3"
							checked={selectedRadio === "L3"}
							onChange={e => setSelectedRadio(e.target.value)}
						/>
						<span className="text-gray-700 text-sm">L3</span>
					</label>
				</div>
			</div>

			{/* Justification */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-1">
					Justification
				</label>
				<textarea
					rows={4}
					value={justification}
					onChange={e => setJustification(e.target.value)}
					className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
					placeholder="Provide your justification here"
				></textarea>
			</div>

			{/* Submit */}
			<button
				type="submit"
				className="w-2/4 md:w-1/4 block mx-auto py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
			>
				Submit
			</button>
		</form>
	);
}
