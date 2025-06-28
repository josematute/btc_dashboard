import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Hash } from "lucide-react"
import Link from "next/link"
import { CopyButton } from "@/components/copy-button"
import { formatDate } from "@/lib/utils"
import { format } from "timeago.js"
import { shortenHash } from "@/lib/utils"
import { formatNumber } from "@/lib/utils"
import { formatBytes } from "@/lib/utils"
import { Block } from "@/lib/types"

interface BlockInfoProps {
	block: Block
}

export function BlockInfo({ block }: BlockInfoProps) {
	return (
		<Card data-testid="block-info">
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
						<p className="text-sm">
							{formatDate(block.time)}
							<span className="ml-1 text-muted-foreground">({format(block.time * 1000)})</span>
						</p>
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
							<CopyButton text={block.merkleroot} title="Merkle root copied" description="The merkle root has been copied to your clipboard" />
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
	)
}
