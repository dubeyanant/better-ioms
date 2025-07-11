"use client";

import { Badge } from "@/components/ui/badge";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ChartContainer,
	ChartLegend,
	ChartLegendContent,
	ChartTooltip,
} from "@/components/ui/chart";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Calendar,
	IndianRupee,
	Target,
	TrendingDown,
	TrendingUp,
} from "lucide-react";
import {
	Cell,
	LabelList,
	Line,
	LineChart,
	Pie,
	PieChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

// Enhanced financial data with precise amounts
const budgetData = [
	{
		name: "Utilized",
		value: 48.75,
		exactAmount: 4875000000, // 48.75 crores in rupees
		fill: "hsl(220, 70%, 50%)",
		description: "Amount spent across all IT departments",
	},
	{
		name: "Remaining",
		value: 101.25,
		exactAmount: 10125000000, // 101.25 crores in rupees
		fill: "hsl(160, 60%, 45%)",
		description: "Available budget for remaining period",
	},
];

const departmentSpending = [
	{
		department: "IT-Production",
		amount: 12.45,
		exactAmount: 1245000000,
		percentage: 25.5,
		projects: 8,
		status: "On Track",
		lastMonthSpend: 1.85,
	},
	{
		department: "IT-Security",
		amount: 8.92,
		exactAmount: 892000000,
		percentage: 18.3,
		projects: 5,
		status: "Under Budget",
		lastMonthSpend: 1.12,
	},
	{
		department: "IT-Backoffice",
		amount: 10.33,
		exactAmount: 1033000000,
		percentage: 21.2,
		projects: 6,
		status: "On Track",
		lastMonthSpend: 1.67,
	},
	{
		department: "IT-Channel",
		amount: 6.78,
		exactAmount: 678000000,
		percentage: 13.9,
		projects: 4,
		status: "Over Budget",
		lastMonthSpend: 0.95,
	},
	{
		department: "IT-Trading",
		amount: 7.15,
		exactAmount: 715000000,
		percentage: 14.7,
		projects: 3,
		status: "On Track",
		lastMonthSpend: 1.23,
	},
	{
		department: "IT-Middleware",
		amount: 3.12,
		exactAmount: 312000000,
		percentage: 6.4,
		projects: 2,
		status: "Under Budget",
		lastMonthSpend: 0.48,
	},
];

// 12 months of detailed spending data
const monthlyTrends = [
	{
		month: "Sep 2023",
		spending: 5.85,
		exactAmount: 585000000,
		budget: 7.2,
		variance: -1.35,
		transactions: 1247,
	},
	{
		month: "Oct 2023",
		spending: 6.92,
		exactAmount: 692000000,
		budget: 7.2,
		variance: -0.28,
		transactions: 1389,
	},
	{
		month: "Nov 2023",
		spending: 7.45,
		exactAmount: 745000000,
		budget: 7.2,
		variance: 0.25,
		transactions: 1456,
	},
	{
		month: "Dec 2023",
		spending: 8.73,
		exactAmount: 873000000,
		budget: 8.5,
		variance: 0.23,
		transactions: 1678,
	},
	{
		month: "Jan 2024",
		spending: 6.28,
		exactAmount: 628000000,
		budget: 6.8,
		variance: -0.52,
		transactions: 1123,
	},
	{
		month: "Feb 2024",
		spending: 7.15,
		exactAmount: 715000000,
		budget: 7.0,
		variance: 0.15,
		transactions: 1334,
	},
	{
		month: "Mar 2024",
		spending: 5.89,
		exactAmount: 589000000,
		budget: 6.5,
		variance: -0.61,
		transactions: 1089,
	},
	{
		month: "Apr 2024",
		spending: 8.34,
		exactAmount: 834000000,
		budget: 8.0,
		variance: 0.34,
		transactions: 1567,
	},
	{
		month: "May 2024",
		spending: 6.97,
		exactAmount: 697000000,
		budget: 7.2,
		variance: -0.23,
		transactions: 1298,
	},
	{
		month: "Jun 2024",
		spending: 7.56,
		exactAmount: 756000000,
		budget: 7.5,
		variance: 0.06,
		transactions: 1445,
	},
	{
		month: "Jul 2024",
		spending: 8.12,
		exactAmount: 812000000,
		budget: 8.0,
		variance: 0.12,
		transactions: 1523,
	},
	{
		month: "Aug 2024",
		spending: 6.49,
		exactAmount: 649000000,
		budget: 6.8,
		variance: -0.31,
		transactions: 1267,
	},
];

const currentMonthComparison = {
	currentMonth: 6.49,
	currentMonthExact: 649000000,
	lastYear: 5.85,
	lastYearExact: 585000000,
	change: 10.94,
	isIncrease: true,
	absoluteDifference: 64000000,
};

// Custom tooltip for pie chart
const CustomPieTooltip = ({ active, payload }: any) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload;
		return (
			<div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg">
				<p className="font-semibold text-gray-900">{data.name}</p>
				<p className="text-sm text-gray-600">{data.description}</p>
				<div className="mt-2 space-y-1">
					<p className="text-lg font-bold text-blue-600">
						₹{data.value} Crores
					</p>
					<p className="text-xs text-gray-500">
						Exact Amount: ₹
						{data.exactAmount.toLocaleString("en-IN")}
					</p>
					<p className="text-xs text-gray-500">
						{((data.value / 150) * 100).toFixed(1)}% of total budget
					</p>
				</div>
			</div>
		);
	}
	return null;
};

