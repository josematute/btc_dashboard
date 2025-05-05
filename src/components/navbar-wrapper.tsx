"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
	const pathname = usePathname()
	const isAuthPage = pathname === "/login" || pathname === "/signup"

	return (
		<>
			{!isAuthPage && <Navbar />}
			<main className="flex-1">{children}</main>
		</>
	)
}
