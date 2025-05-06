import { NextResponse } from "next/server"
import { z } from "zod"
import { cookies } from "next/headers"

const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export async function POST(request: Request) {
  try {
    // Parse the request body
    const body = await request.json()

    // Validate the request body
    const validatedFields = SignupSchema.safeParse(body)

    // Return early if validation fails
    if (!validatedFields.success) {
      return NextResponse.json(
        { message: "Invalid request data", errors: validatedFields.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, username, password } = validatedFields.data

    // Get the server URL from environment variable
    const serverUrl = process.env.BTC_SERVER_URL
    const registerUrl = `${serverUrl}/api/v1/auth/register`

    console.log(`Making registration request to: ${registerUrl}`)

    // Make the request to the server
    const response = await fetch(registerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        username,
        password,
      }),
    })

    // Parse the JSON response
    const data = await response.json()

    // Check if registration was successful
    if (!response.ok) {
      return NextResponse.json(
        { message: data.message || 'Registration failed. Please try again.' },
        { status: response.status }
      )
    }

    // Log authentication data
    console.log('Registration successful:')
    console.log('User ID:', data.user.id)
    console.log('Username:', data.user.username)
    console.log('Token:', data.token.substring(0, 20) + '...')

    // Create response object
    const responseJson = {
      message: `Account created successfully! Welcome, ${data.user.name || data.user.username}!`,
      success: true,
      user: {
        id: data.user.id,
        name: data.user.name,
        username: data.user.username,
        email: data.user.email
      }
    }

    // Create response with cookies
    const nextResponse = NextResponse.json(responseJson, { status: 201 })

    // Get the cookies store
    const cookieStore = await cookies()

    // Set JWT cookies using the cookies API
    cookieStore.set("accessToken", data.token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
      sameSite: "strict",
      secure: false
    })

    cookieStore.set("refreshToken", data.refresh, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
      sameSite: "strict",
      secure: false
    })

    // Set a user cookie that is accessible to JavaScript
    cookieStore.set("user", JSON.stringify({
      id: data.user.id,
      name: data.user.name,
      username: data.user.username,
      email: data.user.email
    }), {
      httpOnly: false,
      maxAge: 24 * 60 * 60, // 1 day
      path: "/",
      sameSite: "strict",
      secure: false
    })

    return nextResponse

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { message: 'An error occurred while creating your account. Please try again.' },
      { status: 500 }
    )
  }
} 