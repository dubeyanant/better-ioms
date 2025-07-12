// components/ParsedHtmlViewer.tsx
"use client";

import React from "react";

type Props = {
	html: string;
	onClose: () => void;
};

export default function ParsedHtmlViewer({ html, onClose }: Props) {
	return (
		<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
			<div className="bg-white max-w-3xl w-full p-6 rounded-lg shadow-xl overflow-auto max-h-[90vh]">
				<div className="flex justify-end mb-2">
					<button
						onClick={onClose}
						className="text-gray-600 hover:text-gray-900"
					>
						✖
					</button>
				</div>
				<div
					className="prose prose-sm overflow-x-auto"
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
		</div>
	);
}
