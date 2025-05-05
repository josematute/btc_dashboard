"use client"

import { usePathname, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { useEffect, useState } from "react"

export function NavbarContainer() {
	const pathname = usePathname()
	const isAuthPage = pathname === "/login" || pathname === "/signup"
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const router = useRouter()

	// Check if user is logged in on mount and when pathname changes
	useEffect(() => {
		// Check for user cookie
		const userCookie = document.cookie
			.split("; ")
			.find((row) => row.startsWith("user="))
			?.split("=")[1]

		if (userCookie) {
			try {
				// If we can parse the user cookie, user is logged in
				JSON.parse(decodeURIComponent(userCookie))
				setIsLoggedIn(true)
			} catch (error) {
				console.error("Error parsing user cookie:", error)
				setIsLoggedIn(false)
			}
		} else {
			setIsLoggedIn(false)
		}
	}, [pathname])

	const handleLogout = async () => {
		try {
			// Call the logout API route
			const response = await fetch("/api/auth/logout", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				}
			})

			if (response.ok) {
				console.log("Logged out successfully")
				setIsLoggedIn(false)
				// Redirect to login page
				router.push("/login")
			} else {
				console.error("Logout failed:", await response.text())
				// Try client-side fallback cookie clearing if server logout fails
				document.cookie = "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
				document.cookie = "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
				document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
				setIsLoggedIn(false)
				router.push("/login")
			}
		} catch (error) {
			console.error("Error during logout:", error)
			// Fallback client-side cookie clearing
			document.cookie = "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
			document.cookie = "refreshToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
			document.cookie = "user=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;"
			setIsLoggedIn(false)
			router.push("/login")
		}
	}

	if (isAuthPage) {
		return null
	}

	return <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
}
