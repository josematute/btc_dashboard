import SatsConverter from "@/components/sats-converter/sats-converter"
import SatsConverterError from "./error"
import { getBitcoinPrice } from "@/lib/price-actions"

// Force dynamic rendering since we need fresh Bitcoin price data
export const dynamic = "force-dynamic"

export default async function Page() {
	const btcPrice = await getBitcoinPrice()

	if (!btcPrice) {
		return <SatsConverterError error={new Error("Failed to fetch Bitcoin price")} />
	}

	return <SatsConverter btcPrice={btcPrice} />
}
