'use server'

import { z } from 'zod'
import { UserAndCredentials, ApiError } from './types'

const LoginSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export type LoginFormState = {
  errors?: {
    username?: string[];
    password?: string[];
    _form?: string[];
  };
  message?: string;
  success?: boolean;
  userData?: UserAndCredentials;
}

export type SignupFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  message?: string;
  success?: boolean;
}

export async function loginAction(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  // Validate form fields
  const validatedFields = LoginSchema.safeParse({
    username: formData.get('username'),
    password: formData.get('password'),
  })

  // Return early if form validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to login.',
      success: false
    }
  }

  const { username, password } = validatedFields.data

  // Log the attempt
  console.log('Login attempt started with username:', username)

  try {
    // Get the server URL from environment variable
    const serverUrl = process.env.BTC_SERVER_URL || 'http://localhost:8080/'
    const loginUrl = `${serverUrl}api/v1/auth/login`

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

    // Log the response for debugging
    console.log('Login response status:', response.status)
    console.log('Login response body:', JSON.stringify(data, null, 2))

    // Check if login was successful
    if (!response.ok) {
      const errorData = data as ApiError
      return {
        message: errorData.message || 'Login failed. Please check your credentials.',
        success: false
      }
    }

    // Login successful
    const userData = data as UserAndCredentials

    // Log authentication data
    console.log('Authentication successful:')
    console.log('User ID:', userData.user.id)
    console.log('Username:', userData.user.username)
    console.log('Token:', userData.token.substring(0, 20) + '...')
    console.log('Refresh:', userData.refresh.substring(0, 20) + '...')

    return {
      message: `Welcome back, ${userData.user.name || userData.user.username}!`,
      success: true,
      userData: userData
    }
  } catch (error) {
    // Log the error
    console.error('Login error:', error)

    // Return an error message
    return {
      message: 'An error occurred while logging in. Please try again.',
      success: false
    }
  }
}

export async function signupAction(prevState: SignupFormState, formData: FormData): Promise<SignupFormState> {
  // Validate form fields
  const validatedFields = SignupSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // Return early if form validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to create account.',
      success: false
    }
  }

  const { name, email, password } = validatedFields.data

  // Simulate a 3-second wait
  console.log('Signup attempt started, waiting 3 seconds...')
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Log the details
  console.log('Signup attempt completed with:', {
    name,
    email,
    password,
    timestamp: new Date().toISOString()
  })

  // In a real app, you would create the user here
  return {
    message: 'Account created successfully!',
    success: true
  }
} 