"use client";

import { request } from "http";
import Chatbot from "@/components/chatbot"; // adjust path if needed
import api from "@/lib/api";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { useRef, useState } from "react";
import ParsedHtmlViewer from "./parsedHtml";

type UploadAnalyzeProps = {
	uploadFiles: React.Dispatch<React.SetStateAction<boolean>>;
	requestID: string;
};

export default function UploadAnalyze({
	uploadFiles,
	requestID,
}: UploadAnalyzeProps) {
	const [files, setFiles] = useState<File[]>([]);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [areFilesUploaded, setFilesUploaded] = useState(false);
	const [showChatbot, setShowChatbot] = useState(false);
	const [chatbotMessage, setChatbotMessage] = useState("");
	const [isUploading, setIsUploading] = useState(false);
	const [isUploaded, setIsUploaded] = useState(false);

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
			console.log("request id: ", requestID);
			formData.append("imoRequestId", requestID);
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
				setIsUploaded(true);
			} else {
				console.error(
					"❌ Upload failed with status:",
					(response as any).status,
				);
				setIsUploaded(false);
			}
		} catch (error) {
			console.error("Upload failed:", error);
			alert("Something went wrong! Please try again later.");
			setIsUploaded(false);
		} finally {
			setIsUploading(false); // Stop loader
		}
	};

	const [showViewer, setShowViewer] = useState(false);
	const [safeHtml, setSafeHtml] = useState("");
	const [isLoading, showLoader] = useState(false);

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

	const handleAnalyze = async () => {
		var responseMessage =
			"Here is a comparison of the vendor quotations:\n\n| Vendor | Cost (INR) | GST | Freight Charges | Delivery Time |\n| :--- | :--- | :--- | :--- | :--- |\n| Astute Systems | 6300 | Not Specified | Not Mentioned | 1-2 working days |\n| Micropoint Computers | 6500 | 18% | Extra at actuals | 6-8 days |\n| OnlineTekSupport | 7000 | 18% | Not Mentioned | Not Mentioned |\n\n*Suggestion:\n\nI recommend approving the quotation from **Astute Systems Private Limited.\n\nJustification:\n\n   *Cost:* Astute Systems offers the lowest base price of Rs 6300, making it the most cost-effective option.\n*   *Delivery Time:* They have the fastest delivery time of 1-2 working days, which is significantly better than the 6-8 days offered by Micropoint Computers.\n*   *Overall Value:* While the GST and freight charges are not explicitly mentioned, the significantly lower cost and faster delivery time make Astute Systems the most advantageous choice. It is advisable to confirm the final cost, including GST and any potential freight charges, before finalizing the order.";
		console.log("analyze entered", requestID);
		// const resp = await post("https://n8n.dimensiontwo.dev/webhook-test/61ae3081-f404-4cb7-860b-415e3d3c16f5", {
		// 	"request_id": requestID,
		// });

		// 2. Ensure `resp.data` or `resp.text` is used if needed

		console.log("response text:", responseMessage);
		// 3. Convert Markdown to HTML and sanitize
		const unsafeHtml = await marked.parse(responseMessage);
		const cleanedHtml = DOMPurify.sanitize(unsafeHtml);
		showLoader(true);
		setTimeout(() => {
			setSafeHtml(cleanedHtml);
			console.log("Safe HTML:", safeHtml);
			setShowViewer(true);
			showLoader(false); // Show popup
		}, 15000);
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

			{/* Show loading spinner during delay */}
			{isLoading && (
				<div className="mt-6 text-center">
					<div className="loader mx-auto border-4 border-t-4 border-blue-500 rounded-full w-12 h-12 animate-spin" />
					<p className="mt-2 text-gray-600">
						Analyzing... Please wait
					</p>
				</div>
			)}

			<div className="flex gap-4">
				<button
					type="button"
					onClick={handleUpload}
					disabled={files.length < 3 || isUploading || isUploaded}
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
					<div className="relative w-full max-w-3xl bg-white rounded-xl shadow-2xl">
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

			<div className="p-10">
				{showViewer && (
					<ParsedHtmlViewer
						html={safeHtml}
						onClose={() => setShowViewer(false)}
					/>
				)}
			</div>
		</div>
	);
}