// Custom tooltip for line chart
const CustomLineTooltip = ({ active, payload, label }: any) => {
	if (active && payload && payload.length) {
		const data = payload[0].payload;
		return (
			<div className="bg-white p-4 border border-gray-200 rounded-lg shadow-lg min-w-[280px]">
				<p className="font-semibold text-gray-900 mb-2">{label}</p>
				<div className="space-y-2">
					<div className="flex justify-between items-center">
						<span className="text-sm text-gray-600">
							Actual Spending:
						</span>
						<span className="font-bold text-blue-600">
							₹{data.spending} Cr
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-gray-600">
							Exact Amount:
						</span>
						<span className="text-xs text-gray-500">
							₹{data.exactAmount.toLocaleString("en-IN")}
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-gray-600">Budget:</span>
						<span className="text-sm text-gray-700">
							₹{data.budget} Cr
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-gray-600">Variance:</span>
						<span
							className={`text-sm font-medium ${
								data.variance >= 0
									? "text-red-500"
									: "text-green-500"
							}`}
						>
							{data.variance >= 0 ? "+" : ""}₹{data.variance} Cr
						</span>
					</div>
					<div className="flex justify-between items-center">
						<span className="text-sm text-gray-600">
							Transactions:
						</span>
						<span className="text-sm text-gray-700">
							{data.transactions.toLocaleString()}
						</span>
					</div>
				</div>
			</div>
		);
	}
	return null;
};

