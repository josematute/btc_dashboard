import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface NavbarProps {
	isLoggedIn?: boolean
	onLogout?: () => void
}

export function Navbar({ isLoggedIn = false, onLogout = () => {} }: NavbarProps) {
	return (
		<header className="border-b">
			<div className="flex h-16 items-center px-4 max-w-6xl mx-auto">
				<Link href="/" className="flex items-center gap-2">
					<Image src="/Bitcoin.svg.png" alt="Bitcoin Logo" width={32} height={32} />
					<span className="text-xl font-bold">Bitcoin Dashboard</span>
				</Link>
				<div className="ml-auto flex items-center gap-2">
					{isLoggedIn ? (
						<Button onClick={onLogout} variant="outline">
							Log out
						</Button>
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
