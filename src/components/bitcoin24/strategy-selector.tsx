"use client"

import { StrategyType } from "@/lib/types"
import { STRATEGY_CONFIGS } from "@/lib/utils/bitcoin24.utils"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Circle } from "lucide-react"

interface StrategySelectorProps {
  selectedStrategy: StrategyType
  onStrategyChange: (strategy: StrategyType) => void
}

export function StrategySelector({ selectedStrategy, onStrategyChange }: StrategySelectorProps) {
  const strategies = Object.values(STRATEGY_CONFIGS)

  const getRiskColor = (riskProfile: string) => {
    switch (riskProfile) {
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200"
      case "extreme":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStrategyIcon = (strategyType: StrategyType) => {
    const isSelected = selectedStrategy === strategyType
    return isSelected ? (
      <CheckCircle2 className="h-5 w-5 text-blue-600" />
    ) : (
      <Circle className="h-5 w-5 text-gray-400" />
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold mb-2">Choose Your Strategy</h2>
        <p className="text-muted-foreground text-sm">
          Select a Bitcoin allocation strategy that matches your risk tolerance and investment goals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {strategies.map((strategy) => {
          const isSelected = selectedStrategy === strategy.type
          
          return (
            <Card
              key={strategy.type}
              className={`p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
                isSelected
                  ? "ring-2 ring-blue-500 border-blue-200 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => onStrategyChange(strategy.type)}
            >
              <div className="space-y-3">
                {/* Header with icon and title */}
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm">{strategy.name}</h3>
                  {getStrategyIcon(strategy.type)}
                </div>

                {/* Description */}
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {strategy.description}
                </p>

                {/* Allocation details */}
                <div className="space-y-2">
                  <div className="text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Bitcoin:</span>
                      <span className="font-medium text-orange-600">
                        {strategy.bitcoinAllocation}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Traditional:</span>
                      <span className="font-medium text-blue-600">
                        {strategy.traditionalAllocation}%
                      </span>
                    </div>
                  </div>

                  {/* Visual allocation bar */}
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full flex">
                      {strategy.bitcoinAllocation > 0 && (
                        <div
                          className="bg-orange-500"
                          style={{ width: `${strategy.bitcoinAllocation}%` }}
                        />
                      )}
                      {strategy.traditionalAllocation > 0 && (
                        <div
                          className="bg-blue-500"
                          style={{ width: `${strategy.traditionalAllocation}%` }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                {/* Risk badge */}
                <div className="flex justify-center">
                  <Badge
                    variant="outline"
                    className={`text-xs ${getRiskColor(strategy.riskProfile)}`}
                  >
                    {strategy.riskProfile.toUpperCase()} RISK
                  </Badge>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {/* Selected strategy summary */}
      {selectedStrategy && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-4 w-4 text-blue-600" />
            <span className="font-medium text-blue-900">
              Selected: {STRATEGY_CONFIGS[selectedStrategy].name}
            </span>
          </div>
          <p className="text-sm text-blue-800">
            {STRATEGY_CONFIGS[selectedStrategy].description} - This strategy allocates{" "}
            <strong>{STRATEGY_CONFIGS[selectedStrategy].bitcoinAllocation}% to Bitcoin</strong>{" "}
            and <strong>{STRATEGY_CONFIGS[selectedStrategy].traditionalAllocation}% to traditional assets</strong>.
          </p>
        </div>
      )}
    </div>
  )
}