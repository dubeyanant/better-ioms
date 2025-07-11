"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { post } from "@/lib/api";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Sample data structure - replace with your actual data
const categoryData = {
	hardware: [
		{ value: "desktop", label: "Desktop Computers" },
		{ value: "laptop", label: "Laptops" },
		{ value: "server", label: "Servers" },
		{ value: "network", label: "Network Equipment" },
		{ value: "peripherals", label: "Peripherals" },
	],
	software: [
		{ value: "development", label: "Software Development" },
		{ value: "maintenance", label: "Software Maintenance" },
		{ value: "licensing", label: "Software Licensing" },
		{ value: "integration", label: "System Integration" },
		{ value: "testing", label: "Testing & QA" },
	],
	"human resource": [
		{ value: "disabled", label: "No sub-categories available" },
	],
};

type CategoryKey = keyof typeof categoryData;

interface FormData {
	primaryCategory: string;
	secondaryCategory: string;
	title: string;
	description: string;
}

export default function RequestForm() {
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [formData, setFormData] = useState<FormData>({
		primaryCategory: "",
		secondaryCategory: "",
		title: "",
		description: "",
	});

	const handlePrimaryCategoryChange = (value: string) => {
		setFormData(prev => ({
			...prev,
			primaryCategory: value,
			secondaryCategory: "", // Reset secondary when primary changes
		}));
	};

	const handleSecondaryCategoryChange = (value: string) => {
		setFormData(prev => ({
			...prev,
			secondaryCategory: value,
		}));
	};

	const handleInputChange = (field: keyof FormData, value: string) => {
		setFormData(prev => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!isFormValid) {
			return;
		}
		setIsSubmitting(true);
		const requestData = {
			title: formData.title,
			category: formData.primaryCategory,
			sub_category: formData.secondaryCategory,
			desc: formData.description,
		};
		try {
			const response = await post<{
				message: string;
				status: number;
				// biome-ignore lint/suspicious/noExplicitAny: <explanation>
				data: any[];
			}>("iom-create", requestData);

			if (response.status === 200) {
				alert(response.message);
				router.push("/request_details");
			} else {
				alert(`Error: ${response.message}`);
			}
		} catch (error) {
			console.error("Submission error:", error);
			alert("An unexpected error occurred. Please try again later.");
		} finally {
			setIsSubmitting(false);
		}
	};

	const secondaryOptions = formData.primaryCategory
		? categoryData[formData.primaryCategory as CategoryKey] || []
		: [];

	const isSecondaryDisabled = formData.primaryCategory === "human resource";

	const isFormValid =
		formData.primaryCategory &&
		(isSecondaryDisabled || formData.secondaryCategory) &&
		formData.title.trim() &&
		formData.description.trim();

	return (
		<div className="min-h-screen bg-background p-4">
			<div className="mx-auto max-w-2xl">
				<Card>
					<CardHeader>
						<CardTitle>Create New Request</CardTitle>
						<CardDescription>
							Fill out the form below to create a new request.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-6">
							{/* Primary Selector */}
							<div className="space-y-2">
								<Label htmlFor="primary-category">
									Primary Category
								</Label>
								<Select
									value={formData.primaryCategory}
									onValueChange={handlePrimaryCategoryChange}
								>
									<SelectTrigger>
										<SelectValue placeholder="Select a primary category" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="hardware">
											Hardware
										</SelectItem>
										<SelectItem value="software">
											Software
										</SelectItem>
										<SelectItem value="human resource">
											Human Resource
										</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Secondary Selector */}
							<div className="space-y-2">
								<Label htmlFor="secondary-category">
									Secondary Category
								</Label>
								<Select
									value={formData.secondaryCategory}
									onValueChange={
										handleSecondaryCategoryChange
									}
									disabled={
										!formData.primaryCategory ||
										isSecondaryDisabled
									}
								>
									<SelectTrigger>
										<SelectValue
											placeholder={
												!formData.primaryCategory
													? "Select primary category first"
													: isSecondaryDisabled
														? "No sub-categories available"
														: "Select a secondary category"
											}
										/>
									</SelectTrigger>
									<SelectContent>
										{secondaryOptions.map(option => (
											<SelectItem
												key={option.value}
												value={option.value}
											>
												{option.label}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>

							{/* SCOPE OF WORK Heading */}
							<div className="pt-4">
								<h3 className="text-lg font-semibold text-foreground">
									SCOPE OF WORK
								</h3>
							</div>

							{/* Title Field */}
							<div className="space-y-2">
								<Label htmlFor="title">Title</Label>
								<Input
									id="title"
									type="text"
									placeholder="Enter request title"
									value={formData.title}
									onChange={e =>
										handleInputChange(
											"title",
											e.target.value,
										)
									}
								/>
							</div>

							{/* Description Field */}
							<div className="space-y-2">
								<Label htmlFor="description">Description</Label>
								<Textarea
									id="description"
									placeholder="Provide a detailed description of your request"
									value={formData.description}
									onChange={e =>
										handleInputChange(
											"description",
											e.target.value,
										)
									}
									className="min-h-[120px]"
								/>
							</div>

							{/* Submit Button */}
							<Button
								type="submit"
								className="w-full"
								disabled={!isFormValid || isSubmitting}
							>
								{isSubmitting
									? "Creating Request..."
									: "Create Request"}
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
