// This is now a Server Component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes, formatNumber, formatDate, shortenHash } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Hash, Database } from "lucide-react"
import { getBlock } from "@/lib/block-actions"
import { notFound } from "next/navigation"
import { Block } from "@/lib/types"

interface BlockPageProps {
	params: {
		id: string
	}
}

// Add nextblockhash to the Block type
type BlockWithNextBlock = Block & {
	nextblockhash?: string
}

export default async function BlockPage({ params }: BlockPageProps) {
	// Fetch the real block data using the ID from params
	const blockId = params.id
	const block = await getBlock(blockId)

	// If no block was found, show the 404 page
	if (!block) {
		notFound()
	}

	// Cast the block to include the optional nextblockhash field
	const blockWithNext = block as BlockWithNextBlock

	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div className="flex items-center gap-2">
				<Link href="/" className="rounded-md border p-2 inline-flex items-center justify-center hover:bg-muted">
					<ArrowLeft className="h-4 w-4" />
				</Link>
				<h1 className="text-3xl font-bold tracking-tight">Block #{block.height}</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Hash className="h-5 w-5" />
						<span>Block Information</span>
					</CardTitle>
					<CardDescription>Detailed information about block #{block.height}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<p className="text-sm font-medium text-muted-foreground">Hash</p>
							<p className="text-sm font-mono break-all">{block.hash}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Previous Block</p>
							<p className="text-sm font-mono truncate">
								<Link href={`/block/${block.previousblockhash}`} className="hover:text-primary">
									{shortenHash(block.previousblockhash, 12)}
								</Link>
							</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Timestamp</p>
							<p className="text-sm">{formatDate(block.time)}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Transactions</p>
							<p className="text-sm">{formatNumber(block.nTx)}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Size</p>
							<p className="text-sm">{formatBytes(block.size)}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Weight</p>
							<p className="text-sm">{formatNumber(block.weight)} units</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Difficulty</p>
							<p className="text-sm">{formatNumber(block.difficulty)}</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Merkle Root</p>
							<p className="text-sm font-mono truncate">{shortenHash(block.merkleroot, 12)}</p>
						</div>
						{blockWithNext.nextblockhash && (
							<div>
								<p className="text-sm font-medium text-muted-foreground">Next Block</p>
								<p className="text-sm font-mono truncate">
									<Link href={`/block/${blockWithNext.nextblockhash}`} className="hover:text-primary">
										{shortenHash(blockWithNext.nextblockhash, 12)}
									</Link>
								</p>
							</div>
						)}
						<div>
							<p className="text-sm font-medium text-muted-foreground">Confirmations</p>
							<p className="text-sm">{formatNumber(block.confirmations)}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Database className="h-5 w-5" />
						<span>Transactions</span>
					</CardTitle>
					<CardDescription>Transactions included in block #{block.height}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="border rounded-md">
						<div className="grid grid-cols-[1fr_auto] gap-4 p-4 font-medium border-b">
							<div>Transaction ID</div>
							<div className="hidden md:block">Index</div>
						</div>
						<div className="divide-y">
							{block.tx.slice(0, 15).map((txid, index) => (
								<div key={txid} className="grid grid-cols-[1fr_auto] gap-4 p-4">
									<div className="font-mono text-xs md:text-sm truncate max-w-[300px]">
										<Link href={`/tx/${txid}`} className="hover:text-primary">
											{txid}
										</Link>
									</div>
									<div className="hidden md:block">{index}</div>
								</div>
							))}
							{block.tx.length > 15 && (
								<div className="text-center text-sm text-muted-foreground p-4">And {block.tx.length - 15} more transactions...</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
