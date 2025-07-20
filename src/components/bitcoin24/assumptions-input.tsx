"use client"

import { Bitcoin24Assumptions, ScenarioType } from "@/lib/types"
import { getDefaultAssumptions } from "@/lib/utils/bitcoin24.utils"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { RotateCcw, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AssumptionsInputProps {
	assumptions: Bitcoin24Assumptions
	scenario: ScenarioType
	onAssumptionsChange: (assumptions: Bitcoin24Assumptions) => void
}

export function AssumptionsInput({ assumptions, scenario, onAssumptionsChange }: AssumptionsInputProps) {
	const handleInputChange = (field: keyof Bitcoin24Assumptions, value: number | boolean) => {
		onAssumptionsChange({
			...assumptions,
			[field]: value
		})
	}

	const resetToDefaults = () => {
		onAssumptionsChange(getDefaultAssumptions(scenario))
	}

	const formatCurrency = (value: number): string => {
		return value.toLocaleString("en-US")
	}

	const tooltips = {
		initialInvestment: "The starting amount to be invested across all asset classes",
		annualInflationRate: "Expected annual inflation rate affecting purchasing power",
		traditionalAssetReturn: "Expected annual return from traditional assets (stocks, bonds, etc.)",
		bitcoinAllocation: "Percentage of total portfolio allocated to Bitcoin",
		bitcoinAnnualGrowthRate: "Expected annual growth rate for Bitcoin price",
		adoptionTimeline: "Number of years for Bitcoin to reach mainstream adoption",
		volatilityFactor: "Multiplier for Bitcoin price volatility (1.0 = normal, >1.0 = higher volatility)",
		regulatoryRisk: "Percentage impact of potential regulatory headwinds",
		technologyRisk: "Percentage impact of potential technology issues",
		taxRate: "Tax rate applied to investment gains",
		inflationHedge: "Whether Bitcoin acts as a hedge against inflation",
		dollarCostAveraging: "Whether to use dollar-cost averaging investment strategy"
	}

	const InfoTooltip = ({ field }: { field: keyof Bitcoin24Assumptions }) => (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<Info className="h-4 w-4 text-muted-foreground hover:text-foreground cursor-help" />
				</TooltipTrigger>
				<TooltipContent className="max-w-xs">
					<p className="text-sm">{tooltips[field]}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)

	return (
		<div className="space-y-6">
			<div className="flex items-center justify-between">
				<div>
					<h2 className="text-xl font-semibold">Flexible Assumptions</h2>
					<p className="text-muted-foreground text-sm mt-1">Customize the parameters for your 21-year Bitcoin projection</p>
				</div>
				<Button variant="outline" size="sm" onClick={resetToDefaults} className="flex items-center gap-2">
					<RotateCcw className="h-4 w-4" />
					Reset to Defaults
				</Button>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Economic Parameters */}
				<Card className="p-6">
					<h3 className="font-semibold mb-4 flex items-center gap-2">Economic Parameters</h3>
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="initialInvestment">Initial Investment ($)</Label>
								<InfoTooltip field="initialInvestment" />
							</div>
							<Input
								id="initialInvestment"
								type="number"
								value={assumptions.initialInvestment}
								onChange={(e) => handleInputChange("initialInvestment", Number(e.target.value))}
								placeholder="100000"
								className="font-mono"
							/>
							<p className="text-xs text-muted-foreground">${formatCurrency(assumptions.initialInvestment)}</p>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="annualInflationRate">Annual Inflation Rate (%)</Label>
								<InfoTooltip field="annualInflationRate" />
							</div>
							<Input
								id="annualInflationRate"
								type="number"
								step="0.1"
								value={assumptions.annualInflationRate}
								onChange={(e) => handleInputChange("annualInflationRate", Number(e.target.value))}
								placeholder="3.0"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="traditionalAssetReturn">Traditional Asset Return (%)</Label>
								<InfoTooltip field="traditionalAssetReturn" />
							</div>
							<Input
								id="traditionalAssetReturn"
								type="number"
								step="0.1"
								value={assumptions.traditionalAssetReturn}
								onChange={(e) => handleInputChange("traditionalAssetReturn", Number(e.target.value))}
								placeholder="7.0"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="taxRate">Tax Rate (%)</Label>
								<InfoTooltip field="taxRate" />
							</div>
							<Input
								id="taxRate"
								type="number"
								step="0.1"
								value={assumptions.taxRate}
								onChange={(e) => handleInputChange("taxRate", Number(e.target.value))}
								placeholder="25"
							/>
						</div>
					</div>
				</Card>

				{/* Bitcoin Parameters */}
				<Card className="p-6">
					<h3 className="font-semibold mb-4">Bitcoin Parameters</h3>
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="bitcoinAllocation">Bitcoin Allocation (%)</Label>
								<InfoTooltip field="bitcoinAllocation" />
							</div>
							<Input
								id="bitcoinAllocation"
								type="number"
								step="0.1"
								min="0"
								max="100"
								value={assumptions.bitcoinAllocation}
								onChange={(e) => handleInputChange("bitcoinAllocation", Number(e.target.value))}
								placeholder="10"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="bitcoinAnnualGrowthRate">Bitcoin Annual Growth (%)</Label>
								<InfoTooltip field="bitcoinAnnualGrowthRate" />
							</div>
							<Input
								id="bitcoinAnnualGrowthRate"
								type="number"
								step="0.1"
								value={assumptions.bitcoinAnnualGrowthRate}
								onChange={(e) => handleInputChange("bitcoinAnnualGrowthRate", Number(e.target.value))}
								placeholder="20"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="adoptionTimeline">Adoption Timeline (years)</Label>
								<InfoTooltip field="adoptionTimeline" />
							</div>
							<Input
								id="adoptionTimeline"
								type="number"
								min="1"
								max="21"
								value={assumptions.adoptionTimeline}
								onChange={(e) => handleInputChange("adoptionTimeline", Number(e.target.value))}
								placeholder="10"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="volatilityFactor">Volatility Factor</Label>
								<InfoTooltip field="volatilityFactor" />
							</div>
							<Input
								id="volatilityFactor"
								type="number"
								step="0.1"
								min="0.1"
								max="3.0"
								value={assumptions.volatilityFactor}
								onChange={(e) => handleInputChange("volatilityFactor", Number(e.target.value))}
								placeholder="1.0"
							/>
						</div>
					</div>
				</Card>

				{/* Risk Parameters */}
				<Card className="p-6">
					<h3 className="font-semibold mb-4">Risk Parameters</h3>
					<div className="space-y-4">
						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="regulatoryRisk">Regulatory Risk (%)</Label>
								<InfoTooltip field="regulatoryRisk" />
							</div>
							<Input
								id="regulatoryRisk"
								type="number"
								step="0.1"
								min="0"
								max="50"
								value={assumptions.regulatoryRisk}
								onChange={(e) => handleInputChange("regulatoryRisk", Number(e.target.value))}
								placeholder="0"
							/>
						</div>

						<div className="space-y-2">
							<div className="flex items-center gap-2">
								<Label htmlFor="technologyRisk">Technology Risk (%)</Label>
								<InfoTooltip field="technologyRisk" />
							</div>
							<Input
								id="technologyRisk"
								type="number"
								step="0.1"
								min="0"
								max="50"
								value={assumptions.technologyRisk}
								onChange={(e) => handleInputChange("technologyRisk", Number(e.target.value))}
								placeholder="0"
							/>
						</div>
					</div>
				</Card>

				{/* Strategy Options */}
				<Card className="p-6">
					<h3 className="font-semibold mb-4">Strategy Options</h3>
					<div className="space-y-4">
						<div className="flex items-center space-x-2">
							<Checkbox
								id="inflationHedge"
								checked={assumptions.inflationHedge}
								onCheckedChange={(checked) => handleInputChange("inflationHedge", !!checked)}
							/>
							<div className="flex items-center gap-2">
								<Label htmlFor="inflationHedge" className="cursor-pointer">
									Bitcoin as Inflation Hedge
								</Label>
								<InfoTooltip field="inflationHedge" />
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox
								id="dollarCostAveraging"
								checked={assumptions.dollarCostAveraging}
								onCheckedChange={(checked) => handleInputChange("dollarCostAveraging", !!checked)}
							/>
							<div className="flex items-center gap-2">
								<Label htmlFor="dollarCostAveraging" className="cursor-pointer">
									Dollar Cost Averaging
								</Label>
								<InfoTooltip field="dollarCostAveraging" />
							</div>
						</div>
					</div>
				</Card>
			</div>
		</div>
	)
}
