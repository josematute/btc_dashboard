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



/**
 * Format a number with commas, preserving significant digits
 *
 * @example
 * formatWithCommas("1000") // "1,000"
 * formatWithCommas("1000.5") // "1,000.5"
 * formatWithCommas("1000.555") // "1,000.56"
 * formatWithCommas("1000.555", true) // "1,000.555"
 * formatWithCommas("0.00000001") // "0.00000001"
 * formatWithCommas("0.00000001", true) // "0.00000001"
 *
 * @param value - The number to format
 * @param preserveSignificantDigits - Whether to preserve significant digits
 * @returns The formatted number string
 */
export const formatWithCommas = (value: string, preserveSignificantDigits?: boolean): string => {
  // Remove existing commas
  const cleanValue = value.replace(/,/g, "")

  // If empty or just a decimal point, return as is
  if (!cleanValue || cleanValue === ".") return cleanValue

  // If preserveSignificantDigits is true, keep all significant digits
  let processedValue = cleanValue
  if (preserveSignificantDigits) {
    const num = Number.parseFloat(cleanValue)
    if (!isNaN(num)) {
      // Custom formatting based on value size
      if (Math.abs(num) >= 1) {
        // For numbers >= 1, limit to 2 decimal places
        processedValue = parseFloat(num.toFixed(2)).toString()
      } else if (num === 0) {
        processedValue = "0"
      } else {
        // For numbers < 1, show leading zeros + first 2 non-zero digits
        // Use toFixed with high precision to avoid scientific notation
        const numStr = num.toFixed(20).replace(/\.?0+$/, "")
        const [, decimal] = numStr.split(".")

        if (decimal) {
          // Find the first non-zero digit
          let firstNonZeroIndex = -1
          for (let i = 0; i < decimal.length; i++) {
            if (decimal[i] !== "0") {
              firstNonZeroIndex = i
              break
            }
          }

          if (firstNonZeroIndex !== -1) {
            // Take leading zeros + first 2 non-zero digits
            const leadingZeros = decimal.substring(0, firstNonZeroIndex)
            const nonZeroDigits = decimal.substring(firstNonZeroIndex)
            const firstTwoNonZero = nonZeroDigits.substring(0, 2)

            processedValue = `0.${leadingZeros}${firstTwoNonZero}`
          } else {
            processedValue = "0"
          }
        } else {
          processedValue = numStr
        }
      }
    }
  }

  // Split by decimal point
  const parts = processedValue.split(".")

  // Format the integer part with commas
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  // Join back with decimal if it exists
  return parts.join(".")
}
