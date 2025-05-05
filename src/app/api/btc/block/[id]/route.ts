import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the block ID from params
    const blockId = params.id

    // Forward the Authorization header from the client request to the backend
    const authHeader = req.headers.get("Authorization")

    console.log("[Block API] Auth header present:", !!authHeader)
    console.log("[Block API] Fetching block:", blockId)

    if (!authHeader) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Call the external API
    const url = new URL(`http://localhost:8080/api/v1/btc/block/${blockId}`)

    console.log(`[Block API] Calling external API: ${url.toString()}`)

    const response = await fetch(url.toString(), {
      headers: {
        "Authorization": authHeader
      }
    })

    console.log(`[Block API] External API response status:`, response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[Block API] Error response:`, errorText)

      // Special handling for 404
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Block not found" },
          { status: 404 }
        )
      }

      return NextResponse.json(
        { error: "Failed to fetch block data" },
        { status: response.status }
      )
    }

    const block = await response.json()
    console.log(`[Block API] Successfully fetched block:`, block.hash)

    return NextResponse.json(block)
  } catch (error) {
    console.error("[Block API] Error fetching block:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 