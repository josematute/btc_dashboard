import { defaultBTCAGRValues } from "../mocks/fcf-calculator-mocks"
import { YearData } from "../types"

interface CalculateYearDataParams {
  holdings: number
  startingPrice: number
  startingYear: number
  interestRate: number
  desiredCashflow: number
  age: number
}

export const getCurrentYear = () => {
  return new Date().getFullYear()
}

export const calculateYearData = ({ holdings, startingPrice, startingYear, interestRate, desiredCashflow, age }: CalculateYearDataParams): YearData[] => {
  const currentYear = getCurrentYear()

  const data: YearData[] = []
  let currentValue = holdings * startingPrice
  let currentPrice = startingPrice

  for (let year = currentYear; year <= 2050; year++) {
    const isBeforeStarting = year < startingYear
    const agr = defaultBTCAGRValues[year] || 0
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

  return data
}

/**
 * Returns an array of years from the current year to 2049
 * @returns Array of years from the current year to 2049
 */
export const getYearsUntil2049 = () => {
  const currentYear = getCurrentYear()
  return Array.from({ length: 25 }, (_, i) => currentYear + i) // 2025-2049
}

interface UpdateBitcoinAGRParams {
  year: number
  newAGR: number
  yearData: YearData[]
  holdings: number
  startingYear: number
  interestRate: number
  desiredCashflow: number
}

export const updateBitcoinAGR = ({ year, newAGR, yearData, holdings, startingYear, interestRate, desiredCashflow }: UpdateBitcoinAGRParams): YearData[] => {
  const updatedData = [...yearData] as YearData[]
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

  return updatedData
}
