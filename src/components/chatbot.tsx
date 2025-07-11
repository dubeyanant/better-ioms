"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
	id: string;
	role: "user" | "bot";
	text: string;
}

export default function Chatbot() {
	const [messages, setMessages] = useState<Message[]>([
		{
			id: crypto.randomUUID(),
			role: "bot",
			text: "Hello! How can I help you today?",
		},
	]);

	const [input, setInput] = useState("");
	const bottomRef = useRef<HTMLDivElement>(null);

	const sendMessage = (e: React.FormEvent) => {
		e.preventDefault();
		if (!input.trim()) return;

		const userMessage: Message = {
			id: crypto.randomUUID(),
			role: "user",
			text: input.trim(),
		};

		const botReply: Message = {
			id: crypto.randomUUID(),
			role: "bot",
			text: "🤖 Static reply for now.",
		};

		setMessages(prev => [...prev, userMessage, botReply]);
		setInput("");
	};

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages]);

	return (
		<div className="w-full h-full flex flex-col bg-white shadow-2xl">
			<header className="text-lg font-semibold text-center text-blue-600 py-4 border-b border-gray-200">
				🤖 Chatbot
			</header>

			<main className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-gray-50">
				{messages.map(msg => (
					<div
						key={msg.id}
						className={`max-w-[75%] px-4 py-2 text-sm rounded-lg break-words ${
							msg.role === "user"
								? "bg-blue-500 text-white ml-auto"
								: "bg-gray-200 text-gray-800 mr-auto"
						}`}
					>
						{msg.text}
					</div>
				))}
				<div ref={bottomRef} />
			</main>

			<form
				onSubmit={sendMessage}
				className="flex items-center gap-2 px-4 py-3 border-t border-gray-200 bg-white"
			>
				<input
					type="text"
					className="flex-1 px-4 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
					placeholder="Type a message..."
					value={input}
					onChange={e => setInput(e.target.value)}
				/>
				<button
					type="submit"
					className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition"
				>
					Send
				</button>
			</form>
		</div>
	);
}
