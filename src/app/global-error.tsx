"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { AlertOctagon } from "lucide-react"
import Link from "next/link"
import { BITCOIN_IMAGE_PATH } from "@/lib/constants"
import { usePathname } from "next/navigation"

export default function GlobalError() {
	const pathname = usePathname()
	const isHome = pathname === "/"

	return (
		<html lang="en">
			<body className="flex flex-col items-center justify-center min-h-screen p-4 text-center bg-background text-foreground">
				<div className="flex items-center justify-center mb-4">
					<Image src={BITCOIN_IMAGE_PATH} alt="Bitcoin Logo" width={64} height={64} priority />
					<div className="px-3 py-2 ml-4 text-lg font-medium rounded-md bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
						<AlertOctagon className="inline-block w-6 h-6 mr-1 -mt-0.5" />
						Error
					</div>
				</div>

				<h1 className="text-4xl font-bold tracking-tight mb-2 md:text-5xl">There was an error</h1>

				<p className="text-xl text-muted-foreground max-w-lg mb-6">
					Something went wrong! Looks like we hit an Ethereum-style outage. Probably my bitcoin node is down :S
				</p>

				<div className="flex flex-col sm:flex-row gap-4">
					<Button
						size="lg"
						onClick={() => {
							window.location.reload()
						}}
						className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
						Refresh
					</Button>
					{!isHome && (
						<Button variant="outline" size="lg" asChild className="cursor-pointer">
							<Link href="/">Return to Home</Link>
						</Button>
					)}
				</div>

				<div className="text-sm text-muted-foreground mt-8 border-t pt-6 max-w-md">
					Unlike Ethereum&apos;s gas fees, fixing this error is completely free.
				</div>
			</body>
		</html>
	)
}
