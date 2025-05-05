"use client"

import { usePathname } from "next/navigation"
import { Navbar } from "@/components/navbar"

export function NavbarContainer() {
	const pathname = usePathname()
	const isAuthPage = pathname === "/login" || pathname === "/signup"

	if (isAuthPage) {
		return null
	}

	return <Navbar />
}
