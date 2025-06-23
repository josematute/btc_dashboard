/**
 * Format a number to a currency string, with 2 decimals
 *
 * @example
 * formatCurrency(1000) // $1,000.00
 * formatCurrency(1000.5) // $1,000.50
 * formatCurrency(1000.555) // $1,000.56
 * formatCurrency(1000.555, 0) // $1,000
 * formatCurrency(1000.555, 1) // $1,000.6
 * formatCurrency(1000.555, 2) // $1,000.56
 * @param value - The number to format
 * @returns The formatted currency string
 */
export const formatCurrency = (value: number, decimals = 2) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

/**
 * Format a number to a number string, with optional decimals
 *
 * @example
 * formatNumber(1000) // 1,000.00
 * formatNumber(1000.5) // 1,000.50 
 * formatNumber(1000.555) // 1,000.56
 * formatNumber(1000.555, 0) // 1,000
 * formatNumber(1000.555, 1) // 1,000.6
 * formatNumber(1000.555, 2) // 1,000.56
 * @param value - The number to format
 * @param decimals - The number of decimals to display
 * @returns The formatted number string
 */
export const formatNumber = (value: number, decimals = 2) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}
