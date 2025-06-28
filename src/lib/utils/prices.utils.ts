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

/**
 * Format a number with commas but no fixed decimals
 *
 * @example
 * formatWithCommas(1000) // 1,000
 * formatWithCommas(1000.5) // 1,000.5
 * formatWithCommas(1000.555) // 1,000.555
 * formatWithCommas("1000.555") // 1,000.555
 * @param value - The number or string to format
 * @returns The formatted number string with commas
 */
export const formatWithCommas = (value: string | number): string => {
  const num = typeof value === "string" ? parseFloat(value) : value
  if (isNaN(num)) return ""
  return num.toLocaleString("en-US", { maximumFractionDigits: 8 })
}

/**
 * Format Bitcoin with conditional comma formatting
 * Only adds commas for values >= 100, otherwise returns as string
 *
 * @example
 * formatBitcoin(1000.555) // 1,000.555
 * formatBitcoin(99.555) // 99.555
 * formatBitcoin("50.123") // 50.123
 * @param value - The number or string to format
 * @returns The formatted Bitcoin string
 */
export const formatBitcoin = (value: string | number): string => {
  const num = typeof value === "string" ? parseFloat(value) : value
  if (isNaN(num)) return ""
  // Only format with commas if value is 100 or greater
  if (num >= 100) {
    return num.toLocaleString("en-US", { maximumFractionDigits: 8 })
  }
  // For values under 100, return as string without comma formatting
  return num.toString()
}

/**
 * Parse a comma-formatted string to a number
 *
 * @example
 * parseFormattedNumber("1,000.50") // 1000.5
 * parseFormattedNumber("1000") // 1000
 * parseFormattedNumber("invalid") // 0
 * @param value - The comma-formatted string to parse
 * @returns The parsed number, or 0 if invalid
 */
export const parseFormattedNumber = (value: string): number => {
  return parseFloat(value.replace(/,/g, "")) || 0
}
