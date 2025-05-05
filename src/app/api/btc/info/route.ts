import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    // Forward the Authorization header from the client request to the backend
    const authHeader = req.headers.get("Authorization")

    if (!authHeader) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const response = await fetch("http://localhost:8080/api/v1/btc/info", {
      headers: {
        "Authorization": authHeader
      }
    })

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch Bitcoin data" },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching Bitcoin info:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
} 
