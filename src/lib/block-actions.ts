"use server"

import { cookies } from "next/headers"
import { Block } from "./types"

export async function getMoreBlocks(page: number, pageSize: number): Promise<Block[]> {
  console.log("getMoreBlocks", page, pageSize)
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value

    if (!token) {
      console.error("No access token found in cookies")
      return []
    }

    // Use the same API route that works for the first fetch
    const res = await fetch(`${process.env.BTC_SERVER_URL}/api/v1/btc/blocks?page=${page}&pageSize=${pageSize}`, {
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

export async function getBlock(blockId: string): Promise<Block | null> {
  console.log("getBlock", blockId)
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value

    if (!token) {
      console.error("No access token found in cookies")
      return null
    }

    // Use our internal API route
    const res = await fetch(`${process.env.BTC_SERVER_URL}/api/v1/btc/block/${blockId}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.error("Failed to fetch block:", await res.text())
      return null
    }

    const block = await res.json()
    return block
  } catch (error) {
    console.error("Error fetching block:", error)
    return null
  }
}

export async function getLatestBlocks(pageSize: number = 10): Promise<{ blocks: Block[] }> {
  console.log("getLatestBlocks", pageSize)
  const cookieStore = await cookies()
  const token = cookieStore.get("accessToken")?.value

  if (!token) {
    return { blocks: [] }
  }

  try {
    // Use our internal API route
    const res = await fetch(`${process.env.BTC_SERVER_URL}/api/v1/btc/blocks?pageSize=${pageSize}`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (!res.ok) {
      console.error("Failed to fetch blocks:", await res.text())
      return { blocks: [] }
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching blocks:", error)
    return { blocks: [] }
  }
} 
