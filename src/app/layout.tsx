import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { UnitProvider } from "@/lib/use-unit"
import { Toaster } from "sonner"
import { Navbar } from "@/components/navbar"
import { getBitcoinPrice } from "@/lib/price-actions"

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

export default async function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	const btcPrice = await getBitcoinPrice()

	return (
		<html lang="en">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
				<div className="flex flex-col min-h-screen">
					<UnitProvider>
						<Navbar btcPrice={btcPrice} />
						<main className="flex-grow w-full flex flex-col max-w-6xl mx-auto">{children}</main>
						<Toaster />
					</UnitProvider>
				</div>
			</body>
		</html>
	)
}
