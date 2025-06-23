"use client" // Error boundaries must be Client Components

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { AlertOctagon } from "lucide-react"
import Link from "next/link"
import { BITCOIN_IMAGE_PATH } from "@/lib/constants"

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	// Log the error to console (helpful for debugging)
	console.error("Global error occurred:", error)

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

				<h1 className="text-4xl font-bold tracking-tight mb-2 md:text-5xl">Blockchain Reorg Detected</h1>

				<p className="text-xl text-muted-foreground max-w-lg mb-6">
					Something went wrong! Looks like we hit an Ethereum-style outage.
					{error.digest && <span className="block mt-2 text-sm font-mono">Error ID: {error.digest}</span>}
				</p>

				<div className="flex flex-col sm:flex-row gap-4">
					<Button size="lg" onClick={() => reset()} className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
						Mine New Block
					</Button>
					<Button variant="outline" size="lg" asChild className="cursor-pointer">
						<Link href="/">Return to Genesis</Link>
					</Button>
				</div>

				<div className="text-sm text-muted-foreground mt-8 border-t pt-6 max-w-md">
					Unlike Ethereum&apos;s gas fees, fixing this error is completely free.
				</div>
			</body>
		</html>
	)
}
