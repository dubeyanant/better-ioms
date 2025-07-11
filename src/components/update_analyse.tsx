"use client";

import { useRef, useState } from "react";

type UploadAnalyzeProps = {
	uploadFiles: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UploadAnalyze({ uploadFiles }: UploadAnalyzeProps) {
	const [files, setFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [areFilesUploaded, setFilesUploaded] = useState(false);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFiles(Array.from(e.target.files));
		}
	};

	const triggerFilePicker = () => {
		fileInputRef.current?.click();
	};

	const handleUpload = () => {
		// Replace with actual upload logic
		console.log("Uploading to server:", files);
		setFilesUploaded(true);
		uploadFiles(true); // ✅ correctly update parent state
	};

	const handleAnalyze = () => {
		console.log("Analyzing files:", files);
	};

	return (
		<div className="w-full max-w-xl mx-auto p-6 bg-white rounded-xl shadow-lg space-y-4">
			<h2 className="text-xl font-semibold text-blue-600">
				📤 Upload Files for Analysis
			</h2>

			<input
				type="file"
				multiple
				ref={fileInputRef}
				onChange={handleFileSelect}
				className="hidden"
			/>

			<button
				type="button"
				onClick={triggerFilePicker}
				className="w-full text-blue-600 border-2 border-dashed border-blue-400 bg-blue-50 hover:bg-blue-100 transition p-6 rounded-lg text-center font-medium"
			>
				Click to select or drag & drop files here
			</button>

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
				</div>
			)}

			<div className="flex gap-4">
				<button
					type="button"
					onClick={handleUpload}
					disabled={files.length < 3}
					className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
						files.length >= 3
							? "bg-green-600 text-white hover:bg-green-700"
							: "bg-gray-300 text-gray-500 cursor-not-allowed"
					}`}
				>
					Upload to Server
				</button>

				<button
					type="button"
					onClick={handleAnalyze}
					disabled={!areFilesUploaded}
					className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
						files.length >= 3 && areFilesUploaded
							? "bg-blue-600 text-white hover:bg-blue-700"
							: "bg-gray-300 text-gray-500 cursor-not-allowed"
					}`}
				>
					Analyze
				</button>
			</div>
		</div>
	);
}
