"use client";

import { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";

type CompletionDialogProps = {
	open: boolean;
	serviceTitle: string;
	startingAmount: number;
	onOpenChange: (open: boolean) => void;
	onConfirm: (finalAmount: number) => Promise<void>;
};

export function CompletionDialog({
	open,
	serviceTitle,
	startingAmount,
	onOpenChange,
	onConfirm,
}: CompletionDialogProps) {
	const dialogRef = useRef<HTMLDialogElement>(null);
	const titleId = useId();
	const descriptionId = useId();
	const [finalAmount, setFinalAmount] = useState(startingAmount);
	const [submitting, setSubmitting] = useState(false);

	useEffect(() => {
		const dialog = dialogRef.current;
		if (!dialog) return;

		if (open) {
			if (!dialog.open) dialog.showModal();
		} else if (dialog.open) {
			dialog.close();
		}
	}, [open]);

	const closeDialog = () => {
		if (!submitting) onOpenChange(false);
	};

	const handleConfirm = async () => {
		if (!Number.isFinite(finalAmount) || finalAmount < 0) return;
		setSubmitting(true);
		try {
			await onConfirm(finalAmount);
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<dialog
			ref={dialogRef}
			aria-labelledby={titleId}
			aria-describedby={descriptionId}
			onCancel={(event) => {
				event.preventDefault();
				closeDialog();
			}}
			onClose={() => {
				if (open) onOpenChange(false);
			}}
			className="m-auto w-[calc(100%-2rem)] max-w-[400px] rounded-2xl border border-border bg-card p-0 text-card-foreground shadow-2xl backdrop:bg-black/50"
		>
			<div className="p-5 sm:p-6">
				<div className="flex items-start justify-between gap-4">
					<h2 id={titleId} className="text-xl font-bold tracking-tight">
						Mark job completed
					</h2>
					<button
						type="button"
						aria-label="Close completion dialog"
						onClick={closeDialog}
						disabled={submitting}
						className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
					>
						<X className="size-4" aria-hidden="true" />
					</button>
				</div>

				<p id={descriptionId} className="mt-3 text-sm leading-6 text-muted-foreground">
					Set the final price for <span className="font-semibold text-card-foreground">{serviceTitle}</span>.
					The customer pays this amount.
				</p>

				<label className="mt-5 block text-sm font-bold" htmlFor="final-amount">
					Final amount (USD)
				</label>
				<input
					id="final-amount"
					type="number"
					min="0"
					step="0.01"
					value={finalAmount}
					onChange={(event) => setFinalAmount(Number(event.target.value))}
					className="mt-2 h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-card-foreground outline-none focus:border-ring focus:ring-2 focus:ring-ring/20"
				/>
				<p className="mt-2 text-xs text-muted-foreground">
					Starting price was ${startingAmount.toFixed(0)}.
				</p>

				<div className="mt-6 flex justify-end gap-2">
					<button
						type="button"
						onClick={closeDialog}
						disabled={submitting}
						className="h-10 cursor-pointer rounded-lg border border-border px-4 text-sm font-bold transition-colors hover:bg-accent disabled:opacity-50"
					>
						Cancel
					</button>
					<button
						type="button"
						onClick={handleConfirm}
						disabled={submitting || !Number.isFinite(finalAmount) || finalAmount < 0}
						className="h-10 cursor-pointer rounded-lg bg-[#ed6818] px-4 text-sm font-bold text-white transition-colors hover:bg-[#d85b11] disabled:cursor-not-allowed disabled:opacity-60"
					>
						{submitting ? "Saving..." : "Mark completed"}
					</button>
				</div>
			</div>
		</dialog>
	);
}
