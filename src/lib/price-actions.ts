"use server"

import { toast } from "sonner"

export async function getBitcoinPrice(): Promise<number | null> {
  try {
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
