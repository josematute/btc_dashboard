import {
  StrategyType,
  ScenarioType,
  Bitcoin24Assumptions,
  Bitcoin24Result,
  Bitcoin24Projection,
  StrategyConfig,
  ScenarioConfig
} from "@/lib/types"

// Strategy configurations with predefined allocations
export const STRATEGY_CONFIGS: Record<StrategyType, StrategyConfig> = {
  normie: {
    type: "normie",
    name: "Normie",
    description: "Traditional portfolio with no Bitcoin exposure",
    bitcoinAllocation: 0,
    traditionalAllocation: 100,
    riskProfile: "low"
  },
  btc10: {
    type: "btc10",
    name: "BTC 10%",
    description: "Conservative Bitcoin allocation at 10%",
    bitcoinAllocation: 10,
    traditionalAllocation: 90,
    riskProfile: "medium"
  },
  btc_maxi: {
    type: "btc_maxi",
    name: "BTC Maxi",
    description: "Bitcoin maximalist approach with 80% allocation",
    bitcoinAllocation: 80,
    traditionalAllocation: 20,
    riskProfile: "high"
  },
  double_maxi: {
    type: "double_maxi",
    name: "Double Maxi",
    description: "Aggressive Bitcoin strategy with 90% allocation",
    bitcoinAllocation: 90,
    traditionalAllocation: 10,
    riskProfile: "extreme"
  },
  triple_maxi: {
    type: "triple_maxi",
    name: "Triple Maxi",
    description: "All-in Bitcoin strategy with 95% allocation",
    bitcoinAllocation: 95,
    traditionalAllocation: 5,
    riskProfile: "extreme"
  }
}

// Scenario configurations with different parameters
export const SCENARIO_CONFIGS: Record<ScenarioType, ScenarioConfig> = {
  individual: {
    type: "individual",
    name: "Individual",
    description: "Personal investment strategy",
    defaultInvestment: 100000,
    timeHorizon: 21,
    riskTolerance: "moderate"
  },
  corporate: {
    type: "corporate",
    name: "Corporate",
    description: "Corporate treasury management",
    defaultInvestment: 10000000,
    timeHorizon: 21,
    riskTolerance: "conservative"
  },
  institution: {
    type: "institution",
    name: "Institution",
    description: "Institutional investment approach",
    defaultInvestment: 100000000,
    timeHorizon: 21,
    riskTolerance: "moderate"
  },
  nation_state: {
    type: "nation_state",
    name: "Nation State",
    description: "National reserve strategy",
    defaultInvestment: 1000000000,
    timeHorizon: 21,
    riskTolerance: "conservative"
  }
}

// Default assumptions for different scenarios
export function getDefaultAssumptions(scenario: ScenarioType): Bitcoin24Assumptions {
  const config = SCENARIO_CONFIGS[scenario]

  const baseAssumptions: Bitcoin24Assumptions = {
    initialInvestment: config.defaultInvestment,
    annualInflationRate: 3.0,
    traditionalAssetReturn: 7.0,
    bitcoinAllocation: 10,
    bitcoinAnnualGrowthRate: 20.0,
    adoptionTimeline: 10,
    volatilityFactor: 1.0,
    regulatoryRisk: 0,
    technologyRisk: 0,
    taxRate: 25,
    inflationHedge: true,
    dollarCostAveraging: false
  }

  // Adjust based on scenario type
  switch (scenario) {
    case "corporate":
      return {
        ...baseAssumptions,
        bitcoinAnnualGrowthRate: 18.0,
        taxRate: 21, // Corporate tax rate
        dollarCostAveraging: true
      }
    case "institution":
      return {
        ...baseAssumptions,
        bitcoinAnnualGrowthRate: 15.0,
        taxRate: 21,
        regulatoryRisk: 5,
        dollarCostAveraging: true
      }
    case "nation_state":
      return {
        ...baseAssumptions,
        bitcoinAnnualGrowthRate: 12.0,
        taxRate: 0, // Sovereign entities
        regulatoryRisk: 10,
        technologyRisk: 5
      }
    default:
      return baseAssumptions
  }
}

// Calculate Bitcoin price growth over time
function calculateBitcoinPrice(year: number, assumptions: Bitcoin24Assumptions, currentPrice = 70000): number {
  const { bitcoinAnnualGrowthRate, adoptionTimeline, volatilityFactor } = assumptions

  // Sigmoid adoption curve - growth slows as adoption matures
  const adoptionProgress = Math.min(year / adoptionTimeline, 1)
  const adoptionCurve = 1 / (1 + Math.exp(-10 * (adoptionProgress - 0.5)))

  // Apply diminishing returns over time
  const diminishingFactor = Math.pow(0.95, Math.max(0, year - 10))
  const adjustedGrowthRate = bitcoinAnnualGrowthRate * adoptionCurve * diminishingFactor

  // Calculate compound growth
  const price = currentPrice * Math.pow(1 + adjustedGrowthRate / 100, year)

  // Apply volatility (simplified - real implementation would need stochastic modeling)
  return price * volatilityFactor
}

