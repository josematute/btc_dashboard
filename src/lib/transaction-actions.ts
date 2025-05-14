"use server"

import { cookies } from "next/headers"
import { Tx } from "./types"

export async function getTransaction(txid: string): Promise<Tx | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value

    if (!token) {
      console.error("No access token found in cookies")
      return null
    }

    // Use our internal API route
    const res = await fetch(`${process.env.BTC_SERVER_URL}/api/v1/btc/tx/${txid}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`
      }
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
