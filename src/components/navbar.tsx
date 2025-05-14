import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { UnitSelector } from "@/components/unit-selector"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

interface NavbarProps {
	isLoggedIn?: boolean
	onLogout?: () => void
}

export function Navbar({ isLoggedIn = false, onLogout = () => {} }: NavbarProps) {
	// Get user info from cookie on client side
	const [username, setUsername] = useState("")
	const [isOpen, setIsOpen] = useState(false)

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
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-16 items-center px-4 max-w-6xl mx-auto">
				<Link href="/" className="flex items-center gap-2">
					<Image src="/Bitcoin.svg.png" alt="Bitcoin Logo" width={32} height={32} />
					<span className="text-xl font-bold hidden sm:inline">Bitcoin Dashboard</span>
				</Link>
				<div className="ml-auto flex items-center gap-2">
					{isLoggedIn ? (
						<>
							{/* Desktop view */}
							<div className="hidden sm:flex items-center gap-4">
								<UnitSelector />
								<span className="text-sm">Welcome, {username}</span>
								<Button onClick={onLogout} variant="outline">
									Log out
								</Button>
							</div>

							{/* Mobile view */}
							<Sheet open={isOpen} onOpenChange={setIsOpen}>
								<SheetTrigger asChild>
									<Button variant="ghost" size="icon" className="sm:hidden">
										<Menu className="h-5 w-5" />
									</Button>
								</SheetTrigger>
								<SheetContent side="right" className="w-[300px] sm:w-[400px]">
									<SheetTitle hidden>Bitcoin Dashboard</SheetTitle>
									<SheetDescription hidden>Welcome, {username}</SheetDescription>
									<div className="flex flex-col gap-4 mt-4">
										<div className="flex items-center gap-2 px-2">
											<Image src="/Bitcoin.svg.png" alt="Bitcoin Logo" width={24} height={24} />
											<span className="text-lg font-semibold">Bitcoin Dashboard</span>
										</div>
										<div className="border-t pt-4">
											<div className="space-y-4">
												<div className="px-2">
													<p className="text-sm text-muted-foreground mb-2">Account</p>
													<p className="text-sm mb-2">Welcome, {username}</p>
													<Button onClick={onLogout} variant="outline" className="w-max-[100px]">
														Log out
													</Button>
												</div>
												<div className="px-2">
													<p className="text-sm text-muted-foreground mb-2">Display Units</p>
													<UnitSelector />
												</div>
											</div>
										</div>
									</div>
								</SheetContent>
							</Sheet>
						</>
					) : (
						<>
							<Link href="/login" className="hidden sm:block">
								<Button variant="outline">Log in</Button>
							</Link>
							<Link href="/signup" className="hidden sm:block">
								<Button>Sign up</Button>
							</Link>
							<Sheet open={isOpen} onOpenChange={setIsOpen}>
								<SheetTrigger asChild>
									<Button variant="ghost" size="icon" className="sm:hidden">
										<Menu className="h-5 w-5" />
									</Button>
								</SheetTrigger>
								<SheetContent side="right" className="w-[300px] sm:w-[400px]">
									<SheetTitle hidden>Bitcoin Dashboard</SheetTitle>
									<SheetDescription hidden>Please login or sign up to continue</SheetDescription>
									<div className="flex flex-col gap-4 mt-4">
										<div className="flex items-center gap-2 px-2">
											<Image src="/Bitcoin.svg.png" alt="Bitcoin Logo" width={24} height={24} />
											<span className="text-lg font-semibold">Bitcoin Dashboard</span>
										</div>
										<div className="border-t pt-4">
											<div className="space-y-4">
												<Link href="/login" className="block">
													<Button variant="outline" className="w-full">
														Log in
													</Button>
												</Link>
												<Link href="/signup" className="block">
													<Button className="w-full">Sign up</Button>
												</Link>
											</div>
										</div>
									</div>
								</SheetContent>
							</Sheet>
						</>
					)}
				</div>
			</div>
		</header>
	)
}
