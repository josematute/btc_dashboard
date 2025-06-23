import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"
import { BITCOIN_IMAGE_PATH, EMAIL } from "@/lib/constants"

export default function TxNotFound() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
			<div className="flex items-center justify-center mb-4">
				<Image src={BITCOIN_IMAGE_PATH} alt="Bitcoin Logo" width={56} height={56} priority />
				<div className="px-2.5 py-1.5 ml-3 text-lg font-medium rounded-md bg-orange-100 dark:bg-orange-900/30 text-orange-800 dark:text-orange-400">
					<AlertTriangle className="inline-block w-5 h-5 mr-1 -mt-0.5" />
					404
				</div>
			</div>

			<h1 className="text-5xl font-bold tracking-tight mb-2 md:text-6xl">Transaction Not Found</h1>

			<p className="text-xl text-muted-foreground max-w-lg mb-6">
				We couldn&apos;t find the transaction you were looking for. It may have been dropped from the mempool or never broadcast.
			</p>

			<div className="flex flex-col sm:flex-row gap-4">
				<Button asChild size="lg" className="cursor-pointer">
					<Link href="/">Go to Dashboard</Link>
				</Button>
				<Button variant="outline" size="lg" asChild className="cursor-pointer">
					<Link href="/mempool">View Mempool</Link>
				</Button>
			</div>

			<div className="text-sm text-muted-foreground mt-8 border-t pt-6 max-w-md">
				If you believe this is an error, please{" "}
				<a href={`mailto:${EMAIL}`} className="underline hover:text-foreground">
					contact me
				</a>{" "}
				or check the node connection.
			</div>
		</div>
	)
}
