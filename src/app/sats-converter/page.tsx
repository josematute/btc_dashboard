import { Metadata } from "next"
import SatsConverter from "@/components/sats-converter/sats-converter"
import SatsConverterError from "./error"
import { getBitcoinPrice } from "@/lib/price-actions"

export const metadata: Metadata = {
	title: "Sats Converter - Bitcoin Unit Converter",
	description:
		"Convert between Bitcoin (BTC), satoshis (sats), and USD with real-time prices. Easy Bitcoin unit conversion tool with support for custom exchange rates."
}

// Force dynamic rendering since we need fresh Bitcoin price data
export const dynamic = "force-dynamic"

export default async function Page() {
	const btcPrice = await getBitcoinPrice()

	if (!btcPrice) {
		return <SatsConverterError />
	}

	return <SatsConverter btcPrice={btcPrice} />
}
