import { Bitcoin24Projection, ChartTooltipProps, ChartDataPoint } from "@/lib/types"
import { formatCurrency, formatPercentage } from "@/lib/utils/bitcoin24.utils"
import { Card } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from "recharts"

interface ProjectionChartProps {
	projection: Bitcoin24Projection
	showRealValue?: boolean
}

export function ProjectionChart({ projection, showRealValue = false }: ProjectionChartProps) {
	// Prepare chart data
	const chartData: ChartDataPoint[] = projection.results.map((result) => ({
		year: result.year,
		totalValue: result.totalValue,
		bitcoinValue: result.bitcoinValue,
		traditionalValue: result.traditionalAssetValue,
		realValue: result.realValue,
		bitcoinPrice: result.bitcoinPrice,
		annualReturn: result.annualReturn
	}))

	// Custom tooltip formatter
	const CustomTooltip = ({ active, payload, label }: ChartTooltipProps) => {
		if (active && payload && payload.length) {
			return (
				<div className="bg-white p-3 border rounded shadow-lg">
					<p className="font-semibold">{`Year ${label}`}</p>
					{payload.map((entry, index) => (
						<p key={index} style={{ color: entry.color }}>
							{`${entry.name}: ${
								entry.dataKey === "bitcoinPrice"
									? formatCurrency(entry.value)
									: entry.dataKey === "annualReturn"
									? formatPercentage(entry.value)
									: formatCurrency(entry.value)
							}`}
						</p>
					))}
				</div>
			)
		}
		return null
	}

	return (
		<div className="space-y-6">
			{/* Portfolio Value Over Time */}
			<Card className="p-6">
				<h3 className="text-lg font-semibold mb-4">Portfolio Value Over Time</h3>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<AreaChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" className="opacity-30" />
							<XAxis dataKey="year" className="text-xs" tick={{ fontSize: 12 }} />
							<YAxis className="text-xs" tick={{ fontSize: 12 }} tickFormatter={(value) => formatCurrency(value)} />
							<Tooltip content={<CustomTooltip />} />
							<Legend />
							<Area
								type="monotone"
								dataKey="traditionalValue"
								stackId="1"
								stroke="#3b82f6"
								fill="#3b82f6"
								fillOpacity={0.6}
								name="Traditional Assets"
							/>
							<Area type="monotone" dataKey="bitcoinValue" stackId="1" stroke="#f97316" fill="#f97316" fillOpacity={0.8} name="Bitcoin" />
							{showRealValue && (
								<Line
									type="monotone"
									dataKey="realValue"
									stroke="#10b981"
									strokeWidth={2}
									strokeDasharray="5 5"
									name="Real Value (Inflation Adjusted)"
									dot={false}
								/>
							)}
						</AreaChart>
					</ResponsiveContainer>
				</div>
			</Card>

			{/* Bitcoin Price Evolution */}
			<Card className="p-6">
				<h3 className="text-lg font-semibold mb-4">Bitcoin Price Evolution</h3>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" className="opacity-30" />
							<XAxis dataKey="year" className="text-xs" tick={{ fontSize: 12 }} />
							<YAxis
								className="text-xs"
								tick={{ fontSize: 12 }}
								tickFormatter={(value) => formatCurrency(value)}
								scale="log"
								domain={["dataMin", "dataMax"]}
							/>
							<Tooltip content={<CustomTooltip />} />
							<Legend />
							<Line
								type="monotone"
								dataKey="bitcoinPrice"
								stroke="#f97316"
								strokeWidth={3}
								name="Bitcoin Price (USD)"
								dot={{ fill: "#f97316", strokeWidth: 2, r: 4 }}
								activeDot={{ r: 6, stroke: "#f97316", strokeWidth: 2 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</div>
			</Card>

			{/* Annual Returns */}
			<Card className="p-6">
				<h3 className="text-lg font-semibold mb-4">Annual Returns</h3>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart data={chartData.slice(1)}>
							{" "}
							{/* Skip year 0 since it has no return */}
							<CartesianGrid strokeDasharray="3 3" className="opacity-30" />
							<XAxis dataKey="year" className="text-xs" tick={{ fontSize: 12 }} />
							<YAxis className="text-xs" tick={{ fontSize: 12 }} tickFormatter={(value) => `${value}%`} />
							<Tooltip formatter={(value: number) => [`${value.toFixed(2)}%`, "Annual Return"]} labelFormatter={(label) => `Year ${label}`} />
							<Legend />
							<Bar dataKey="annualReturn" fill="#8b5cf6" name="Annual Return (%)" radius={[2, 2, 0, 0]} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</Card>

			{/* Asset Allocation Breakdown */}
			<Card className="p-6">
				<h3 className="text-lg font-semibold mb-4">Asset Allocation Over Time</h3>
				<div className="h-80">
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData}>
							<CartesianGrid strokeDasharray="3 3" className="opacity-30" />
							<XAxis dataKey="year" className="text-xs" tick={{ fontSize: 12 }} />
							<YAxis className="text-xs" tick={{ fontSize: 12 }} tickFormatter={(value) => formatCurrency(value)} />
							<Tooltip content={<CustomTooltip />} />
							<Legend />
							<Line type="monotone" dataKey="bitcoinValue" stroke="#f97316" strokeWidth={2} name="Bitcoin Value" dot={false} />
							<Line type="monotone" dataKey="traditionalValue" stroke="#3b82f6" strokeWidth={2} name="Traditional Assets Value" dot={false} />
						</LineChart>
					</ResponsiveContainer>
				</div>
			</Card>
		</div>
	)
}