export default function FinancialDashboard() {
	const totalBudget = 150;
	const utilizedBudget = 48.75;

	// Enhanced pie chart colors
	const pieColors = [
		"hsl(220, 70%, 50%)", // Blue for utilized
		"hsl(160, 60%, 45%)", // Green for remaining
	];

	return (
		<div className="w-full max-w-7xl mx-auto p-6 space-y-8">
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-gray-900">
					IT Department Financial Dashboard
				</h1>
				<p className="text-gray-600 mt-2">
					Comprehensive budget allocation and spending analysis with
					detailed insights
				</p>
				<div className="flex items-center gap-4 mt-4">
					<Badge
						variant="outline"
						className="flex items-center gap-1"
					>
						<Calendar className="h-3 w-3" />
						FY 2023-24
					</Badge>
					<Badge
						variant="outline"
						className="flex items-center gap-1"
					>
						<Target className="h-3 w-3" />
						Budget: ₹{totalBudget} Cr
					</Badge>
					<Badge
						variant="outline"
						className="flex items-center gap-1"
					>
						<IndianRupee className="h-3 w-3" />
						Utilized:{" "}
						{((utilizedBudget / totalBudget) * 100).toFixed(1)}%
					</Badge>
				</div>
			</div>

			{/* First Section: Enhanced Pie Chart and Comparison Card */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Enhanced Pie Chart */}
				<Card className="border-2">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<IndianRupee className="h-5 w-5 text-blue-600" />
							Budget Allocation Overview
						</CardTitle>
						<CardDescription>
							Total Budget: ₹{totalBudget} Crore | Utilized: ₹
							{utilizedBudget} Crore | Exact Utilized: ₹
							{(utilizedBudget * 10000000).toLocaleString(
								"en-IN",
							)}
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ChartContainer
							config={{
								utilized: {
									label: "Utilized",
									color: "hsl(220, 70%, 50%)",
								},
								remaining: {
									label: "Remaining",
									color: "hsl(160, 60%, 45%)",
								},
							}}
							className="aspect-square max-h-[350px]"
						>
							<PieChart>
								<Pie
									data={budgetData}
									dataKey="value"
									nameKey="name"
									cx="50%"
									cy="50%"
									outerRadius={100}
									innerRadius={40}
									paddingAngle={2}
								>
									{budgetData.map((entry, index) => (
										<Cell
											key={`cell-${index}`}
											fill={pieColors[index]}
										/>
									))}
									<LabelList
										dataKey="value"
										className="fill-white font-semibold"
										stroke="none"
										fontSize={14}
										formatter={(value: number) =>
											`₹${value}Cr`
										}
									/>
								</Pie>
								<ChartTooltip content={<CustomPieTooltip />} />
								<ChartLegend content={<ChartLegendContent />} />
							</PieChart>
						</ChartContainer>
					</CardContent>
				</Card>

				{/* Enhanced Monthly Comparison Card */}
				<Card className="border-2">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<TrendingUp className="h-5 w-5 text-green-600" />
							Monthly Spend Comparison
						</CardTitle>
						<CardDescription>
							August 2024 vs August 2023 (Same Month Last Year)
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="space-y-4">
							<div className="bg-blue-50 p-4 rounded-lg">
								<div className="flex justify-between items-center mb-2">
									<span className="text-sm font-medium text-blue-700">
										Current Month (Aug 2024)
									</span>
									<Badge variant="secondary">Latest</Badge>
								</div>
								<div className="space-y-1">
									<span className="text-3xl font-bold text-blue-900">
										₹{currentMonthComparison.currentMonth}Cr
									</span>
									<p className="text-xs text-blue-600">
										Exact: ₹
										{currentMonthComparison.currentMonthExact.toLocaleString(
											"en-IN",
										)}
									</p>
								</div>
							</div>

							<div className="bg-gray-50 p-4 rounded-lg">
								<div className="flex justify-between items-center mb-2">
									<span className="text-sm font-medium text-gray-700">
										Same Month Last Year (Aug 2023)
									</span>
									<Badge variant="outline">
										Previous Year
									</Badge>
								</div>
								<div className="space-y-1">
									<span className="text-2xl font-semibold text-gray-700">
										₹{currentMonthComparison.lastYear}Cr
									</span>
									<p className="text-xs text-gray-500">
										Exact: ₹
										{currentMonthComparison.lastYearExact.toLocaleString(
											"en-IN",
										)}
									</p>
								</div>
							</div>
						</div>

						<div className="border-t pt-4 space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">
									Percentage Change
								</span>
								<div className="flex items-center space-x-2">
									{currentMonthComparison.isIncrease ? (
										<TrendingUp className="h-4 w-4 text-red-500" />
									) : (
										<TrendingDown className="h-4 w-4 text-green-500" />
									)}
									<span
										className={`font-bold text-lg ${
											currentMonthComparison.isIncrease
												? "text-red-500"
												: "text-green-500"
										}`}
									>
										{currentMonthComparison.isIncrease
											? "+"
											: "-"}
										{currentMonthComparison.change}%
									</span>
								</div>
							</div>

							<div className="flex items-center justify-between">
								<span className="text-sm font-medium">
									Absolute Difference
								</span>
								<span className="font-semibold text-gray-900">
									₹
									{currentMonthComparison.absoluteDifference.toLocaleString(
										"en-IN",
									)}
								</span>
							</div>

							<p className="text-xs text-gray-500 bg-yellow-50 p-2 rounded">
								💡{" "}
								{currentMonthComparison.isIncrease
									? "Spending increased"
									: "Spending decreased"}{" "}
								by ₹
								{(
									currentMonthComparison.absoluteDifference /
									10000000
								).toFixed(2)}{" "}
								crores compared to last year
							</p>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Second Section: Enhanced Line Chart */}
			<Card className="border-2">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<TrendingUp className="h-5 w-5 text-purple-600" />
						12-Month Spending Trends & Budget Analysis
					</CardTitle>
					<CardDescription>
						Detailed monthly spending patterns with budget variance
						analysis (Sep 2023 - Aug 2024)
					</CardDescription>
				</CardHeader>
				<CardContent>
					<ChartContainer
						config={{
							spending: {
								label: "Actual Spending",
								color: "hsl(220, 70%, 50%)",
							},
							budget: {
								label: "Monthly Budget",
								color: "hsl(160, 60%, 45%)",
							},
						}}
						className="h-[400px]"
					>
						<ResponsiveContainer width="100%" height="100%">
							<LineChart
								data={monthlyTrends}
								margin={{
									top: 20,
									right: 30,
									left: 20,
									bottom: 60,
								}}
							>
								<XAxis
									dataKey="month"
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									angle={-45}
									textAnchor="end"
									height={80}
									fontSize={11}
								/>
								<YAxis
									tickLine={false}
									axisLine={false}
									tickMargin={8}
									tickFormatter={value => `₹${value}Cr`}
									fontSize={11}
								/>
								<Line
									type="monotone"
									dataKey="spending"
									stroke="hsl(220, 70%, 50%)"
									strokeWidth={3}
									dot={{
										fill: "hsl(220, 70%, 50%)",
										strokeWidth: 2,
										r: 5,
									}}
									activeDot={{
										r: 8,
										stroke: "hsl(220, 70%, 50%)",
										strokeWidth: 3,
									}}
								/>
								<Line
									type="monotone"
									dataKey="budget"
									stroke="hsl(160, 60%, 45%)"
									strokeWidth={2}
									strokeDasharray="5 5"
									dot={{
										fill: "hsl(160, 60%, 45%)",
										strokeWidth: 2,
										r: 3,
									}}
								/>
								<ChartTooltip content={<CustomLineTooltip />} />
								<ChartLegend content={<ChartLegendContent />} />
							</LineChart>
						</ResponsiveContainer>
					</ChartContainer>
				</CardContent>
			</Card>

			{/* Third Section: Enhanced Department Table */}
			<Card className="border-2">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Target className="h-5 w-5 text-orange-600" />
						Department-wise Detailed Spending Analysis
					</CardTitle>
					<CardDescription>
						Comprehensive breakdown with exact amounts, project
						counts, and budget status
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="overflow-x-auto">
						<Table>
							<TableHeader>
								<TableRow className="bg-gray-50">
									<TableHead className="font-bold">
										Department
									</TableHead>
									<TableHead className="text-right font-bold">
										Amount (₹ Crores)
									</TableHead>
									<TableHead className="text-right font-bold">
										Exact Amount (₹)
									</TableHead>
									<TableHead className="text-right font-bold">
										Percentage
									</TableHead>
									<TableHead className="text-center font-bold">
										Active Projects
									</TableHead>
									<TableHead className="text-center font-bold">
										Status
									</TableHead>
									<TableHead className="text-right font-bold">
										Last Month
									</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{departmentSpending.map((dept, index) => (
									<TableRow
										key={dept.department}
										className={
											index % 2 === 0 ? "bg-gray-25" : ""
										}
									>
										<TableCell className="font-medium">
											{dept.department}
										</TableCell>
										<TableCell className="text-right font-semibold">
											₹{dept.amount}
										</TableCell>
										<TableCell className="text-right text-sm text-gray-600">
											₹
											{dept.exactAmount.toLocaleString(
												"en-IN",
											)}
										</TableCell>
										<TableCell className="text-right">
											{dept.percentage}%
										</TableCell>
										<TableCell className="text-center">
											<Badge variant="outline">
												{dept.projects}
											</Badge>
										</TableCell>
										<TableCell className="text-center">
											<Badge
												variant={
													dept.status === "On Track"
														? "default"
														: dept.status ===
																"Under Budget"
															? "secondary"
															: "destructive"
												}
											>
												{dept.status}
											</Badge>
										</TableCell>
										<TableCell className="text-right text-sm">
											₹{dept.lastMonthSpend}Cr
										</TableCell>
									</TableRow>
								))}
								<TableRow className="border-t-2 border-gray-300 font-bold bg-blue-50">
									<TableCell className="font-bold">
										Total Utilized
									</TableCell>
									<TableCell className="text-right font-bold">
										₹{utilizedBudget}
									</TableCell>
									<TableCell className="text-right font-bold text-sm">
										₹
										{(
											utilizedBudget * 10000000
										).toLocaleString("en-IN")}
									</TableCell>
									<TableCell className="text-right font-bold">
										100.0%
									</TableCell>
									<TableCell className="text-center">
										<Badge variant="default">
											{departmentSpending.reduce(
												(sum, dept) =>
													sum + dept.projects,
												0,
											)}
										</Badge>
									</TableCell>
									<TableCell className="text-center">
										-
									</TableCell>
									<TableCell className="text-right font-bold">
										₹
										{departmentSpending
											.reduce(
												(sum, dept) =>
													sum + dept.lastMonthSpend,
												0,
											)
											.toFixed(2)}
										Cr
									</TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
