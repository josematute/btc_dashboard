"use client"

import { BitcoinValue } from "@/components/bitcoin-value"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockBlock, mockBlockStats } from "@/lib/mock-data"
import { formatBytes, formatNumber, formatDate, shortenHash } from "@/lib/utils"
import Link from "next/link"

// Using SVG icons since we couldn't install lucide-react
const ArrowLeftIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-4 w-4">
		<path d="m12 19-7-7 7-7"></path>
		<path d="M19 12H5"></path>
	</svg>
)

const HashIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-5 w-5">
		<line x1="4" y1="9" x2="20" y2="9"></line>
		<line x1="4" y1="15" x2="20" y2="15"></line>
		<line x1="10" y1="3" x2="8" y2="21"></line>
		<line x1="16" y1="3" x2="14" y2="21"></line>
	</svg>
)

const LayersIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-5 w-5">
		<path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"></path>
		<path d="m22 12.18-8.58 3.91a2 2 0 0 1-1.66 0L2.6 12.18"></path>
		<path d="m22 16.18-8.58 3.91a2 2 0 0 1-1.66 0L2.6 16.18"></path>
	</svg>
)

const DatabaseIcon = () => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className="h-5 w-5">
		<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
		<path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
		<path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
	</svg>
)

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
					<ArrowLeftIcon />
				</Link>
				<h1 className="text-3xl font-bold tracking-tight">Block #{block.height}</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<HashIcon />
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
						<LayersIcon />
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
						<DatabaseIcon />
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
