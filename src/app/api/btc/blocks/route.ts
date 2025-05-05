import { NextRequest, NextResponse } from "next/server"
import { Block } from "@/lib/types"

export async function GET(req: NextRequest) {
  try {
    // Forward the Authorization header from the client request to the backend
    const authHeader = req.headers.get("Authorization")

    console.log("[Blocks API] Auth header present:", !!authHeader)

    if (!authHeader) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Get query parameters
    const searchParams = req.nextUrl.searchParams
    const pageSize = searchParams.get("pageSize") || "10"
    const page = searchParams.get("page") || "1"

    console.log(`[Blocks API] Fetching blocks with pageSize=${pageSize}, page=${page}`)

    const url = new URL("http://localhost:8080/api/v1/btc/blocks")
    url.searchParams.append("pageSize", pageSize)
    url.searchParams.append("page", page)

    console.log(`[Blocks API] Calling external API: ${url.toString()}`)

    const response = await fetch(url.toString(), {
      headers: {
        "Authorization": authHeader
      }
    })

    console.log(`[Blocks API] External API response status:`, response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[Blocks API] Error response:`, errorText)
      return NextResponse.json(
        { error: "Failed to fetch block data" },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Transform the data to match the expected format with txCount
    if (data.blocks && Array.isArray(data.blocks)) {
      data.blocks = data.blocks.map((block: Block) => ({
        ...block,
        // If nTx exists, use it for txCount, otherwise default to 0
        txCount: block.nTx || 0
      }))
    }

    console.log(`[Blocks API] Successfully fetched blocks:`, data.blocks?.length || 0)
    return NextResponse.json(data)
  } catch (error) {
    console.error("[Blocks API] Error fetching blocks:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 
