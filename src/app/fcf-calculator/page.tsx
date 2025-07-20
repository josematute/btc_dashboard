import { Metadata } from "next"
import SatsConverterError from "@/app/sats-converter/error"
import { getBitcoinPrice } from "@/lib/price-actions"
import FCFCalculator from "@/components/fcf-calculator/fcf-calculator"

export const metadata: Metadata = {
	title: "FCF Calculator - Free Cash Flow Bitcoin Strategy Calculator",
	description: "Calculate free cash flow from Bitcoin investments using the Mark Moss strategy. Model Bitcoin collateral loans and cash flow generation over time.",
}

// Force dynamic rendering since we need fresh Bitcoin price data
export const dynamic = "force-dynamic"

export default async function Page() {
	const btcPrice = await getBitcoinPrice()

	if (!btcPrice) {
		return <SatsConverterError error={new Error("Failed to fetch Bitcoin price")} />
	}

	return <FCFCalculator btcPrice={btcPrice} />
}
