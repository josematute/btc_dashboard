"use server"

import { cookies } from "next/headers"
import { Block } from "./types"

// Type for Block with txCount field
export type BlockWithTxCount = Block & { txCount: number }

export async function getMoreBlocks(page: number, pageSize: number): Promise<BlockWithTxCount[]> {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value

    if (!token) {
      console.error("No access token found in cookies")
      return []
    }

    // Use the same API route that works for the first fetch
    const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/btc/blocks?page=${page}&pageSize=${pageSize}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.error("Failed to fetch more blocks:", await res.text())
      return []
    }

    const data = await res.json()

    if (!data.blocks || !Array.isArray(data.blocks)) {
      console.error("Invalid blocks data format:", data)
      return []
    }

    return data.blocks
  } catch (error) {
    console.error("Error fetching more blocks:", error)
    return []
  }
} 