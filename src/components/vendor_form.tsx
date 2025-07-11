"use client";

import { useState } from "react";

export default function VendorForm() {
	const [vendorName, setVendorName] = useState("");
	const [selectedOption, setSelectedOption] = useState("");
	const [selectedRadio, setSelectedRadio] = useState("");
	const [justification, setJustification] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Do something with the form values
		console.log({
			vendorName,
			selectedOption,
			selectedRadio,
			justification,
		});
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow space-y-6"
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
					Select Option
				</label>
				<select
					value={selectedOption}
					onChange={e => setSelectedOption(e.target.value)}
					className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
				>
					<option value="">-- Select --</option>
					<option value="option1">Procurement</option>
					<option value="option2">Logistics</option>
					<option value="option3">Maintenance</option>
				</select>
			</div>

			{/* Radio Buttons */}
			<div>
				<label className="block text-sm font-medium text-gray-700 mb-2">
					Select Category
				</label>
				<div className="flex gap-4">
					<label className="flex items-center gap-2">
						<input
							type="radio"
							name="category"
							value="local"
							checked={selectedRadio === "local"}
							onChange={e => setSelectedRadio(e.target.value)}
						/>
						<span className="text-gray-700 text-sm">Local</span>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="radio"
							name="category"
							value="national"
							checked={selectedRadio === "national"}
							onChange={e => setSelectedRadio(e.target.value)}
						/>
						<span className="text-gray-700 text-sm">National</span>
					</label>
					<label className="flex items-center gap-2">
						<input
							type="radio"
							name="category"
							value="international"
							checked={selectedRadio === "international"}
							onChange={e => setSelectedRadio(e.target.value)}
						/>
						<span className="text-gray-700 text-sm">
							International
						</span>
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
				className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
			>
				Submit
			</button>
		</form>
	);
}
