"use client";

import { useState } from "react";
import VendorForm from "./vendor_form";

export default function UploadAnalyze() {
	const [files, setFiles] = useState<File[]>([]);
	const [showVendorForm, setShowVendorForm] = useState(false);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFiles(Array.from(e.target.files));
		}
	};

	const handleAnalyze = () => {
		console.log("Analyzing files:", files);
		setShowVendorForm(true);
	};

	return (
		<>
			<div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4">
				<h2 className="text-xl font-semibold text-blue-600">
					📤 Upload Files for Analysis
				</h2>

				<label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 hover:border-blue-500 transition bg-blue-50 hover:bg-blue-100 p-6 rounded-lg cursor-pointer text-center">
					<input
						type="file"
						multiple
						onChange={handleFileChange}
						className="hidden"
					/>
					<p className="text-blue-600 font-medium">
						Click to upload or drag & drop files here
					</p>
					<p className="text-sm text-gray-500 mt-1">
						Minimum 3 files required
					</p>
				</label>

				{files.length > 0 && (
					<div className="space-y-2">
						<h3 className="text-sm font-semibold text-gray-700">
							Selected Files:
						</h3>
						<ul className="list-disc list-inside text-sm text-gray-600 max-h-40 overflow-y-auto">
							{files.map((file, index) => (
								<li key={index}>{file.name}</li>
							))}
						</ul>

						<button
							onClick={handleAnalyze}
							disabled={files.length < 3}
							className={`mt-4 px-6 py-2 rounded-lg transition font-medium ${
								files.length >= 3
									? "bg-blue-600 text-white hover:bg-blue-700"
									: "bg-gray-300 text-gray-500 cursor-not-allowed"
							}`}
						>
							Analyze
						</button>
					</div>
				)}
			</div>

			{/* 🔍 VendorForm Modal */}
			{showVendorForm && (
				<div className="fixed inset-0 z-50 bg-white/50 backdrop-blur-sm flex items-center justify-center p-4">
					<div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl p-6 relative">
						<button
							onClick={() => setShowVendorForm(false)}
							className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
						>
							×
						</button>
						<VendorForm />
					</div>
				</div>
			)}
		</>
	);
}
