"use server"

import { cookies } from "next/headers"
import { Transaction } from "./types"

export async function getTransaction(txid: string): Promise<Transaction | null> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value

    if (!token) {
      console.error("No access token found in cookies")
      return null
    }

    // Use our internal API route
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/btc/tx/${txid}`, {
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