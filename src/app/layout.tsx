import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { UnitProvider } from "@/lib/use-unit"
import { NavbarContainer } from "@/components/navbar-container"
import { Toaster } from "sonner"

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"]
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"]
})

export const metadata: Metadata = {
	title: "Bitcoin Dashboard",
	description: "Real-time overview of the Bitcoin blockchain"
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
				<UnitProvider>
					<div className="relative flex min-h-screen flex-col">
						<NavbarContainer />
						<main className="flex-1">{children}</main>
						<Toaster />
					</div>
				</UnitProvider>
			</body>
		</html>
	)
}
