'use server'

import { z } from 'zod'

const LoginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

const SignupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
})

export type LoginFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  message?: string;
}

export type SignupFormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
    _form?: string[];
  };
  message?: string;
}

export async function loginAction(prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  // Validate form fields
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })

  // Return early if form validation fails
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to login.',
    }
  }

  const { email, password } = validatedFields.data

  // Simulate a 3-second wait
  console.log('Login attempt started, waiting 3 seconds...')
  await new Promise(resolve => setTimeout(resolve, 3000))

  // Log the details
  console.log('Login attempt completed with:', {
    email,
    password,
    timestamp: new Date().toISOString()
  })

  // In a real app, you would authenticate the user here
  return {
    message: 'Login successful!',
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
  }
} 