// This is now a Server Component
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockBlock, mockBlockStats } from "@/lib/mock-data"
import { formatBytes, formatNumber, formatDate, shortenHash } from "@/lib/utils"
import Link from "next/link"
import { BitcoinValue } from "@/components/bitcoin-value"
import { ArrowLeft, Hash, Layers, Database } from "lucide-react"

interface BlockPageProps {
	params: {
		id: string
	}
}

export default function BlockPage({ params }: BlockPageProps) {
	// In a real app, we would fetch the block data based on the ID
	// For now, we'll just use our mock data
	const block = mockBlock
	const blockStats = mockBlockStats

	// Log the block ID from params
	console.log(`Block ID: ${params.id}`)

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
								<Link href={`/block/${block.height - 1}`} className="hover:text-primary">
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
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Layers className="h-5 w-5" />
						<span>Block Statistics</span>
					</CardTitle>
					<CardDescription>Statistical data for block #{block.height}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3">
						<div>
							<p className="text-sm font-medium text-muted-foreground">Total Fees</p>
							<p className="text-sm">
								<BitcoinValue value={blockStats.totalfee / 100000000} />
							</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Subsidy</p>
							<p className="text-sm">
								<BitcoinValue value={blockStats.subsidy / 100000000} />
							</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Total Output</p>
							<p className="text-sm">
								<BitcoinValue value={blockStats.total_out / 100000000} />
							</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Average Fee</p>
							<p className="text-sm">
								<BitcoinValue value={blockStats.avgfee / 100000000} />
							</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Average Transaction Size</p>
							<p className="text-sm">{formatNumber(blockStats.avgtxsize)} bytes</p>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Inputs/Outputs</p>
							<p className="text-sm">
								{formatNumber(blockStats.ins)} / {formatNumber(blockStats.outs)}
							</p>
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
							{block.tx.slice(0, 10).map((txid, index) => (
								<div key={txid} className="grid grid-cols-[1fr_auto] gap-4 p-4">
									<div className="font-mono text-xs md:text-sm truncate max-w-[300px]">
										<Link href={`/tx/${txid}`} className="hover:text-primary">
											{txid}
										</Link>
									</div>
									<div className="hidden md:block">{index}</div>
								</div>
							))}
							{block.tx.length > 10 && (
								<div className="text-center text-sm text-muted-foreground p-4">And {block.tx.length - 10} more transactions...</div>
							)}
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
