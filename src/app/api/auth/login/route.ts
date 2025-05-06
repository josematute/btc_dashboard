import { NextResponse } from "next/server"
import { z } from "zod"

const LoginSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the request body
    const validatedFields = LoginSchema.safeParse(body)

    // Return early if validation fails
    if (!validatedFields.success) {
      return NextResponse.json(
        { message: "Invalid request data", errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { username, password } = validatedFields.data

    // Get the server URL from environment variable
    const serverUrl = process.env.BTC_SERVER_URL
    const loginUrl = `${serverUrl}/api/v1/auth/login`

    console.log(`Making login request to: ${loginUrl}`)

    // Make the request to the server
    const response = await fetch(loginUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })

    // Parse the JSON response
    const data = await response.json()

    // Check if login was successful
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Login failed. Please check your credentials.' },
        { status: response.status }
      )
    }

    // Log authentication data
    console.log('Authentication successful:')
    console.log('User ID:', data.user.id)
    console.log('Username:', data.user.username)
    console.log('Token:', data.token.substring(0, 20) + '...')

    // Create response object
    const responseJson = {
      message: `Welcome back, ${data.user.name || data.user.username}!`,
      success: true,
      user: {
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        email: data.user.email
      }
    }

    // Create response with cookies
    const nextResponse = NextResponse.json(responseJson, { status: 200 })

    // Set JWT cookies
    nextResponse.cookies.set("accessToken", data.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })

    nextResponse.cookies.set("refreshToken", data.refresh, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })

    // Set a user cookie that is accessible to JavaScript
    nextResponse.cookies.set("user", JSON.stringify({
      id: data.user.id,
      name: data.user.name,
      username: data.user.username,
      email: data.user.email
    }), {
      httpOnly: false,
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production"
    })

    return nextResponse

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { message: 'An error occurred while logging in. Please try again.' },
      { status: 500 }
    )
  }
} 