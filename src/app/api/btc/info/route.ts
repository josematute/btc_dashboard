import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    // Forward the Authorization header from the client request to the backend
    const authHeader = req.headers.get("Authorization")

    console.log("[Info API] Auth header present:", !!authHeader)

    if (!authHeader) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Make sure the BTC_SERVER_URL is set and we're hitting the correct endpoint
    const serverUrl = process.env.BTC_SERVER_URL
    if (!serverUrl) {
      console.error("[Info API] BTC_SERVER_URL is not defined")
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 })
    }

    const apiUrl = `${serverUrl}/api/v1/btc/info`
    console.log(`[Info API] Calling external API: ${apiUrl}`)

    const response = await fetch(apiUrl, {
      headers: {
        "Authorization": authHeader
      }
    })

    console.log(`[Info API] External API response status:`, response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`[Info API] Error response:`, errorText)
      return NextResponse.json(
        { error: "Failed to fetch Bitcoin data" },
        { status: response.status }
      )
    }

    const data = await response.json()
    console.log("[Info API] Successfully fetched info data")
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Bitcoin info:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 
