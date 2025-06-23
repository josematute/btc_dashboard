"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { AlertOctagon } from "lucide-react"
import Link from "next/link"
import { BITCOIN_IMAGE_PATH } from "@/lib/constants"

interface SatsConverterErrorProps {
	error: Error & { digest?: string }
	reset: () => void
}

export default function SatsConverterError({ error, reset }: SatsConverterErrorProps) {
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] p-4 text-center">
			<div className="flex items-center justify-center mb-4">
				<Image src={BITCOIN_IMAGE_PATH} alt="Bitcoin Logo" width={56} height={56} priority />
				<div className="px-2.5 py-1.5 ml-3 text-lg font-medium rounded-md bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
					<AlertOctagon className="inline-block w-5 h-5 mr-1 -mt-0.5" />
					Error
				</div>
			</div>

			<h1 className="text-5xl font-bold tracking-tight mb-2 md:text-6xl">Converter Error</h1>

			<p className="text-xl text-muted-foreground max-w-lg mb-6">
				We couldn&apos;t load the sats converter. This might be due to a network issue or API failure.
				{error.digest && <span className="block mt-2 text-sm font-mono">Error ID: {error.digest}</span>}
			</p>

			<div className="flex flex-col sm:flex-row gap-4">
				<Button size="lg" onClick={() => reset()} className="bg-orange-500 hover:bg-orange-600 cursor-pointer">
					Try Again
				</Button>
				<Button variant="outline" size="lg" asChild className="cursor-pointer">
					<Link href="/">Go to Dashboard</Link>
				</Button>
			</div>

			<div className="text-sm text-muted-foreground mt-8 border-t pt-6 max-w-md">
				If the problem persists, the Bitcoin price API might be temporarily unavailable.
			</div>
		</div>
	)
}
