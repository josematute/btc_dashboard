"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface YearData {
	year: number
	age: number
	value: number
	agr: number
	gain: number
	ltv: number
	debt: number
	interest: number
	fcf: number
	ppBtc: number
}

export default function FCFCalculator() {
	const [holdings, setHoldings] = useState(2)
	const [startingPrice, setStartingPrice] = useState(103000)
	const [startingYear, setStartingYear] = useState(2026)
	const [interestRate, setInterestRate] = useState(12.5)
	const [desiredCashflow, setDesiredCashflow] = useState(50000)
	const [age, setAge] = useState(25)
	const [yearData, setYearData] = useState<YearData[]>([])

	const currentYear = 2025
	const years = Array.from({ length: 25 }, (_, i) => 2025 + i) // 2025-2049

	const resetToDefaults = () => {
		setHoldings(2)
		setStartingPrice(103000)
		setStartingYear(2026)
		setInterestRate(12.5)
		setDesiredCashflow(50000)
		setAge(25)
	}

	useEffect(() => {
		calculateYearData()
	}, [holdings, startingPrice, startingYear, interestRate, desiredCashflow, age])

	const calculateYearData = () => {
		const data: YearData[] = []
		let currentValue = holdings * startingPrice
		let currentPrice = startingPrice

		// Initialize with default AGR values based on the example
		const defaultAGR: { [key: number]: number } = {
			2025: 100,
			2026: -50,
			2027: 125,
			2028: 115,
			2029: 85,
			2030: -30,
			2031: 115,
			2032: 100,
			2033: 75,
			2034: -25,
			2035: 75,
			2036: 50,
			2037: 40,
			2038: -15,
			2039: 50,
			2040: 40,
			2041: 30,
			2042: -10,
			2043: 40,
			2044: 30,
			2045: 15,
			2046: -10,
			2047: 30,
			2048: 20,
			2049: 10,
			2050: -10
		}

		for (let year = currentYear; year <= 2050; year++) {
			const isBeforeStarting = year < startingYear
			const agr = defaultAGR[year] || 0
			const currentAge = age + (year - currentYear)

			// Calculate gain based on AGR
			const gain = (currentValue * agr) / 100.0

			// Update value for next iteration (but display current value)
			const displayValue = currentValue
			const displayPrice = currentPrice

			let ltv = 0.0
			let debt = 0.0
			let interest = 0.0
			let fcf = 0.0

			if (!isBeforeStarting) {
				// Calculate required LTV to achieve desired FCF
				const prevYearDebt = data.length > 0 ? data[data.length - 1].debt : 0.0
				const interestRateDecimal = interestRate / 100.0

				// FCF = Debt - Interest - Previous Year Debt
				// FCF = (Value × LTV / 100) × (1 - Interest Rate / 100) - Previous Year Debt
				// Solving for LTV: LTV = (FCF + Previous Year Debt) / (Value × (1 - Interest Rate / 100)) × 100

				const denominator = displayValue * (1.0 - interestRateDecimal)
				if (denominator > 0) {
					ltv = ((desiredCashflow + prevYearDebt) / denominator) * 100.0
				}

				debt = (displayValue * ltv) / 100.0
				interest = debt * interestRateDecimal
				fcf = debt - interest - prevYearDebt
			}

			data.push({
				year,
				age: currentAge,
				value: displayValue,
				agr,
				gain,
				ltv,
				debt,
				interest,
				fcf,
				ppBtc: displayPrice
			})

			// Update for next year
			currentValue = displayValue + gain
			currentPrice = currentValue / holdings
		}

		setYearData(data)
	}

	const updateAGR = (year: number, newAGR: number) => {
		const updatedData = [...yearData]
		const yearIndex = updatedData.findIndex((d) => d.year === year)

		if (yearIndex !== -1) {
			// Update AGR for this year
			updatedData[yearIndex].agr = newAGR
			updatedData[yearIndex].gain = (updatedData[yearIndex].value * newAGR) / 100.0

			// Recalculate subsequent years
			for (let i = yearIndex + 1; i < updatedData.length; i++) {
				const prevYear = updatedData[i - 1]
				const newValue = prevYear.value + prevYear.gain
				const newPrice = newValue / holdings

				updatedData[i].value = newValue
				updatedData[i].ppBtc = newPrice
				updatedData[i].gain = (newValue * updatedData[i].agr) / 100.0

				// Recalculate debt-related fields
				const isBeforeStarting = updatedData[i].year < startingYear
				if (!isBeforeStarting) {
					const prevYearDebt = i > 0 ? updatedData[i - 1].debt : 0.0
					const interestRateDecimal = interestRate / 100.0
					const denominator = newValue * (1.0 - interestRateDecimal)

					if (denominator > 0) {
						updatedData[i].ltv = ((desiredCashflow + prevYearDebt) / denominator) * 100.0
					}

					updatedData[i].debt = (newValue * updatedData[i].ltv) / 100.0
					updatedData[i].interest = updatedData[i].debt * interestRateDecimal
					updatedData[i].fcf = updatedData[i].debt - updatedData[i].interest - prevYearDebt
				}
			}
		}

		setYearData(updatedData)
	}

	const formatCurrency = (value: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2
		}).format(value)
	}

	const formatNumber = (value: number, decimals = 2) => {
		return new Intl.NumberFormat("en-US", {
			minimumFractionDigits: decimals,
			maximumFractionDigits: decimals
		}).format(value)
	}

	return (
		<div className="max-w-7xl mx-auto p-6 space-y-6">
			<TooltipProvider>
				<Card>
					<CardHeader>
						<CardTitle>Bitcoin Collateralized Loan Calculator</CardTitle>
						<CardDescription>Calculate tax-free income potential through Bitcoin-backed loans</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
							<div className="space-y-2">
								<Label htmlFor="holdings">BTC Holdings</Label>
								<Input
									id="holdings"
									type="number"
									step="0.01"
									value={holdings}
									onChange={(e) => setHoldings(Number.parseFloat(e.target.value) || 0)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="startingPrice">Starting Price ($)</Label>
								<Input
									id="startingPrice"
									type="number"
									step="0.01"
									value={startingPrice}
									onChange={(e) => setStartingPrice(Number.parseFloat(e.target.value) || 0)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="startingYear">Starting Year</Label>
								<Select value={startingYear.toString()} onValueChange={(value) => setStartingYear(Number.parseInt(value))}>
									<SelectTrigger>
										<SelectValue />
									</SelectTrigger>
									<SelectContent>
										{years.map((year) => (
											<SelectItem key={year} value={year.toString()}>
												{year}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="interestRate">Interest Rate (%)</Label>
								<Input
									id="interestRate"
									type="number"
									step="0.1"
									value={interestRate}
									onChange={(e) => setInterestRate(Number.parseFloat(e.target.value) || 0)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="desiredCashflow">Desired Cashflow ($)</Label>
								<Input
									id="desiredCashflow"
									type="number"
									step="1"
									value={desiredCashflow}
									onChange={(e) => setDesiredCashflow(Number.parseFloat(e.target.value) || 0)}
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="age">Current Age (2025)</Label>
								<Input id="age" type="number" step="1" value={age} onChange={(e) => setAge(Number.parseInt(e.target.value) || 0)} />
							</div>
						</div>

						<div className="mb-4">
							<Button onClick={resetToDefaults} variant="outline">
								Reset to Defaults
							</Button>
						</div>

						<div className="overflow-x-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Year</TableHead>
										<TableHead>Age</TableHead>
										<TableHead>Value</TableHead>
										<TableHead>
											<Tooltip>
												<TooltipTrigger asChild>
													<span className="cursor-help underline decoration-dotted">AGR (%)</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>Annual Growth Rate - The percentage change in Bitcoin price for this year</p>
												</TooltipContent>
											</Tooltip>
										</TableHead>
										<TableHead>Gain</TableHead>
										<TableHead>
											<Tooltip>
												<TooltipTrigger asChild>
													<span className="cursor-help underline decoration-dotted">LTV (%)</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>Loan-to-Value ratio - Percentage of your Bitcoin value borrowed as collateral</p>
												</TooltipContent>
											</Tooltip>
										</TableHead>
										<TableHead>
											<Tooltip>
												<TooltipTrigger asChild>
													<span className="cursor-help underline decoration-dotted">Debt</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>Total amount borrowed against your Bitcoin collateral this year</p>
												</TooltipContent>
											</Tooltip>
										</TableHead>
										<TableHead>
											<Tooltip>
												<TooltipTrigger asChild>
													<span className="cursor-help underline decoration-dotted">Interest</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>Interest payment on the debt borrowed this year</p>
												</TooltipContent>
											</Tooltip>
										</TableHead>
										<TableHead>
											<Tooltip>
												<TooltipTrigger asChild>
													<span className="cursor-help underline decoration-dotted">FCF</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>
														Free Cash Flow - Net cash available after borrowing new debt, paying interest, and repaying previous
														year&apos;s debt
													</p>
												</TooltipContent>
											</Tooltip>
										</TableHead>
										<TableHead>
											<Tooltip>
												<TooltipTrigger asChild>
													<span className="cursor-help underline decoration-dotted">PP_BTC</span>
												</TooltipTrigger>
												<TooltipContent>
													<p>Price Per Bitcoin - The calculated Bitcoin price based on your total portfolio value</p>
												</TooltipContent>
											</Tooltip>
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{yearData.map((data) => (
										<TableRow key={data.year}>
											<TableCell className="font-medium">{data.year}</TableCell>
											<TableCell className="font-medium">{data.age}</TableCell>
											<TableCell>{formatCurrency(data.value)}</TableCell>
											<TableCell>
												<Input
													type="number"
													step="0.1"
													value={data.agr}
													onChange={(e) => updateAGR(data.year, Number.parseFloat(e.target.value) || 0)}
													className="w-20"
												/>
											</TableCell>
											<TableCell className={data.gain >= 0 ? "text-green-600" : "text-red-600"}>{formatCurrency(data.gain)}</TableCell>
											<TableCell>
												{data.year >= startingYear ? (
													<span className={data.ltv > 100 ? "text-red-600 font-semibold" : ""}>{formatNumber(data.ltv, 2)}%</span>
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
															<span className="cursor-help underline decoration-dotted">{formatCurrency(data.fcf)}</span>
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
					</CardContent>
				</Card>
			</TooltipProvider>
		</div>
	)
}