// Calculate traditional asset value with inflation
function calculateTraditionalAssetValue(
  year: number,
  initialValue: number,
  assumptions: Bitcoin24Assumptions
): number {
  const { traditionalAssetReturn } = assumptions
  return initialValue * Math.pow(1 + traditionalAssetReturn / 100, year)
}

// Calculate Bitcoin investment value
function calculateBitcoinValue(
  year: number,
  initialBitcoinInvestment: number,
  assumptions: Bitcoin24Assumptions
): number {
  if (initialBitcoinInvestment === 0) return 0

  const currentPrice = 70000 // Current BTC price - could be fetched dynamically
  const initialBtcAmount = initialBitcoinInvestment / currentPrice
  const futurePrice = calculateBitcoinPrice(year, assumptions, currentPrice)

  return initialBtcAmount * futurePrice
}

// Calculate real value adjusted for inflation
function calculateRealValue(nominalValue: number, year: number, inflationRate: number): number {
  return nominalValue / Math.pow(1 + inflationRate / 100, year)
}

// Main projection calculation function
export function calculateBitcoin24Projection(
  strategy: StrategyType,
  scenario: ScenarioType,
  assumptions: Bitcoin24Assumptions
): Bitcoin24Projection {
  const strategyConfig = STRATEGY_CONFIGS[strategy]
  const results: Bitcoin24Result[] = []

  // Calculate initial allocations
  const initialBitcoinInvestment = (assumptions.initialInvestment * strategyConfig.bitcoinAllocation) / 100
  const initialTraditionalInvestment = (assumptions.initialInvestment * strategyConfig.traditionalAllocation) / 100

  // Calculate projections for each year
  for (let year = 0; year <= 21; year++) {
    const traditionalValue = calculateTraditionalAssetValue(year, initialTraditionalInvestment, assumptions)
    const bitcoinValue = calculateBitcoinValue(year, initialBitcoinInvestment, assumptions)
    const totalValue = traditionalValue + bitcoinValue
    const realValue = calculateRealValue(totalValue, year, assumptions.annualInflationRate)
    const bitcoinPrice = year === 0 ? 70000 : calculateBitcoinPrice(year, assumptions)

    const cumulativeGain = year === 0 ? 0 : ((totalValue - assumptions.initialInvestment) / assumptions.initialInvestment) * 100
    const annualReturn = year === 0 ? 0 : Math.pow(totalValue / assumptions.initialInvestment, 1 / year) - 1

    results.push({
      year,
      traditionalAssetValue: traditionalValue,
      bitcoinValue,
      totalValue,
      realValue,
      bitcoinPrice,
      cumulativeGain,
      annualReturn: annualReturn * 100
    })
  }

  // Calculate summary statistics
  const finalResult = results[results.length - 1]
  const finalValue = finalResult.totalValue
  const totalReturn = ((finalValue - assumptions.initialInvestment) / assumptions.initialInvestment) * 100
  const annualizedReturn = Math.pow(finalValue / assumptions.initialInvestment, 1 / 21) - 1

  // Calculate max drawdown (simplified - assumes some volatility)
  const maxDrawdown = strategyConfig.bitcoinAllocation * 0.8 // Simplified calculation

  // Calculate Sharpe ratio (simplified)
  const excessReturn = annualizedReturn - 0.03 // Assuming 3% risk-free rate
  const volatility = strategyConfig.bitcoinAllocation * 0.01 + 0.05 // Simplified volatility calculation
  const sharpeRatio = excessReturn / volatility

  return {
    strategy,
    scenario,
    assumptions,
    results,
    summary: {
      finalValue,
      totalReturn,
      annualizedReturn: annualizedReturn * 100,
      maxDrawdown,
      sharpeRatio,
      bitcoinFinalPrice: finalResult.bitcoinPrice
    }
  }
}

// Compare multiple strategies
export function compareStrategies(
  strategies: StrategyType[],
  scenario: ScenarioType,
  assumptions: Bitcoin24Assumptions
): Bitcoin24Projection[] {
  return strategies.map(strategy => calculateBitcoin24Projection(strategy, scenario, assumptions))
}

// Format currency values
export function formatCurrency(value: number): string {
  if (value >= 1e12) {
    return `$${(value / 1e12).toFixed(2)}T`
  } else if (value >= 1e9) {
    return `$${(value / 1e9).toFixed(2)}B`
  } else if (value >= 1e6) {
    return `$${(value / 1e6).toFixed(2)}M`
  } else if (value >= 1e3) {
    return `$${(value / 1e3).toFixed(0)}K`
  } else {
    return `$${value.toFixed(0)}`
  }
}

// Format percentage values
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`
}
