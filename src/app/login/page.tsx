"use client"

import Link from "next/link"
import { useActionState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { loginAction } from "@/lib/actions"

const formSchema = z.object({
	email: z.string().email({ message: "Please enter a valid email address" }),
	password: z.string().min(6, { message: "Password must be at least 6 characters" })
})

export default function LoginPage() {
	const [state, formAction, isPending] = useActionState(loginAction, {
		message: "",
		errors: {}
	})

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	})

	return (
		<div className="flex items-center justify-center p-4 min-h-[calc(100vh-4rem)]">
			<Card className="w-full max-w-md">
				<CardHeader className="space-y-1">
					<CardTitle className="text-2xl font-bold">Login</CardTitle>
					<CardDescription>Enter your email and password to login to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							action={formAction}
							className="space-y-4"
							onSubmit={() => {
								// React will handle the form submission
								form.trigger() // Trigger validation
							}}>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input placeholder="m@example.com" {...field} name="email" />
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
										<div className="flex items-center justify-between">
											<FormLabel>Password</FormLabel>
											<Link href="/forgot-password" className="text-sm text-primary hover:underline">
												Forgot password?
											</Link>
										</div>
										<FormControl>
											<Input type="password" {...field} name="password" />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{state.message && <p className={`text-sm ${state.errors?._form ? "text-destructive" : "text-green-500"}`}>{state.message}</p>}
							<Button type="submit" className="w-full" disabled={isPending}>
								{isPending ? "Logging in..." : "Login"}
							</Button>
						</form>
					</Form>
				</CardContent>
				<CardFooter className="flex flex-col space-y-4">
					<div className="text-center text-sm">
						Don&apos;t have an account?{" "}
						<Link href="/signup" className="text-primary hover:underline">
							Sign up
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}
