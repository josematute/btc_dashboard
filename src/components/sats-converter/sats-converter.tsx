"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bitcoin } from "lucide-react"
import { BITCOIN_IMAGE_PATH, SATS_IMAGE_PATH, USD_IMAGE_PATH } from "@/lib/constants"
import { formatAssetPrice, removeNonDigitsAndCommas } from "@/lib/utils/prices.utils"
import CustomConversionPriceToggle from "./custom-conversion-price-toggle"
import ConversionInput from "./conversion-input"

const SATS_PER_BTC = 100000000
const DEFAULT_USD_VALUE = "100"

type ConversionSource = "usd" | "btc" | "sats" | "price"

interface SatsConverterProps {
	btcPrice: number
}

export default function SatsConverter({ btcPrice }: SatsConverterProps) {
	const [usdValue, setUsdValue] = useState<string>(DEFAULT_USD_VALUE)
	const [btcValue, setBtcValue] = useState<string>("")
	const [satsValue, setSatsValue] = useState<string>("")

	const [useCustomPrice, setUseCustomPrice] = useState<boolean>(false)
	const [customPrice, setCustomPrice] = useState<string>(btcPrice.toString())
	const [lastChanged, setLastChanged] = useState<ConversionSource>("usd")

	const effectivePrice = useCustomPrice ? Number.parseFloat(customPrice.replace(/,/g, "")) || btcPrice : btcPrice

	const handleInputChange = (value: string, setValue: (val: string) => void, source: ConversionSource) => {
		let cleanedInput = removeNonDigitsAndCommas(value)

		const parts = cleanedInput.split(".")
		if (parts.length > 2) {
			cleanedInput = parts[0] + "." + parts.slice(1).join("")
		}

		const formatted = formatAssetPrice(cleanedInput) // format with commas
		setValue(formatted)
		convertValues(source, cleanedInput) // update other values
	}

	// Calculate other values based on source
	const convertValues = useCallback(
		(source: ConversionSource, rawValue: string) => {
			const numValue = Number.parseFloat(rawValue) || 0

			if (source === "usd") {
				const btc = numValue / effectivePrice
				const sats = btc * SATS_PER_BTC

				setBtcValue(formatAssetPrice(btc.toString(), true))
				setSatsValue(formatAssetPrice(Math.round(sats).toString()))
			} else if (source === "btc") {
				const usd = numValue * effectivePrice
				const sats = numValue * SATS_PER_BTC

				setUsdValue(formatAssetPrice(usd.toString(), true))
				setSatsValue(formatAssetPrice(Math.round(sats).toString()))
			} else if (source === "sats") {
				const btc = numValue / SATS_PER_BTC
				const usd = btc * effectivePrice

				setUsdValue(formatAssetPrice(usd.toString(), true))
				setBtcValue(formatAssetPrice(btc.toString(), true))
			}
		},
		[effectivePrice]
	)

	// Initialize values
	useEffect(() => {
		convertValues("usd", "100")
	}, [convertValues])

	const handleCustomPriceChange = (value: string) => {
		handleInputChange(value, setCustomPrice, "price")
		if (useCustomPrice) {
			const currentSource = lastChanged
			const currentValue = currentSource === "usd" ? usdValue : currentSource === "btc" ? btcValue : satsValue
			convertValues(currentSource as ConversionSource, currentValue.replace(/,/g, ""))
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
								Using Custom Price: <span className="font-semibold text-blue-600">${formatAssetPrice(customPrice)}</span>
							</>
						)}
					</div>

					<CustomConversionPriceToggle
						useCustomPrice={useCustomPrice}
						customPrice={customPrice}
						onSetUseCustomPrice={setUseCustomPrice}
						onHandleCustomPriceChange={handleCustomPriceChange}
					/>
				</CardHeader>

				<CardContent className="space-y-6">
					<ConversionInput
						id="usd"
						label="US Dollars (USD)"
						value={usdValue}
						placeholder="100"
						imageSrc={USD_IMAGE_PATH}
						imageAlt="USD"
						symbol="$"
						onChange={(value) => {
							setLastChanged("usd")
							handleInputChange(value, setUsdValue, "usd")
						}}
					/>

					<ConversionInput
						id="btc"
						label="Bitcoin (BTC)"
						value={btcValue}
						placeholder="0.001"
						imageSrc={BITCOIN_IMAGE_PATH}
						imageAlt="BTC"
						symbol="₿"
						onChange={(value) => {
							setLastChanged("btc")
							handleInputChange(value, setBtcValue, "btc")
						}}
					/>

					<ConversionInput
						id="sats"
						label="Satoshis (SATS)"
						value={satsValue}
						placeholder="100,000"
						imageSrc={SATS_IMAGE_PATH}
						imageAlt="sats"
						onChange={(value) => {
							setLastChanged("sats")
							handleInputChange(value, setSatsValue, "sats")
						}}
					/>

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
