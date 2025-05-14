import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes, formatNumber, formatDate, shortenHash } from "@/lib/utils"
import Link from "next/link"
import { ArrowLeft, Hash, CheckCircle2, AlertCircle } from "lucide-react"
import { getBlock } from "@/lib/block-actions"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { BlockTxList } from "./block-tx-list"
import { CopyButton } from "@/components/copy-button"

export default async function BlockPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const block = await getBlock(id)

	console.log("block", block)

	if (!block) {
		notFound()
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
								<CopyButton text={block.hash} title="Block hash copied" description="The full block hash has been copied to your clipboard" />
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
								<CopyButton
									text={block.previousblockhash}
									title="Previous block hash copied"
									description="The previous block hash has been copied to your clipboard"
								/>
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
								<CopyButton
									text={block.merkleroot}
									title="Merkle root copied"
									description="The merkle root has been copied to your clipboard"
								/>
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
									<CopyButton
										text={block.nextblockhash}
										title="Next block hash copied"
										description="The next block hash has been copied to your clipboard"
									/>
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
