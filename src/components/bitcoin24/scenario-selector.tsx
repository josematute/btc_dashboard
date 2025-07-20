"use client"

import { ScenarioType } from "@/lib/types"
import { SCENARIO_CONFIGS, formatCurrency } from "@/lib/utils/bitcoin24.utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle, User, Building2, Landmark, Flag } from "lucide-react"

interface ScenarioSelectorProps {
	selectedScenario: ScenarioType
	onScenarioChange: (scenario: ScenarioType) => void
}

export function ScenarioSelector({ selectedScenario, onScenarioChange }: ScenarioSelectorProps) {
	const scenarios = Object.values(SCENARIO_CONFIGS)

	const getScenarioIcon = (scenarioType: ScenarioType, isSelected: boolean) => {
		const iconClass = `h-6 w-6 ${isSelected ? "text-blue-600" : "text-gray-400"}`

		switch (scenarioType) {
			case "individual":
				return <User className={iconClass} />
			case "corporate":
				return <Building2 className={iconClass} />
			case "institution":
				return <Landmark className={iconClass} />
			case "nation_state":
				return <Flag className={iconClass} />
			default:
				return <Circle className={iconClass} />
		}
	}

	const getToleranceColor = (tolerance: string) => {
		switch (tolerance) {
			case "conservative":
				return "bg-green-100 text-green-800 border-green-200"
			case "moderate":
				return "bg-yellow-100 text-yellow-800 border-yellow-200"
			case "aggressive":
				return "bg-red-100 text-red-800 border-red-200"
			default:
				return "bg-gray-100 text-gray-800 border-gray-200"
		}
	}

	const getSelectionIcon = (scenarioType: ScenarioType) => {
		const isSelected = selectedScenario === scenarioType
		return isSelected ? <CheckCircle2 className="h-5 w-5 text-blue-600" /> : <Circle className="h-5 w-5 text-gray-400" />
	}

	return (
		<div className="space-y-4">
			<div>
				<h2 className="text-xl font-semibold mb-2">Select Scenario Type</h2>
				<p className="text-muted-foreground text-sm">Choose the type of entity that best represents your investment scenario.</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
				{scenarios.map((scenario) => {
					const isSelected = selectedScenario === scenario.type

					return (
						<Card
							key={scenario.type}
							className={`p-5 cursor-pointer transition-all duration-200 hover:shadow-md ${
								isSelected ? "ring-2 ring-blue-500 border-blue-200 bg-blue-50" : "border-gray-200 hover:border-gray-300"
							}`}
							onClick={() => onScenarioChange(scenario.type)}>
							<div className="space-y-4">
								{/* Header with icon and selection indicator */}
								<div className="flex items-center justify-between">
									{getScenarioIcon(scenario.type, isSelected)}
									{getSelectionIcon(scenario.type)}
								</div>

								{/* Title and description */}
								<div className="space-y-2">
									<h3 className="font-semibold text-base">{scenario.name}</h3>
									<p className="text-sm text-muted-foreground leading-relaxed">{scenario.description}</p>
								</div>

								{/* Scenario details */}
								<div className="space-y-3">
									<div className="text-sm">
										<div className="flex justify-between items-center">
											<span className="text-muted-foreground">Default Investment:</span>
											<span className="font-medium">{formatCurrency(scenario.defaultInvestment)}</span>
										</div>
										<div className="flex justify-between items-center">
											<span className="text-muted-foreground">Time Horizon:</span>
											<span className="font-medium">{scenario.timeHorizon} years</span>
										</div>
									</div>

									{/* Risk tolerance badge */}
									<div className="flex justify-center">
										<Badge variant="outline" className={`text-xs ${getToleranceColor(scenario.riskTolerance)}`}>
											{scenario.riskTolerance.toUpperCase()}
										</Badge>
									</div>
								</div>
							</div>
						</Card>
					)
				})}
			</div>

			{/* Selected scenario summary */}
			{selectedScenario && (
				<div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
					<div className="flex items-center gap-2 mb-2">
						<CheckCircle2 className="h-4 w-4 text-blue-600" />
						<span className="font-medium text-blue-900">Selected: {SCENARIO_CONFIGS[selectedScenario].name}</span>
					</div>
					<div className="text-sm text-blue-800">
						<p className="mb-1">
							{SCENARIO_CONFIGS[selectedScenario].description} with a <strong>{SCENARIO_CONFIGS[selectedScenario].riskTolerance}</strong> risk
							tolerance.
						</p>
						<p>
							Default investment amount: <strong>{formatCurrency(SCENARIO_CONFIGS[selectedScenario].defaultInvestment)}</strong> over a{" "}
							<strong>{SCENARIO_CONFIGS[selectedScenario].timeHorizon}-year</strong> period.
						</p>
					</div>
				</div>
			)}
		</div>
	)
}
