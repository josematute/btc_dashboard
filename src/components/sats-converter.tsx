"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Bitcoin } from "lucide-react"

const SATS_PER_BTC = 100000000

interface SatsConverterProps {
	btcPrice: number
}

export default function SatsConverter({ btcPrice }: SatsConverterProps) {
	const [usd, setUsd] = useState("100")
	const [sats, setSats] = useState("10000000")
	const [btc, setBtc] = useState("0.001")

	const handleUsdChange = (value: string) => {
		setUsd(value)
		const usdValue = Number.parseFloat(value) || 0
		const btcValue = usdValue / btcPrice
		const satsValue = btcValue * SATS_PER_BTC

		setBtc(btcValue.toFixed(8))
		setSats(Math.round(satsValue).toString())
	}

	const handleSatsChange = (value: string) => {
		setSats(value)
		const satsValue = Number.parseFloat(value) || 0
		const btcValue = satsValue / SATS_PER_BTC
		const usdValue = btcValue * btcPrice

		setBtc(btcValue.toFixed(8))
		setUsd(usdValue.toFixed(2))
	}

	const handleBtcChange = (value: string) => {
		setBtc(value)
		const btcValue = Number.parseFloat(value) || 0
		const usdValue = btcValue * btcPrice
		const satsValue = btcValue * SATS_PER_BTC

		setUsd(usdValue.toFixed(2))
		setSats(Math.round(satsValue).toString())
	}

	return (
		<div className="min-h-screen p-4 flex items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex items-center justify-center gap-2 mb-2">
						<Bitcoin className="h-6 w-6 text-orange-500" />
						<CardTitle className="text-2xl font-bold">Sats Converter</CardTitle>
					</div>
					<CardDescription className="text-base">
						Simple satoshi to USD converter. Convert between Bitcoin, satoshis, and US dollars instantly.
					</CardDescription>
					<div className="text-sm text-muted-foreground mt-2">
						Bitcoin Price: <span className="font-semibold text-orange-600">${btcPrice.toLocaleString()}</span>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div className="space-y-2">
						<Label htmlFor="usd" className="text-sm font-medium">
							US Dollars (USD)
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
							<Input
								id="usd"
								type="number"
								value={usd}
								onChange={(e) => handleUsdChange(e.target.value)}
								className="pl-8"
								placeholder="0.00"
								step="0.01"
							/>
						</div>
					</div>

					<div className="space-y-2">
						<Label htmlFor="sats" className="text-sm font-medium">
							Satoshis (sats)
						</Label>
						<Input id="sats" type="number" value={sats} onChange={(e) => handleSatsChange(e.target.value)} placeholder="0" step="1" />
					</div>

					<div className="space-y-2">
						<Label htmlFor="btc" className="text-sm font-medium">
							Bitcoin (BTC)
						</Label>
						<div className="relative">
							<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">₿</span>
							<Input
								id="btc"
								type="number"
								value={btc}
								onChange={(e) => handleBtcChange(e.target.value)}
								className="pl-8"
								placeholder="0.00000000"
								step="0.00000001"
							/>
						</div>
					</div>

					<div className="text-xs text-muted-foreground text-center pt-4 border-t">
						<p>1 BTC = 100,000,000 satoshis</p>
						<p>1 satoshi = $0.001 (at current mock price)</p>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
