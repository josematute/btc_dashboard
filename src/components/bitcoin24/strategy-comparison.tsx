import { useState } from "react"
import { StrategyType, ScenarioType, Bitcoin24Assumptions, Bitcoin24Projection, ChartTooltipProps, ComparisonChartDataPoint } from "@/lib/types"
import { compareStrategies, STRATEGY_CONFIGS, formatCurrency, formatPercentage } from "@/lib/utils/bitcoin24.utils"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { TrendingUp, Target, DollarSign, BarChart3 } from "lucide-react"

interface StrategyComparisonProps {
	scenario: ScenarioType
	assumptions: Bitcoin24Assumptions
}

const STRATEGY_COLORS = {
	normie: "#6b7280",
	btc10: "#3b82f6",
	btc_maxi: "#f97316",
	double_maxi: "#ef4444",
	triple_maxi: "#dc2626"
}

export function StrategyComparison({ scenario, assumptions }: StrategyComparisonProps) {
	const [selectedStrategies, setSelectedStrategies] = useState<StrategyType[]>(["normie", "btc10", "btc_maxi"])
	const [comparisons, setComparisons] = useState<Bitcoin24Projection[]>([])
	const [isCalculating, setIsCalculating] = useState(false)

	const handleStrategyToggle = (strategy: StrategyType) => {
		setSelectedStrategies((prev) => (prev.includes(strategy) ? prev.filter((s) => s !== strategy) : [...prev, strategy]))
	}

	const handleCompareStrategies = async () => {
		if (selectedStrategies.length === 0) return

		setIsCalculating(true)
		try {
			await new Promise((resolve) => setTimeout(resolve, 800))
			const results = compareStrategies(selectedStrategies, scenario, assumptions)
			setComparisons(results)
		} catch (error) {
			console.error("Error comparing strategies:", error)
		} finally {
			setIsCalculating(false)
		}
	}

	// Prepare chart data for comparison
	const chartData: ComparisonChartDataPoint[] =
		comparisons.length > 0
			? comparisons[0].results.map((_, yearIndex) => {
					const yearData: ComparisonChartDataPoint = { year: yearIndex }
					comparisons.forEach((comparison) => {
						const yearResult = comparison.results[yearIndex]
						yearData[`${comparison.strategy}_total`] = yearResult.totalValue
						yearData[`${comparison.strategy}_btc`] = yearResult.bitcoinValue
						yearData[`${comparison.strategy}_traditional`] = yearResult.traditionalAssetValue
					})
					return yearData
			  })
			: []

	const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white p-3 border rounded shadow-lg">
					<p className="font-semibold">{`Year ${label}`}</p>
					{payload.map((entry, index) => (
						<p key={index} style={{ color: entry.color }}>
							{`${entry.name}: ${formatCurrency(entry.value)}`}
						</p>
					))}
				</div>
			)
		}
		return null
	}

	return (
		<div className="space-y-6">
			{/* Strategy Selection */}
			<Card className="p-6">
				<h3 className="text-lg font-semibold mb-4">Select Strategies to Compare</h3>
				<div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
					{Object.values(STRATEGY_CONFIGS).map((strategy) => (
						<div
							key={strategy.type}
							className={`p-4 border rounded-lg cursor-pointer transition-all ${
								selectedStrategies.includes(strategy.type) ? "border-blue-500 bg-blue-50" : "border-gray-200 hover:border-gray-300"
							}`}
							onClick={() => handleStrategyToggle(strategy.type)}>
							<div className="flex items-center space-x-2 mb-2">
								<Checkbox checked={selectedStrategies.includes(strategy.type)} onCheckedChange={() => {}} />
								<span className="font-medium text-sm">{strategy.name}</span>
							</div>
							<p className="text-xs text-muted-foreground">{strategy.description}</p>
							<div className="mt-2">
								<Badge
									variant="outline"
									className="text-xs"
									style={{
										borderColor: STRATEGY_COLORS[strategy.type],
										color: STRATEGY_COLORS[strategy.type]
									}}>
									{strategy.bitcoinAllocation}% BTC
								</Badge>
							</div>
						</div>
					))}
				</div>

				<Button onClick={handleCompareStrategies} disabled={selectedStrategies.length === 0 || isCalculating} className="flex items-center gap-2">
					<BarChart3 className="h-4 w-4" />
					{isCalculating ? "Comparing..." : `Compare ${selectedStrategies.length} Strategies`}
				</Button>
			</Card>

			{/* Comparison Results */}
			{comparisons.length > 0 && (
				<>
					{/* Summary Cards */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
						<Card className="p-6">
							<div className="flex items-center gap-3 mb-4">
								<DollarSign className="h-6 w-6 text-green-600" />
								<h3 className="font-semibold">Final Values (Year 21)</h3>
							</div>
							<div className="space-y-2">
								{comparisons
									.sort((a, b) => b.summary.finalValue - a.summary.finalValue)
									.map((comparison) => (
										<div key={comparison.strategy} className="flex justify-between items-center">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full" style={{ backgroundColor: STRATEGY_COLORS[comparison.strategy] }} />
												<span className="text-sm font-medium">{STRATEGY_CONFIGS[comparison.strategy].name}</span>
											</div>
											<span className="text-sm font-bold">{formatCurrency(comparison.summary.finalValue)}</span>
										</div>
									))}
							</div>
						</Card>

						<Card className="p-6">
							<div className="flex items-center gap-3 mb-4">
								<TrendingUp className="h-6 w-6 text-blue-600" />
								<h3 className="font-semibold">Total Returns</h3>
							</div>
							<div className="space-y-2">
								{comparisons
									.sort((a, b) => b.summary.totalReturn - a.summary.totalReturn)
									.map((comparison) => (
										<div key={comparison.strategy} className="flex justify-between items-center">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full" style={{ backgroundColor: STRATEGY_COLORS[comparison.strategy] }} />
												<span className="text-sm font-medium">{STRATEGY_CONFIGS[comparison.strategy].name}</span>
											</div>
											<span className="text-sm font-bold">{formatPercentage(comparison.summary.totalReturn)}</span>
										</div>
									))}
							</div>
						</Card>

						<Card className="p-6">
							<div className="flex items-center gap-3 mb-4">
								<Target className="h-6 w-6 text-purple-600" />
								<h3 className="font-semibold">Annualized Returns</h3>
							</div>
							<div className="space-y-2">
								{comparisons
									.sort((a, b) => b.summary.annualizedReturn - a.summary.annualizedReturn)
									.map((comparison) => (
										<div key={comparison.strategy} className="flex justify-between items-center">
											<div className="flex items-center gap-2">
												<div className="w-3 h-3 rounded-full" style={{ backgroundColor: STRATEGY_COLORS[comparison.strategy] }} />
												<span className="text-sm font-medium">{STRATEGY_CONFIGS[comparison.strategy].name}</span>
											</div>
											<span className="text-sm font-bold">{formatPercentage(comparison.summary.annualizedReturn)}</span>
										</div>
									))}
							</div>
						</Card>
					</div>

					{/* Portfolio Value Comparison Chart */}
					<Card className="p-6">
						<h3 className="text-lg font-semibold mb-4">Portfolio Value Comparison</h3>
						<div className="h-96">
							<ResponsiveContainer width="100%" height="100%">
								<LineChart data={chartData}>
									<CartesianGrid strokeDasharray="3 3" className="opacity-30" />
									<XAxis dataKey="year" className="text-xs" tick={{ fontSize: 12 }} />
									<YAxis className="text-xs" tick={{ fontSize: 12 }} tickFormatter={(value) => formatCurrency(value)} />
									<Tooltip content={<CustomTooltip />} />
									<Legend />
									{comparisons.map((comparison) => (
										<Line
											key={comparison.strategy}
											type="monotone"
											dataKey={`${comparison.strategy}_total`}
											stroke={STRATEGY_COLORS[comparison.strategy]}
											strokeWidth={3}
											name={STRATEGY_CONFIGS[comparison.strategy].name}
											dot={false}
											activeDot={{ r: 4, stroke: STRATEGY_COLORS[comparison.strategy], strokeWidth: 2 }}
										/>
									))}
								</LineChart>
							</ResponsiveContainer>
						</div>
					</Card>

					{/* Performance Metrics Table */}
					<Card className="p-6">
						<h3 className="text-lg font-semibold mb-4">Performance Metrics Comparison</h3>
						<div className="overflow-x-auto">
							<table className="w-full text-sm">
								<thead>
									<tr className="border-b">
										<th className="text-left p-2">Strategy</th>
										<th className="text-right p-2">Bitcoin Allocation</th>
										<th className="text-right p-2">Initial Investment</th>
										<th className="text-right p-2">Final Value</th>
										<th className="text-right p-2">Total Return</th>
										<th className="text-right p-2">Annualized Return</th>
										<th className="text-right p-2">Sharpe Ratio</th>
									</tr>
								</thead>
								<tbody>
									{comparisons
										.sort((a, b) => b.summary.finalValue - a.summary.finalValue)
										.map((comparison) => (
											<tr key={comparison.strategy} className="border-b hover:bg-muted/50">
												<td className="p-2">
													<div className="flex items-center gap-2">
														<div
															className="w-3 h-3 rounded-full"
															style={{ backgroundColor: STRATEGY_COLORS[comparison.strategy] }}
														/>
														<span className="font-medium">{STRATEGY_CONFIGS[comparison.strategy].name}</span>
													</div>
												</td>
												<td className="p-2 text-right">{STRATEGY_CONFIGS[comparison.strategy].bitcoinAllocation}%</td>
												<td className="p-2 text-right">{formatCurrency(comparison.assumptions.initialInvestment)}</td>
												<td className="p-2 text-right font-medium">{formatCurrency(comparison.summary.finalValue)}</td>
												<td className="p-2 text-right">{formatPercentage(comparison.summary.totalReturn)}</td>
												<td className="p-2 text-right">{formatPercentage(comparison.summary.annualizedReturn)}</td>
												<td className="p-2 text-right">{comparison.summary.sharpeRatio.toFixed(2)}</td>
											</tr>
										))}
								</tbody>
							</table>
						</div>
					</Card>
				</>
			)}
		</div>
	)
}
