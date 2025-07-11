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
import { useState } from "react";

// Sample data structure - replace with your actual data
const categoryData = {
	technology: [
		{ value: "software", label: "Software Development" },
		{ value: "hardware", label: "Hardware Support" },
		{ value: "network", label: "Network Issues" },
	],
	marketing: [
		{ value: "social", label: "Social Media" },
		{ value: "content", label: "Content Creation" },
		{ value: "advertising", label: "Advertising" },
	],
	finance: [
		{ value: "budget", label: "Budget Planning" },
		{ value: "expenses", label: "Expense Management" },
		{ value: "reporting", label: "Financial Reporting" },
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

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		console.log("Form submitted:", formData);
		// Handle form submission here
	};

	const secondaryOptions = formData.primaryCategory
		? categoryData[formData.primaryCategory as CategoryKey] || []
		: [];

	const isFormValid =
		formData.primaryCategory &&
		formData.secondaryCategory &&
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
							Select a category and subcategory to get started.
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
										<SelectItem value="technology">
											Technology
										</SelectItem>
										<SelectItem value="marketing">
											Marketing
										</SelectItem>
										<SelectItem value="finance">
											Finance
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
									disabled={!formData.primaryCategory}
								>
									<SelectTrigger>
										<SelectValue
											placeholder={
												formData.primaryCategory
													? "Select a secondary category"
													: "Select primary category first"
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
								disabled={!isFormValid}
							>
								Create Request
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
