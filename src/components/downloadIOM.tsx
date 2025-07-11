"use client";

type IOMActionsProps = {
	onGenerateIOM?: () => void;
	onCloseTicket?: () => void;
};

export default function IOMActions({
	onGenerateIOM,
	onCloseTicket,
}: IOMActionsProps) {
	return (
		<div className="flex justify-center gap-4 mt-6">
			<button
				onClick={onGenerateIOM}
				className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
			>
				Generate IOM
			</button>

			<button
				onClick={onCloseTicket}
				className="px-6 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition"
			>
				Close Ticket
			</button>
		</div>
	);
}
