import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { UnitSelector } from "@/components/unit-selector"

interface NavbarProps {
	isLoggedIn?: boolean
	onLogout?: () => void
}

export function Navbar({ isLoggedIn = false, onLogout = () => {} }: NavbarProps) {
	// Get user info from cookie on client side
	const [username, setUsername] = useState("")

	useEffect(() => {
		// If logged in, try to get username from cookie
		if (isLoggedIn) {
			const userCookie = document.cookie
				.split("; ")
				.find((row) => row.startsWith("user="))
				?.split("=")[1]

			if (userCookie) {
				try {
					const userData = JSON.parse(decodeURIComponent(userCookie))
					setUsername(userData.name || userData.username || "User")
				} catch (error) {
					console.error("Error parsing user cookie:", error)
					setUsername("User")
				}
			}
		}
	}, [isLoggedIn])

	return (
		<header className="border-b">
			<div className="flex h-16 items-center px-4 max-w-6xl mx-auto">
				<Link href="/" className="flex items-center gap-2">
					<Image src="/Bitcoin.svg.png" alt="Bitcoin Logo" width={32} height={32} />
					<span className="text-xl font-bold">Bitcoin Dashboard</span>
				</Link>
				<div className="ml-auto flex items-center gap-2">
					{isLoggedIn ? (
						<div className="flex items-center gap-4">
							<UnitSelector />
							<span className="text-sm">Welcome, {username}</span>
							<Button onClick={onLogout} variant="outline">
								Log out
							</Button>
						</div>
					) : (
						<>
							<Link href="/login">
								<Button variant="outline">Log in</Button>
							</Link>
							<Link href="/signup">
								<Button>Sign up</Button>
							</Link>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
