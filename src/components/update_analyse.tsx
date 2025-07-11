"use client";

import Chatbot from "@/components/chatbot"; // adjust path if needed
import api from "@/lib/api";
import { useRef, useState } from "react";

type UploadAnalyzeProps = {
	uploadFiles: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UploadAnalyze({ uploadFiles }: UploadAnalyzeProps) {
	const [files, setFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [areFilesUploaded, setFilesUploaded] = useState(false);
	const [showChatbot, setShowChatbot] = useState(false);
	const [chatbotMessage, setChatbotMessage] = useState("");
	const [isUploading, setIsUploading] = useState(false);

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			setFiles(Array.from(e.target.files));
		}
	};

	const triggerFilePicker = () => {
		fileInputRef.current?.click();
	};

	const handleUpload = async () => {
		if (files.length < 3) return;
		setIsUploading(true); // Start loader
		try {
			const formData = new FormData();
			formData.append("imoRequestId", "123456");
			files.forEach(file => {
				formData.append("files", file); // backend accepts multiple files under 'files'
			});

			const response = await api.post("files/upload", formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			});

			console.log("Upload successful:", response);
			if (response && (response as any).status === 200) {
				console.log("✅ Upload successful:", response);
				setFilesUploaded(true);
				uploadFiles(true);
			} else {
				console.error(
					"❌ Upload failed with status:",
					(response as any).status,
				);
			}
		} catch (error) {
			console.error("Upload failed:", error);
			alert("Something went wrong! Please try again later.");
		} finally {
			setIsUploading(false); // Stop loader
		}
	};
	const handleAnalyze = async () => {
		console.log("Analyzing files:", files);

		try {
			// Convert files to byte arrays
			const fileByteArrays = await Promise.all(
				files.map(file => {
					return new Promise<Uint8Array>((resolve, reject) => {
						const reader = new FileReader();
						reader.onload = () => {
							const arrayBuffer = reader.result as ArrayBuffer;
							resolve(new Uint8Array(arrayBuffer));
						};
						reader.onerror = () => reject(reader.error);
						reader.readAsArrayBuffer(file);
					});
				}),
			);

			// Send POST request with byte arrays
			const response = await api.post("/files", {
				files: fileByteArrays,
			});

			console.log("Analysis result:", response);
			// Optionally update UI with response
		} catch (error) {
			console.error("Analysis failed:", error);
		}
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
					disabled={files.length < 3 || isUploading}
					className={`flex-1 px-4 py-2 rounded-lg font-medium transition ${
						files.length >= 3 && !isUploading
							? "bg-green-600 text-white hover:bg-green-700"
							: "bg-gray-300 text-gray-500 cursor-not-allowed"
					}`}
				>
					{isUploading ? "Uploading..." : "Upload"}
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

			{/* 🧠 Chatbot Modal */}
			{showChatbot && (
				<div className="fixed inset-0 z-50 bg-white/70 flex items-center justify-center">
					<div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl">
						<button
							className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
							onClick={() => setShowChatbot(false)}
						>
							✖
						</button>
						<Chatbot initialMessage={chatbotMessage} />
					</div>
				</div>
			)}
		</div>
	);
}
