"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bitcoin } from "lucide-react"
import { SATS_PER_BTC, BITCOIN_IMAGE_PATH, SATS_IMAGE_PATH, USD_IMAGE_PATH } from "@/lib/constants"
import Image from "next/image"

interface SatsConverterProps {
	btcPrice: number
}

// Helper function to format number with commas
const formatWithCommas = (value: string | number): string => {
	const num = typeof value === "string" ? parseFloat(value) : value
	if (isNaN(num)) return ""
	return num.toLocaleString("en-US", { maximumFractionDigits: 8 })
}

// Helper function to format Bitcoin with conditional comma formatting
const formatBitcoin = (value: string | number): string => {
	const num = typeof value === "string" ? parseFloat(value) : value
	if (isNaN(num)) return ""
	// Only format with commas if value is 100 or greater
	if (num >= 100) {
		return num.toLocaleString("en-US", { maximumFractionDigits: 8 })
	}
	// For values under 100, return as string without comma formatting
	return num.toString()
}

// Helper function to parse comma-formatted string to number
const parseFormattedNumber = (value: string): number => {
	return parseFloat(value.replace(/,/g, "")) || 0
}

export default function SatsConverter({ btcPrice }: SatsConverterProps) {
	const [usd, setUsd] = useState("100")
	const [sats, setSats] = useState("10,000,000")
	const [btcDisplay, setBtcDisplay] = useState("0.001") // Raw display value for BTC input
	const [useCustomPrice, setUseCustomPrice] = useState(false)
	const [customPrice, setCustomPrice] = useState(formatWithCommas(btcPrice))

	// Get the current effective price (custom or real)
	const effectivePrice = useCustomPrice ? parseFormattedNumber(customPrice) || btcPrice : btcPrice

	const handleUsdChange = (value: string) => {
		const cleanValue = value.replace(/,/g, "")
		setUsd(cleanValue)
		const usdValue = parseFloat(cleanValue) || 0
		const btcValue = usdValue / effectivePrice
		const satsValue = btcValue * SATS_PER_BTC

		const btcResult = btcValue.toFixed(8)
		setBtcDisplay(formatBitcoin(btcResult))
		setSats(formatWithCommas(Math.round(satsValue)))
	}

	const handleSatsChange = (value: string) => {
		const cleanValue = value.replace(/,/g, "")
		setSats(formatWithCommas(cleanValue))
		const satsValue = parseFloat(cleanValue) || 0
		const btcValue = satsValue / SATS_PER_BTC
		const usdValue = btcValue * effectivePrice

		const btcResult = btcValue.toFixed(8)
		setBtcDisplay(formatBitcoin(btcResult))
		setUsd(usdValue.toFixed(2))
	}

	const handleBtcChange = (value: string) => {
		const cleanValue = value.replace(/,/g, "")
		setBtcDisplay(value) // Store the raw input for display
		const btcValue = parseFloat(cleanValue) || 0
		const usdValue = btcValue * effectivePrice
		const satsValue = btcValue * SATS_PER_BTC

		setUsd(usdValue.toFixed(2))
		setSats(formatWithCommas(Math.round(satsValue)))
	}

	const handleCustomPriceToggle = (checked: boolean) => {
		setUseCustomPrice(checked)
		if (checked && parseFormattedNumber(customPrice) !== btcPrice) {
			// Recalculate with custom price
			const usdValue = parseFloat(usd) || 0
			const newEffectivePrice = parseFormattedNumber(customPrice) || btcPrice
			const btcValue = usdValue / newEffectivePrice
			const satsValue = btcValue * SATS_PER_BTC

			const btcResult = btcValue.toFixed(8)
			setBtcDisplay(formatBitcoin(btcResult))
			setSats(formatWithCommas(Math.round(satsValue)))
		} else if (!checked) {
			// Recalculate with real price
			const usdValue = parseFloat(usd) || 0
			const btcValue = usdValue / btcPrice
			const satsValue = btcValue * SATS_PER_BTC

			const btcResult = btcValue.toFixed(8)
			setBtcDisplay(formatBitcoin(btcResult))
			setSats(formatWithCommas(Math.round(satsValue)))
		}
	}

	const handleCustomPriceChange = (value: string) => {
		const cleanValue = value.replace(/,/g, "")
		setCustomPrice(formatWithCommas(cleanValue))
		if (useCustomPrice) {
			// Recalculate with new custom price
			const usdValue = parseFloat(usd) || 0
			const newPrice = parseFloat(cleanValue) || btcPrice
			const btcValue = usdValue / newPrice
			const satsValue = btcValue * SATS_PER_BTC

			const btcResult = btcValue.toFixed(8)
			setBtcDisplay(formatBitcoin(btcResult))
			setSats(formatWithCommas(Math.round(satsValue)))
		}
	}

	return (
		<div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-8">
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
								<span className="text-xs block mt-1">(Live from CoinGecko)</span>
							</>
						) : (
							<>
								Using Custom Price: <span className="font-semibold text-blue-600">${formatWithCommas(effectivePrice)}</span>
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
								onChange={(e) => handleCustomPriceToggle(e.target.checked)}
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
										className="pl-8 text-base"
										placeholder="100,000"
									/>
								</div>
							</div>
						)}
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="usd" className="text-base font-medium flex items-center gap-2">
							<Image src={USD_IMAGE_PATH} alt="USD" width={20} height={20} />
							US Dollars (USD)
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
							<Input
								id="usd"
								type="text"
								value={formatWithCommas(usd)}
								onChange={(e) => handleUsdChange(e.target.value)}
								className="pl-8 text-lg h-12"
								placeholder="0.00"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="btc" className="text-base font-medium flex items-center gap-2">
							<Image src={BITCOIN_IMAGE_PATH} alt="Bitcoin" width={20} height={20} />
							Bitcoin (BTC)
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₿</span>
							<Input
								id="btc"
								type="text"
								value={btcDisplay}
								onChange={(e) => handleBtcChange(e.target.value)}
								onBlur={(e) => {
									// Format the value when user finishes editing
									const cleanValue = e.target.value.replace(/,/g, "")
									const numValue = parseFloat(cleanValue)
									if (!isNaN(numValue)) {
										setBtcDisplay(formatBitcoin(numValue))
									}
								}}
								className="pl-8 text-lg h-12"
								placeholder="0.00000000"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="sats" className="text-base font-medium flex items-center gap-2">
							<Image src={SATS_IMAGE_PATH} alt="Satoshis" width={20} height={20} />
							Satoshis (sats)
						</Label>
						<Input id="sats" type="text" value={sats} onChange={(e) => handleSatsChange(e.target.value)} placeholder="0" className="text-lg h-12" />
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
