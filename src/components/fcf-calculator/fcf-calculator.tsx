"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { YearData } from "@/lib/types"
import { calculateYearData, getYearsUntil2049, updateBitcoinAGR } from "@/lib/utils/fcf-calculator.utils"
import { formatCurrency } from "@/lib/utils/prices.utils"
import { formatNumber } from "@/lib/utils/string.utils"
import { HelpCircle } from "lucide-react"
import MarkMossReference from "./mark-moss-credit"
import FCFVideoLink from "./fcf-video-link"

const DEFAULT_HOLDINGS = 2
const DEFAULT_STARTING_YEAR = 2026
const DEFAULT_INTEREST_RATE = 12.5
const DEFAULT_DESIRED_CASHFLOW = 50000
const DEFAULT_AGE = 30

interface FCFCalculatorProps {
	btcPrice: number
}

export default function FCFCalculator({ btcPrice }: FCFCalculatorProps) {
	const [holdings, setHoldings] = useState<number>(DEFAULT_HOLDINGS)
	const [startingPrice, setStartingPrice] = useState<number>(btcPrice)
	const [startingYear, setStartingYear] = useState<number>(DEFAULT_STARTING_YEAR)
	const [interestRate, setInterestRate] = useState<number>(DEFAULT_INTEREST_RATE)
	const [desiredCashflow, setDesiredCashflow] = useState<number>(DEFAULT_DESIRED_CASHFLOW)
	const [age, setAge] = useState<number>(DEFAULT_AGE)
	const [showAge, setShowAge] = useState<boolean>(false)
	const [yearData, setYearData] = useState<YearData[]>([])

	const resetToDefaults = () => {
		setHoldings(DEFAULT_HOLDINGS)
		setStartingPrice(btcPrice)
		setStartingYear(DEFAULT_STARTING_YEAR)
		setInterestRate(DEFAULT_INTEREST_RATE)
		setDesiredCashflow(DEFAULT_DESIRED_CASHFLOW)
		setAge(DEFAULT_AGE)
		setShowAge(false)
	}

	useEffect(() => {
		const data = calculateYearData({
			holdings,
			startingPrice,
			startingYear,
			interestRate,
			desiredCashflow,
			age
		})
		setYearData(data)
	}, [holdings, startingPrice, startingYear, interestRate, desiredCashflow, age])

	return (
		<div className="space-y-6 py-6 px-4">
			<TooltipProvider>
				<Card>
					<CardHeader>
						<CardTitle className="text-3xl font-bold tracking-tight">Bitcoin Free Cash Flow Calculator</CardTitle>
						<CardDescription className="text-muted-foreground mt-1">
							Calculate tax-free income potential through Bitcoin-backed loans. The way this works is you first input how much Bitcoin you hold.
							Then input loan information, such as the starting price of whenever you would do the first collateralized loan, the year in which
							you would do the first loan and the interest rate they would charge you. Finally, you input the desired cashflow you would like to
							achieve. The calculator will then show you the free cash flow you can achieve each year by displaying how much debt you would have
							to take out each year, how much interest you would have to pay, and how much free cash flow you would have each year.{" "}
							<FCFVideoLink text="Look at this video for more information." />
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{/* Input Sections Grid */}
						<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
							{/* Bitcoin Holdings Section */}
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-orange-500 rounded-full"></div>
									<h3 className="text-lg font-semibold">Bitcoin Holdings</h3>
								</div>
								<p className="text-sm text-muted-foreground pl-5">
									Enter the amount of Bitcoin you currently own. A percentage of this will be used as collateral for your loans as displayed
									by the LTV in the table.
								</p>
								<div className="pl-4">
									<div className="space-y-2 max-w-[200px]">
										<Label htmlFor="holdings">BTC Holdings</Label>
										<Input
											id="holdings"
											type="number"
											step="0.1"
											value={holdings}
											onChange={(e) => setHoldings(Number.parseFloat(e.target.value) || 0)}
											className="text-lg font-medium"
										/>
									</div>
								</div>
							</div>

							{/* Cash Flow Goals Section */}
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-green-500 rounded-full"></div>
									<h3 className="text-lg font-semibold">Cash Flow Goals</h3>
								</div>
								<p className="text-sm text-muted-foreground pl-5">
									Specify how much tax-free income you want to generate annually through Bitcoin-backed loans.
								</p>
								<div className="pl-4">
									<div className="space-y-2 max-w-[200px]">
										<Label htmlFor="desiredCashflow">Desired Annual Cashflow ($)</Label>
										<Input
											id="desiredCashflow"
											type="number"
											step="1"
											value={desiredCashflow}
											onChange={(e) => setDesiredCashflow(Number.parseFloat(e.target.value) || 0)}
											className="text-lg font-medium"
										/>
									</div>
								</div>
							</div>

							{/* Loan Parameters Section */}
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-blue-500 rounded-full"></div>
									<h3 className="text-lg font-semibold">Loan Parameters</h3>
								</div>
								<p className="text-sm text-muted-foreground pl-5">
									Set the conditions for your Bitcoin-backed loans including the starting price, interest rate, and when you plan to begin.
								</p>
								<div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-4">
									<div className="space-y-2 max-w-[200px]">
										<Label htmlFor="startingPrice">Starting BTC Price ($)</Label>
										<Input
											id="startingPrice"
											type="number"
											step="1"
											value={startingPrice}
											onChange={(e) => setStartingPrice(Number.parseFloat(e.target.value) || 0)}
										/>
									</div>
									<div className="space-y-2 max-w-[200px]">
										<Label htmlFor="interestRate">Interest Rate (%)</Label>
										<Input
											id="interestRate"
											type="number"
											step="0.1"
											value={interestRate}
											onChange={(e) => setInterestRate(Number.parseFloat(e.target.value) || 0)}
										/>
									</div>
									<div className="space-y-2 max-w-[200px] md:col-span-2">
										<Label htmlFor="startingYear">Starting Year</Label>
										<Select value={startingYear.toString()} onValueChange={(value) => setStartingYear(Number.parseInt(value))}>
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												{getYearsUntil2049().map((year: number) => (
													<SelectItem key={year} value={year.toString()}>
														{year}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>

							{/* Optional Age Section */}
							<div className="space-y-4">
								<div className="flex items-center space-x-3">
									<div className="w-2 h-2 bg-purple-500 rounded-full"></div>
									<h3 className="text-lg font-semibold">Optional Settings</h3>
								</div>
								<p className="text-sm text-muted-foreground pl-5">
									Additional settings to customize your calculations and display preferences.
								</p>
								<div className="pl-4 space-y-4">
									<div className="flex items-center space-x-2">
										<Checkbox id="show-age" checked={showAge} onCheckedChange={(checked) => setShowAge(checked as boolean)} />
										<Label htmlFor="show-age">Include age in calculations</Label>
									</div>
									{showAge && (
										<div className="space-y-2 max-w-[200px]">
											<Label htmlFor="age">Current Age (2025)</Label>
											<Input id="age" type="number" step="1" value={age} onChange={(e) => setAge(Number.parseInt(e.target.value) || 0)} />
										</div>
									)}
								</div>
							</div>
						</div>

						<Separator />

						{/* Reset Button */}
						<div className="flex justify-center pt-4">
							<Button onClick={resetToDefaults} variant="outline" size="lg">
								Reset to Defaults
							</Button>
						</div>

						{/* Results Table Section */}
						<div className="space-y-4">
							<div className="flex items-center space-x-3">
								<div className="w-2 h-2 bg-red-500 rounded-full"></div>
								<h3 className="text-lg font-semibold">Projected Cash Flow</h3>
							</div>
							<p className="text-sm text-muted-foreground pl-5">
								Year-by-year breakdown showing Bitcoin value growth, loan amounts, interest payments, and your net free cash flow.
							</p>
							<div className="overflow-x-auto">
								<Table>
									<TableHeader>
										<TableRow>
											<TableHead>Year</TableHead>
											{showAge && <TableHead>Age</TableHead>}
											<TableHead>Value</TableHead>

											<TableHead>
												<div className="flex items-center gap-1">
													<span>AGR (%)</span>
													<Tooltip>
														<TooltipTrigger asChild>
															<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
														</TooltipTrigger>
														<TooltipContent>
															<p>Annual Growth Rate - The percentage change in Bitcoin price for this year</p>
														</TooltipContent>
													</Tooltip>
												</div>
											</TableHead>

											<TableHead>Gain</TableHead>

											<TableHead>
												<div className="flex items-center gap-1">
													<span>LTV (%)</span>
													<Tooltip>
														<TooltipTrigger asChild>
															<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
														</TooltipTrigger>
														<TooltipContent>
															<p>Loan-to-Value ratio - Percentage of your Bitcoin value borrowed as collateral</p>
														</TooltipContent>
													</Tooltip>
												</div>
											</TableHead>

											<TableHead>
												<div className="flex items-center gap-1">
													<span>Debt</span>
													<Tooltip>
														<TooltipTrigger asChild>
															<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
														</TooltipTrigger>
														<TooltipContent>
															<p>Total amount borrowed against your Bitcoin collateral</p>
														</TooltipContent>
													</Tooltip>
												</div>
											</TableHead>

											<TableHead>
												<div className="flex items-center gap-1">
													<span>Interest</span>
													<Tooltip>
														<TooltipTrigger asChild>
															<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
														</TooltipTrigger>
														<TooltipContent>
															<p>Interest payment on the debt borrowed</p>
														</TooltipContent>
													</Tooltip>
												</div>
											</TableHead>

											<TableHead>
												<div className="flex items-center gap-1">
													<span>FCF</span>
													<Tooltip>
														<TooltipTrigger asChild>
															<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
														</TooltipTrigger>
														<TooltipContent>
															<p>
																Free Cash Flow - Net cash available after borrowing new debt, paying interest, and repaying
																previous year&apos;s debt
															</p>
														</TooltipContent>
													</Tooltip>
												</div>
											</TableHead>

											<TableHead>
												<div className="flex items-center gap-1">
													<span>PP_BTC</span>
													<Tooltip>
														<TooltipTrigger asChild>
															<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
														</TooltipTrigger>
														<TooltipContent>
															<p>Price Per Bitcoin - The calculated Bitcoin price based on your total portfolio value</p>
														</TooltipContent>
													</Tooltip>
												</div>
											</TableHead>
										</TableRow>
									</TableHeader>
									<TableBody>
										{yearData.map((data) => (
											<TableRow key={data.year}>
												<TableCell className="font-medium">{data.year}</TableCell>
												{showAge && <TableCell className="font-medium">{data.age}</TableCell>}
												<TableCell>{formatCurrency(data.value)}</TableCell>
												<TableCell>
													<Input
														type="number"
														step="1"
														value={data.agr}
														onChange={(e) => {
															const updatedData = updateBitcoinAGR({
																year: data.year,
																newAGR: Number.parseFloat(e.target.value) || 0,
																yearData,
																holdings,
																startingYear,
																interestRate,
																desiredCashflow
															})
															setYearData(updatedData)
														}}
														className="w-20"
													/>
												</TableCell>
												<TableCell className={data.gain >= 0 ? "text-green-600" : "text-red-600"}>
													{formatCurrency(data.gain)}
												</TableCell>
												<TableCell>
													{data.year >= startingYear ? (
														<span className={data.ltv > 100 ? "text-red-600 font-semibold" : ""}>{formatNumber(data.ltv)}%</span>
													) : (
														"0.0"
													)}
												</TableCell>
												<TableCell>{formatCurrency(data.debt)}</TableCell>
												<TableCell>{formatCurrency(data.interest)}</TableCell>
												<TableCell className={data.fcf >= 0 ? "text-green-600" : "text-red-600"}>
													{data.year >= startingYear ? (
														<Tooltip>
															<TooltipTrigger asChild>
																<span className="cursor-help underline">{formatCurrency(data.fcf)}</span>
															</TooltipTrigger>
															<TooltipContent className="max-w-xs">
																<div className="space-y-2">
																	<p className="font-semibold text-sm">FCF Calculation for {data.year}:</p>
																	<div className="text-xs space-y-1">
																		<div className="flex justify-between">
																			<span>New Debt:</span>
																			<span className="font-mono">{formatCurrency(data.debt)}</span>
																		</div>
																		<div className="flex justify-between">
																			<span>Interest Payment:</span>
																			<span className="font-mono text-red-500">-{formatCurrency(data.interest)}</span>
																		</div>
																		<div className="flex justify-between">
																			<span>Previous Year Debt:</span>
																			<span className="font-mono text-red-500">
																				-{formatCurrency(yearData.find((d) => d.year === data.year - 1)?.debt || 0)}
																			</span>
																		</div>
																		<hr className="border-gray-300" />
																		<div className="flex justify-between font-semibold">
																			<span>Free Cash Flow:</span>
																			<span className={`font-mono ${data.fcf >= 0 ? "text-green-600" : "text-red-600"}`}>
																				{formatCurrency(data.fcf)}
																			</span>
																		</div>
																	</div>
																	<p className="text-xs text-gray-500 italic">Formula: New Debt - Interest - Previous Debt</p>
																</div>
															</TooltipContent>
														</Tooltip>
													) : (
														formatCurrency(data.fcf)
													)}
												</TableCell>
												<TableCell>{formatCurrency(data.ppBtc)}</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</div>
						</div>
						<MarkMossReference />
					</CardContent>
				</Card>
			</TooltipProvider>
		</div>
	)
}
