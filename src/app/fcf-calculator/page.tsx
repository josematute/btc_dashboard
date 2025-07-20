import SatsConverterError from "@/app/sats-converter/error"
import { getBitcoinPrice } from "@/lib/price-actions"
import FCFCalculator from "@/components/fcf-calculator/fcf-calculator"

// Force dynamic rendering since we need fresh Bitcoin price data
export const dynamic = "force-dynamic"

export default async function Page() {
	const btcPrice = await getBitcoinPrice()

	if (!btcPrice) {
		return <SatsConverterError error={new Error("Failed to fetch Bitcoin price")} />
	}

	return <FCFCalculator btcPrice={btcPrice} />
}
