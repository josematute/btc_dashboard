"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes, formatNumber, formatDate, shortenHash, copyToClipboard } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Hash, Copy, CheckCircle2, AlertCircle } from "lucide-react"
import { getBlock } from "@/lib/block-actions"
import { notFound } from "next/navigation"
import { Block } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { use } from "react"
import { Badge } from "@/components/ui/badge"
import { BlockTxList } from "./block-tx-list"

// Add nextblockhash to the Block type
type BlockWithNextBlock = Block & {
	nextblockhash?: string
}

export default function BlockPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = use(params)
	const [block, setBlock] = useState<BlockWithNextBlock | null>(null)

	useEffect(() => {
		const fetchBlock = async () => {
			const data = await getBlock(id)
			if (!data) {
				notFound()
			}
			setBlock(data as BlockWithNextBlock)
		}
		fetchBlock()
	}, [id])

	if (!block) {
		return null // or a loading state
	}

	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div className="flex items-center gap-2">
				<Link href="/" className="rounded-md border p-2 inline-flex items-center justify-center hover:bg-muted">
					<ArrowLeft className="h-4 w-4" />
				</Link>
				<h1 className="text-3xl font-bold tracking-tight">Block #{block.height}</h1>
				<Badge variant={block.confirmations >= 6 ? "default" : "secondary"} className="gap-1">
					{block.confirmations >= 6 ? (
						<>
							<CheckCircle2 className="h-3.5 w-3.5" />
							Confirmed
						</>
					) : (
						<>
							<AlertCircle className="h-3.5 w-3.5" />
							Unconfirmed ({block.confirmations} confirmations)
						</>
					)}
				</Badge>
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
							<div className="flex items-center gap-2">
								<p className="text-sm font-mono break-all">{block.hash}</p>
								<Button
									variant="ghost"
									size="icon"
									className="h-6 w-6"
									onClick={() => {
										copyToClipboard(block.hash, {
											title: "Block hash copied",
											description: "The full block hash has been copied to your clipboard"
										})
									}}>
									<Copy className="h-3 w-3" />
								</Button>
							</div>
						</div>
						<div>
							<p className="text-sm font-medium text-muted-foreground">Previous Block</p>
							<div className="flex items-center gap-2">
								<Link
									href={`/block/${block.previousblockhash}`}
									className="text-sm font-mono truncate hover:text-primary transition-colors inline-flex items-center">
									{shortenHash(block.previousblockhash, 12)}
								</Link>
								<Button
									variant="ghost"
									size="icon"
									className="h-6 w-6"
									onClick={() => {
										copyToClipboard(block.previousblockhash, {
											title: "Previous block hash copied",
											description: "The previous block hash has been copied to your clipboard"
										})
									}}>
									<Copy className="h-3 w-3" />
								</Button>
							</div>
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
							<div className="flex items-center gap-2">
								<p className="text-sm font-mono truncate">{shortenHash(block.merkleroot, 12)}</p>
								<Button
									variant="ghost"
									size="icon"
									className="h-6 w-6"
									onClick={() => {
										copyToClipboard(block.merkleroot, {
											title: "Merkle root copied",
											description: "The merkle root has been copied to your clipboard"
										})
									}}>
									<Copy className="h-3 w-3" />
								</Button>
							</div>
						</div>
						{block.nextblockhash && (
							<div>
								<p className="text-sm font-medium text-muted-foreground">Next Block</p>
								<div className="flex items-center gap-2">
									<Link
										href={`/block/${block.nextblockhash}`}
										className="text-sm font-mono truncate hover:text-primary transition-colors inline-flex items-center">
										{shortenHash(block.nextblockhash, 12)}
									</Link>
									<Button
										variant="ghost"
										size="icon"
										className="h-6 w-6"
										onClick={() => {
											if (block.nextblockhash) {
												copyToClipboard(block.nextblockhash, {
													title: "Next block hash copied",
													description: "The next block hash has been copied to your clipboard"
												})
											}
										}}>
										<Copy className="h-3 w-3" />
									</Button>
								</div>
							</div>
						)}
						<div>
							<p className="text-sm font-medium text-muted-foreground">Confirmations</p>
							<p className="text-sm">{formatNumber(block.confirmations)}</p>
						</div>
					</div>
				</CardContent>
			</Card>

			<BlockTxList txids={block.tx} blockHeight={block.height} />
		</div>
	)
}
