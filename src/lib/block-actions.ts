"use server"

import { Block } from "./types"


export async function getBitcoinInfo() {
  try {
    const res = await fetch(`${process.env.BTC_SERVER_URL}/api/v1/btc/info`, {
      cache: "no-store"
    })

    if (!res.ok) {
      console.error("Failed to fetch Bitcoin info:", await res.text())
      return { blockchain: null, network: null, mempool: null }
    }

    const data = await res.json()
    return data
  } catch (error) {
    console.error("Error fetching Bitcoin info:", error)
    return { blockchain: null, network: null, mempool: null }
  }
}


export async function getMoreBlocks(page: number, pageSize: number): Promise<Block[]> {
  console.log("getMoreBlocks", page, pageSize)
  try {
    // Use the same API route that works for the first fetch
    const res = await fetch(`${process.env.BTC_SERVER_URL}/api/v1/btc/blocks?page=${page}&pageSize=${pageSize}`, {
      cache: "no-store",
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
    const res = await fetch(`${process.env.BTC_SERVER_URL}/api/v1/btc/block/${blockId}`, {
      cache: "no-store",
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

  try {
    const res = await fetch(`${process.env.BTC_SERVER_URL}/api/v1/btc/blocks?pageSize=${pageSize}`, {
      cache: "no-store",
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
