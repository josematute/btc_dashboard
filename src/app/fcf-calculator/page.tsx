import SatsConverterError from "@/app/sats-converter/error"
import { getBitcoinPrice } from "@/lib/price-actions"
import FCFCalculator from "@/components/fcf-calculator/fcf-calculator"

export default async function Page() {
	const btcPrice = await getBitcoinPrice()

	if (!btcPrice) {
		return <SatsConverterError error={new Error("Failed to fetch Bitcoin price")} />
	}

	return <FCFCalculator btcPrice={btcPrice} />
}
