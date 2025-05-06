import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  try {
    // Create a response
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    )

    // Get the cookies store
    const cookieStore = await cookies()

    // Clear all the cookies by setting them with expires in the past
    cookieStore.set("accessToken", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiry to the past
      path: "/"
    })

    cookieStore.set("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiry to the past
      path: "/"
    })

    cookieStore.set("user", "", {
      httpOnly: false,
      expires: new Date(0), // Set expiry to the past
      path: "/"
    })

    return response
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json(
      { success: false, message: "Error during logout" },
      { status: 500 }
    )
  }
} 