"use client"

import { useState, useEffect } from "react"
import { StrategyType, ScenarioType, Bitcoin24Assumptions, Bitcoin24Projection } from "@/lib/types"
import { getDefaultAssumptions, calculateBitcoin24Projection, STRATEGY_CONFIGS, formatCurrency, formatPercentage } from "@/lib/utils/bitcoin24.utils"
import { StrategySelector } from "@/components/bitcoin24/strategy-selector"
import { ScenarioSelector } from "@/components/bitcoin24/scenario-selector"
import { AssumptionsInput } from "@/components/bitcoin24/assumptions-input"
import { ProjectionChart } from "@/components/bitcoin24/projection-chart"
import { StrategyComparison } from "@/components/bitcoin24/strategy-comparison"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calculator, TrendingUp, DollarSign, Target, BarChart3 } from "lucide-react"

export default function Bitcoin24Page() {
	const [selectedStrategy, setSelectedStrategy] = useState<StrategyType>("btc10")
	const [selectedScenario, setSelectedScenario] = useState<ScenarioType>("individual")
	const [assumptions, setAssumptions] = useState<Bitcoin24Assumptions>(getDefaultAssumptions("individual"))
	const [projection, setProjection] = useState<Bitcoin24Projection | null>(null)
	const [isCalculating, setIsCalculating] = useState(false)
	const [activeTab, setActiveTab] = useState<"single" | "comparison">("single")

	// Update assumptions when scenario changes
	useEffect(() => {
		const newAssumptions = getDefaultAssumptions(selectedScenario)
		// Preserve strategy allocation from selected strategy
		const strategyConfig = STRATEGY_CONFIGS[selectedStrategy]
		newAssumptions.bitcoinAllocation = strategyConfig.bitcoinAllocation
		setAssumptions(newAssumptions)
	}, [selectedScenario, selectedStrategy])

	// Update Bitcoin allocation when strategy changes
	useEffect(() => {
		const strategyConfig = STRATEGY_CONFIGS[selectedStrategy]
		setAssumptions((prev) => ({
			...prev,
			bitcoinAllocation: strategyConfig.bitcoinAllocation
		}))
	}, [selectedStrategy])

	const handleCalculateProjection = async () => {
		setIsCalculating(true)
		try {
			// Simulate some calculation time for better UX
			await new Promise((resolve) => setTimeout(resolve, 500))
			const newProjection = calculateBitcoin24Projection(selectedStrategy, selectedScenario, assumptions)
			setProjection(newProjection)
		} catch (error) {
			console.error("Error calculating projection:", error)
		} finally {
			setIsCalculating(false)
		}
	}

	return (
		<div className="space-y-8 py-6 px-4" data-testid="bitcoin24-dashboard">
			<div>
				<h1 className="text-3xl font-bold tracking-tight" data-testid="bitcoin24-title">
					Bitcoin24
				</h1>
				<p className="text-muted-foreground mt-1" data-testid="bitcoin24-description">
					21-year macro forecast with micro models for bitcoin strategies
				</p>
			</div>

			<div className="space-y-8">
				{/* Strategy Selection */}
				<StrategySelector selectedStrategy={selectedStrategy} onStrategyChange={setSelectedStrategy} />

				{/* Scenario Selection */}
				<ScenarioSelector selectedScenario={selectedScenario} onScenarioChange={setSelectedScenario} />

				{/* Assumptions Input */}
				<AssumptionsInput assumptions={assumptions} scenario={selectedScenario} onAssumptionsChange={setAssumptions} />

				{/* Tab Navigation */}
				<Card className="p-6">
					<div className="flex items-center justify-center gap-4">
						<Button
							variant={activeTab === "single" ? "default" : "outline"}
							onClick={() => setActiveTab("single")}
							className="flex items-center gap-2">
							<Calculator className="h-4 w-4" />
							Single Strategy
						</Button>
						<Button
							variant={activeTab === "comparison" ? "default" : "outline"}
							onClick={() => setActiveTab("comparison")}
							className="flex items-center gap-2">
							<BarChart3 className="h-4 w-4" />
							Strategy Comparison
						</Button>
					</div>
				</Card>

				{/* Single Strategy Tab */}
				{activeTab === "single" && (
					<>
						{/* Calculate Button */}
						<div className="flex justify-center">
							<Button
								size="lg"
								onClick={handleCalculateProjection}
								disabled={isCalculating}
								className="flex items-center gap-2 px-8 py-4 text-lg">
								<Calculator className="h-5 w-5" />
								{isCalculating ? "Calculating..." : "Calculate 21-Year Projection"}
							</Button>
						</div>

						{/* Single Strategy Results */}
						{projection && (
							<div className="space-y-6">
								<h2 className="text-2xl font-semibold">Projection Results</h2>

								{/* Summary Cards */}
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
									<Card className="p-6">
										<div className="flex items-center gap-3">
											<DollarSign className="h-8 w-8 text-green-600" />
											<div>
												<p className="text-sm font-medium text-muted-foreground">Final Value</p>
												<p className="text-2xl font-bold">{formatCurrency(projection.summary.finalValue)}</p>
											</div>
										</div>
									</Card>

									<Card className="p-6">
										<div className="flex items-center gap-3">
											<TrendingUp className="h-8 w-8 text-blue-600" />
											<div>
												<p className="text-sm font-medium text-muted-foreground">Total Return</p>
												<p className="text-2xl font-bold">{formatPercentage(projection.summary.totalReturn)}</p>
											</div>
										</div>
									</Card>

									<Card className="p-6">
										<div className="flex items-center gap-3">
											<Target className="h-8 w-8 text-purple-600" />
											<div>
												<p className="text-sm font-medium text-muted-foreground">Annualized Return</p>
												<p className="text-2xl font-bold">{formatPercentage(projection.summary.annualizedReturn)}</p>
											</div>
										</div>
									</Card>

									<Card className="p-6">
										<div className="flex items-center gap-3">
											<TrendingUp className="h-8 w-8 text-orange-600" />
											<div>
												<p className="text-sm font-medium text-muted-foreground">BTC Final Price</p>
												<p className="text-2xl font-bold">{formatCurrency(projection.summary.bitcoinFinalPrice)}</p>
											</div>
										</div>
									</Card>
								</div>

								{/* Charts */}
								<ProjectionChart projection={projection} showRealValue={true} />

								{/* Detailed Results Table */}
								<Card className="p-6">
									<h3 className="text-lg font-semibold mb-4">Year-by-Year Breakdown</h3>
									<div className="overflow-x-auto">
										<table className="w-full text-sm">
											<thead>
												<tr className="border-b">
													<th className="text-left p-2">Year</th>
													<th className="text-right p-2">BTC Price</th>
													<th className="text-right p-2">BTC Value</th>
													<th className="text-right p-2">Traditional Value</th>
													<th className="text-right p-2">Total Value</th>
													<th className="text-right p-2">Real Value</th>
													<th className="text-right p-2">Annual Return</th>
												</tr>
											</thead>
											<tbody>
												{projection.results
													.filter((_, index) => index % 3 === 0 || index === projection.results.length - 1)
													.map((result) => (
														<tr key={result.year} className="border-b hover:bg-muted/50">
															<td className="p-2 font-medium">{result.year}</td>
															<td className="p-2 text-right">{formatCurrency(result.bitcoinPrice)}</td>
															<td className="p-2 text-right">{formatCurrency(result.bitcoinValue)}</td>
															<td className="p-2 text-right">{formatCurrency(result.traditionalAssetValue)}</td>
															<td className="p-2 text-right font-medium">{formatCurrency(result.totalValue)}</td>
															<td className="p-2 text-right">{formatCurrency(result.realValue)}</td>
															<td className="p-2 text-right">{formatPercentage(result.annualReturn)}</td>
														</tr>
													))}
											</tbody>
										</table>
									</div>
								</Card>

								{/* Strategy Summary */}
								<Card className="p-6 bg-blue-50 border-blue-200">
									<h3 className="text-lg font-semibold mb-3 text-blue-900">Investment Summary</h3>
									<div className="space-y-2 text-sm text-blue-800">
										<p>
											<strong>Strategy:</strong> {STRATEGY_CONFIGS[selectedStrategy].name} (
											{STRATEGY_CONFIGS[selectedStrategy].bitcoinAllocation}% Bitcoin allocation)
										</p>
										<p>
											<strong>Initial Investment:</strong> {formatCurrency(assumptions.initialInvestment)}
										</p>
										<p>
											<strong>Bitcoin Portion:</strong>{" "}
											{formatCurrency((assumptions.initialInvestment * assumptions.bitcoinAllocation) / 100)}
										</p>
										<p>
											<strong>Traditional Portion:</strong>{" "}
											{formatCurrency((assumptions.initialInvestment * (100 - assumptions.bitcoinAllocation)) / 100)}
										</p>
									</div>
								</Card>
							</div>
						)}
					</>
				)}

				{/* Strategy Comparison Tab */}
				{activeTab === "comparison" && <StrategyComparison scenario={selectedScenario} assumptions={assumptions} />}

				{/* Credits */}
				<div className="pt-8 border-t">
					<div className="text-sm text-muted-foreground space-y-3">
						<div>
							<p className="font-semibold mb-2">Original Contributors:</p>
							<ul className="list-disc list-inside space-y-1">
								<li>Michael J. Saylor</li>
								<li>Shirish Jajodia</li>
								<li>Chaitanya Jain (CJ)</li>
							</ul>
						</div>

						<div className="pt-4">
							<p className="italic bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
								{
									"It might make sense just to get some in case it catches on. If enough people think the same way, that becomes a self-fulfilling prophecy."
								}{" "}
								- Satoshi Nakamoto on 01/17/09 (BTC Price: $0)
							</p>
						</div>

						<div className="pt-4 text-xs bg-gray-50 p-4 rounded border">
							<p className="font-semibold mb-2">Disclaimer:</p>
							<p>
								The information provided here is for general informational purposes only and should not be considered financial advice. It
								contains forward-looking information that is inherently unknowable. You should seek advice from a professional financial advisor
								and other trusted sources before acting on any of this information. The authors and publishers of this information disclaim
								responsibility for any action taken by users of this information. This is but one view of potential outcomes. You should inform
								yourself of other views, including those that might disagree.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
