"use server"

import { Tx } from "./types"

export async function getTransaction(txid: string): Promise<Tx | null> {
  try {

    // Use our internal API route
    const res = await fetch(`${process.env.BTC_SERVER_URL}/api/v1/btc/tx/${txid}`, {
      cache: "no-store",
    })

    if (!res.ok) {
      console.error("Failed to fetch transaction:", await res.text())
      return null
    }

    const tx = await res.json()
    return tx
  } catch (error) {
    console.error("Error fetching transaction:", error)
    return null
  }
} 
