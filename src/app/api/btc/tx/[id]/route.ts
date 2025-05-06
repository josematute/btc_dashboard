import { NextRequest, NextResponse } from "next/server"

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get the transaction ID from params
    const txid = params.id

    // Forward the Authorization header from the client request to the backend
    const authHeader = req.headers.get("Authorization")

    console.log("[TX API] Auth header present:", !!authHeader)
    console.log("[TX API] Fetching transaction:", txid)

    if (!authHeader) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Make sure the BTC_SERVER_URL is set
    const serverUrl = process.env.BTC_SERVER_URL
    if (!serverUrl) {
      console.error("[TX API] BTC_SERVER_URL is not defined")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    // Call the external API
    const url = new URL(`${serverUrl}/api/v1/btc/tx/${txid}`)

    console.log(`[TX API] Calling external API: ${url.toString()}`)

    const response = await fetch(url.toString(), {
      headers: {
        "Authorization": authHeader
      }
    })

    console.log(`[TX API] External API response status:`, response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[TX API] Error response:`, errorText)

      // Special handling for 404
      if (response.status === 404) {
        return NextResponse.json(
          { error: "Transaction not found" },
          { status: 404 }
        )
      }

      return NextResponse.json(
        { error: "Failed to fetch transaction data" },
        { status: response.status }
      )
    }

    const transaction = await response.json()
    console.log(`[TX API] Successfully fetched transaction:`, transaction.txid)

    return NextResponse.json(transaction)
  } catch (error) {
    console.error("[TX API] Error fetching transaction:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 