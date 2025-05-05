"use client"

import Link from "next/link"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useEffect } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
	name: z.string().min(2, { message: "Name must be at least 2 characters" }),
	email: z.string().email({ message: "Please enter a valid email address" }),
	username: z.string().min(2, { message: "Username must be at least 2 characters" }),
	password: z.string().min(6, { message: "Password must be at least 6 characters" })
})

export default function SignupPage() {
	const router = useRouter()
	const [showPassword, setShowPassword] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const [message, setMessage] = useState("")
	const [isSuccess, setIsSuccess] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			username: "",
			password: ""
		}
	})

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true)
		setMessage("")

		try {
			const response = await fetch("/api/auth/signup", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(values)
			})

			const data = await response.json()

			if (!response.ok) {
				setMessage(data.message || "Signup failed. Please try again.")
				setIsSuccess(false)
			} else {
				setMessage(data.message || "Account created successfully!")
				setIsSuccess(true)

				// Clear the form
				form.reset()
			}
		} catch (error) {
			console.error("Signup error:", error)
			setMessage("An error occurred while creating your account. Please try again.")
			setIsSuccess(false)
		} finally {
			setIsLoading(false)
		}
	}

	// If signup is successful, redirect to dashboard
	useEffect(() => {
		if (isSuccess) {
			// Redirect after a short delay to allow the user to see the success message
			const redirectTimer = setTimeout(() => {
				router.push("/") // Go to dashboard instead of login
			}, 2000)

			return () => clearTimeout(redirectTimer)
		}
	}, [isSuccess, router])

	return (
		<div className="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">Create an account</CardTitle>
					<CardDescription>Enter your information to create an account</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input placeholder="Hal Finney" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="hal@finney.org" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="halfinney" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<div className="relative">
												<Input type={showPassword ? "text" : "password"} {...field} placeholder="********" />
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
													onClick={() => setShowPassword(!showPassword)}>
													{showPassword ? (
														<EyeOff className="h-4 w-4 text-muted-foreground" />
													) : (
														<Eye className="h-4 w-4 text-muted-foreground" />
													)}
													<span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
												</Button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{message && (
								<div
									className={`p-3 rounded-md text-sm ${
										isSuccess
											? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
											: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
									}`}>
									{message}
								</div>
							)}
							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? "Creating account..." : "Create account"}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<div className="text-center text-sm">
						Already have an account?{" "}
						<Link href="/login" className="text-primary hover:underline">
							Log in
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
