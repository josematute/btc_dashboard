import SatsConverter from "@/components/sats-converter"
import { toast } from "sonner"
import SatsConverterError from "./error"

async function getBitcoinPrice(): Promise<number | null> {
	try {
		await new Promise((resolve) => setTimeout(resolve, 2000))
		const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd", {
			next: { revalidate: 60 }
		})

		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`)
		}

		const data = await response.json()
		return data.bitcoin.usd
	} catch (error) {
		console.error("Fetch error:", error)
		toast.error("Failed to fetch Bitcoin price")
		return null
	}
}

export default async function Page() {
	const btcPrice = await getBitcoinPrice()

	if (!btcPrice) {
		return <SatsConverterError error={new Error("Failed to fetch Bitcoin price")} reset={() => {}} />
	}

	return <SatsConverter btcPrice={btcPrice} />
}
