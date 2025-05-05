import { NextResponse } from "next/server"

export async function POST() {
  try {
    // Create a response
    const response = NextResponse.json(
      { success: true, message: "Logged out successfully" },
      { status: 200 }
    )

    // Clear all the cookies by setting them with expires in the past
    response.cookies.set("accessToken", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiry to the past
      path: "/"
    })

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0), // Set expiry to the past
      path: "/"
    })

    response.cookies.set("user", "", {
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