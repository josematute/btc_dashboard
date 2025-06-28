"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { YearData } from "@/lib/types"
import { calculateYearData, getYearsUntil2049 } from "@/lib/utils/fcf-calculator.utils"
import MarkMossReference from "./mark-moss-credit"
import FCFVideoLink from "./fcf-video-link"
import FCFCalculatorTable from "./fcf-calculator-table"

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
		<div className="space-y-6 py-6 px-4" id="fcf-calculator">
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
								<FCFCalculatorTable
									yearData={yearData}
									showAge={showAge}
									holdings={holdings}
									startingYear={startingYear}
									interestRate={interestRate}
									desiredCashflow={desiredCashflow}
									setYearData={setYearData}
								/>
							</div>
						</div>
						<MarkMossReference />
					</CardContent>
				</Card>
			</TooltipProvider>
		</div>
	)
}
