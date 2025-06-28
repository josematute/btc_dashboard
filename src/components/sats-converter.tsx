"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bitcoin } from "lucide-react"

const SATS_PER_BTC = 100000000
const DEFAULT_USD_VALUE = "100"

interface SatsConverterProps {
	btcPrice: number
}

export default function SatsConverter({ btcPrice }: SatsConverterProps) {
	const [usdValue, setUsdValue] = useState<string>(DEFAULT_USD_VALUE)
	const [btcValue, setBtcValue] = useState<string>("")
	const [satsValue, setSatsValue] = useState<string>("")

	const [useCustomPrice, setUseCustomPrice] = useState<boolean>(false)
	const [customPrice, setCustomPrice] = useState<string>(btcPrice.toString())
	const [lastChanged, setLastChanged] = useState<string>("usd")

	const effectivePrice = useCustomPrice ? Number.parseFloat(customPrice.replace(/,/g, "")) || btcPrice : btcPrice

	// Format number with commas, preserving significant digits
	const formatWithCommas = (value: string, preserveSignificantDigits?: boolean): string => {
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

	// Validate and format input
	const handleInputChange = (value: string, setValue: (val: string) => void, source: string) => {
		// Remove any non-digit, non-decimal, non-comma characters
		const cleaned = value.replace(/[^0-9.,]/g, "")

		// Remove commas for processing
		let withoutCommas = cleaned.replace(/,/g, "")

		// Ensure only one decimal point
		const parts = withoutCommas.split(".")
		if (parts.length > 2) {
			withoutCommas = parts[0] + "." + parts.slice(1).join("")
		}

		// Format with commas
		const formatted = formatWithCommas(withoutCommas)

		// Set the value
		setValue(formatted)

		// Calculate other values
		calculateValues(source, withoutCommas)
	}

	// Calculate other values based on source
	const calculateValues = (source: string, rawValue: string) => {
		const numValue = Number.parseFloat(rawValue) || 0

		if (source === "usd") {
			const btc = numValue / effectivePrice
			const sats = btc * SATS_PER_BTC

			setBtcValue(formatWithCommas(btc.toString(), true))
			setSatsValue(formatWithCommas(Math.round(sats).toString()))
		} else if (source === "btc") {
			const usd = numValue * effectivePrice
			const sats = numValue * SATS_PER_BTC

			setUsdValue(formatWithCommas(usd.toString(), true))
			setSatsValue(formatWithCommas(Math.round(sats).toString()))
		} else if (source === "sats") {
			const btc = numValue / SATS_PER_BTC
			const usd = btc * effectivePrice

			setUsdValue(formatWithCommas(usd.toString(), true))
			setBtcValue(formatWithCommas(btc.toString(), true))
		}
	}

	// Initialize values
	useEffect(() => {
		calculateValues("usd", "100")
	}, [effectivePrice])

	const handleCustomPriceChange = (value: string) => {
		handleInputChange(value, setCustomPrice, "price")
		if (useCustomPrice) {
			const currentSource = lastChanged
			const currentValue = currentSource === "usd" ? usdValue : currentSource === "btc" ? btcValue : satsValue
			calculateValues(currentSource, currentValue.replace(/,/g, ""))
		}
	}

	return (
		<div className="flex items-center justify-center px-4 py-8" data-testid="sats-converter">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex items-center justify-center gap-2 mb-2">
						<Bitcoin className="h-7 w-7 text-orange-500" />
						<CardTitle className="text-3xl font-bold">Sats Converter</CardTitle>
					</div>
					<CardDescription className="text-lg">
						Simple satoshi to USD converter. Convert between Bitcoin, satoshis, and US dollars instantly.
					</CardDescription>
					<div className="text-base text-muted-foreground mt-2">
						{!useCustomPrice ? (
							<>
								Bitcoin Price: <span className="font-semibold text-orange-600">${btcPrice.toLocaleString()}</span>
								<span className="text-xs block mt-1">(Live CoinGecko Price)</span>
							</>
						) : (
							<>
								Using Custom Price: <span className="font-semibold text-blue-600">${formatWithCommas(customPrice)}</span>
							</>
						)}
					</div>

					{/* Custom Price Toggle */}
					<div className="mt-4 space-y-3">
						<div className="flex items-center gap-2">
							<input
								type="checkbox"
								id="useCustomPrice"
								checked={useCustomPrice}
								onChange={(e) => setUseCustomPrice(e.target.checked)}
								className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
							/>
							<label htmlFor="useCustomPrice" className="text-sm font-medium cursor-pointer">
								Use custom Bitcoin price
							</label>
						</div>

						{useCustomPrice && (
							<div className="space-y-2">
								<Label htmlFor="customPrice" className="text-sm font-medium">
									Custom BTC Price (USD)
								</Label>
								<div className="relative">
									<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
									<Input
										id="customPrice"
										type="text"
										value={customPrice}
										onChange={(e) => handleCustomPriceChange(e.target.value)}
										className="pl-8 h-12"
										placeholder="100,000"
									/>
								</div>
							</div>
						)}
					</div>
				</CardHeader>

				<CardContent className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="usd" className="text-base font-medium">
							US Dollars (USD)
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
							<Input
								id="usd"
								type="text"
								value={usdValue}
								onChange={(e) => {
									setLastChanged("usd")
									handleInputChange(e.target.value, setUsdValue, "usd")
								}}
								className="pl-8 h-12"
								placeholder="100"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="btc" className="text-base font-medium">
							Bitcoin (BTC)
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₿</span>
							<Input
								id="btc"
								type="text"
								value={btcValue}
								onChange={(e) => {
									setLastChanged("btc")
									handleInputChange(e.target.value, setBtcValue, "btc")
								}}
								className="pl-8 h-12"
								placeholder="0.001"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="sats" className="text-base font-medium">
							Satoshis (sats)
						</Label>
						<Input
							id="sats"
							type="text"
							value={satsValue}
							onChange={(e) => {
								setLastChanged("sats")
								handleInputChange(e.target.value, setSatsValue, "sats")
							}}
							placeholder="100,000"
							className="h-12"
						/>
					</div>

					<div className="text-sm text-muted-foreground text-center pt-4 border-t">
						<p>1 BTC = 100,000,000 satoshis</p>
						<p>
							1 satoshi = ${((1 / SATS_PER_BTC) * effectivePrice).toFixed(8)} (at {useCustomPrice ? "custom" : "current"} price)
						</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
