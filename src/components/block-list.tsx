import { shortenHash, formatDate } from "@/lib/utils"
import { BlockWithTxCount } from "@/lib/block-actions"

interface BlockListProps {
	blocks: BlockWithTxCount[]
}

export function BlockList({ blocks }: BlockListProps) {
	return (
		<div className="space-y-4">
			{blocks.map((block) => (
				<div key={block.hash} className="flex items-center justify-between border-b pb-3">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<span className="font-mono text-sm font-medium">{block.height}</span>
							<a href={`block/${block.hash}`} className="text-sm hover:underline text-blue-600 dark:text-blue-400 font-mono">
								{shortenHash(block.hash)}
							</a>
						</div>
						<p className="text-xs text-muted-foreground">{formatDate(block.time / 1000)}</p>
					</div>
					<div className="text-right">
						<div className="text-sm font-medium">{block.txCount} txs</div>
						<p className="text-xs text-muted-foreground">{(block.size / 1000000).toFixed(2)} MB</p>
					</div>
				</div>
			))}
		</div>
	)
}
