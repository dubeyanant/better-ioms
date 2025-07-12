"use client";

import api from "@/lib/api";
import { WorkflowStage } from "@/lib/utils";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { useState } from "react";

type Vendor = {
	name: string;
	productCost: string;
	totalCost: string;
};

type Props = {
	requestID: string;
};

export default function VendorForm(requestID: Props) {
	const [vendors, setVendors] = useState<Vendor[]>([
		{ name: "", productCost: "", totalCost: "" },
		{ name: "", productCost: "", totalCost: "" },
		{ name: "", productCost: "", totalCost: "" },
	]);

	const [selectedOption, setSelectedOption] = useState("");
	const [selectedRadio, setSelectedRadio] = useState("");
	const [justification, setJustification] = useState("");

	const handleVendorChange = (
		index: number,
		field: keyof Vendor,
		value: string,
	) => {
		const updatedVendors = vendors.map((vendor, i) => {
			if (i === index) {
				return { ...vendor, [field]: value };
			}
			return vendor;
		});
		setVendors(updatedVendors);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const payload = {
			vendors,
			selectedOption,
			selectedRadio,
			justification,
		};

		// ✅ Just print in console
		console.log("Form submitted data: ", payload);

		// ✅ Optionally: clear the form
		setVendors([
			{ name: "", productCost: "", totalCost: "" },
			{ name: "", productCost: "", totalCost: "" },
			{ name: "", productCost: "", totalCost: "" },
		]);
		setSelectedOption("");
		setSelectedRadio("");
		setJustification("");

		try {
			const resp = post(
				"https://n8n.dimensiontwo.dev/webhook-test/532a8c8e-c90e-440b-8dfb-4dcc2c260ee1",
				{
					request_id: { requestID },
					stage_id: WorkflowStage.QUOTATION_UPLOADED,
				},
			);
		} catch (error) {}
	};

	async function post<T, D = any>(
		endpoint: string,
		data?: D,
		config?: AxiosRequestConfig,
	): Promise<T> {
		const response: AxiosResponse<T> = await api.post(
			endpoint,
			data,
			config,
		);
		return response.data;
	}

	const approvers = [
		"IT-Production - Arun Kp",
		"IT-Security - Amit Jaokar",
		"IT-Backoffice - Mehul Vora",
		"IT-Channel - Ashokraj",
		"IT-Trading - Rizwan",
		"IT-Middleware - Shatish Babu",
	];

	const isFormValid =
		vendors.every(
			vendor =>
				vendor.name.trim() !== "" &&
				vendor.productCost.trim() !== "" &&
				vendor.totalCost.trim() !== "",
		) &&
		selectedOption.trim() !== "" &&
		selectedRadio.trim() !== "" &&
		justification.trim() !== "";

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full p-6 bg-white rounded-xl shadow space-y-6"
		>
			<h2 className="text-xl font-semibold text-blue-600">
				Vendor Details Form
			</h2>

			{/* Vendor details in a row */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{vendors.map((vendor, index) => (
					<div
						key={index}
						className="p-4 border border-gray-200 rounded-lg space-y-4"
					>
						<h3 className="font-semibold text-gray-800">
							Vendor {index + 1}
						</h3>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Vendor Name
							</label>
							<input
								type="text"
								value={vendor.name}
								onChange={e =>
									handleVendorChange(
										index,
										"name",
										e.target.value,
									)
								}
								className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
								placeholder="Enter vendor name"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Product Cost
							</label>
							<input
								type="text"
								value={vendor.productCost}
								onChange={e =>
									handleVendorChange(
										index,
										"productCost",
										e.target.value,
									)
								}
								className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
								placeholder="Enter product cost"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium text-gray-700 mb-1">
								Total Cost
							</label>
							<input
								type="text"
								value={vendor.totalCost}
								onChange={e =>
									handleVendorChange(
										index,
										"totalCost",
										e.target.value,
									)
								}
								className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:outline-none"
								placeholder="Enter total cost"
							/>
						</div>
					</div>
				))}
			</div>

			{/* Common Fields */}
			<div className="space-y-6 pt-6 border-t border-gray-200">
				{/* Dropdown */}
				<div>
					<label className="block text-sm font-medium text-gray-700 mb-1">
						Select Cost Center
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
						Select Vendor
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
			</div>

			{/* Submit */}
			<button
				type="submit"
				disabled={!isFormValid}
				className={`w-2/4 md:w-1/4 block mx-auto py-2 text-white rounded-lg transition ${
					isFormValid
						? "bg-blue-600 hover:bg-blue-700"
						: "bg-gray-400 cursor-not-allowed"
				}`}
			>
				Submit
			</button>
		</form>
	);
}
