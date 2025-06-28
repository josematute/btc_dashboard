import { shortenHash, formatDate } from "@/lib/utils/string.utils"
import { Block } from "@/lib/types"
import { Info } from "lucide-react"
import { useEffect, useState } from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import Link from "next/link"
import { format } from "timeago.js"
import { CopyButton } from "@/components/copy-button"

interface BlockListProps {
	blocks: Block[]
}

export function BlockList({ blocks }: BlockListProps) {
	const [hashLength, setHashLength] = useState<number | null>(null)

	useEffect(() => {
		const updateHashLength = () => {
			if (window.innerWidth < 640) {
				setHashLength(8)
			} else if (window.innerWidth < 1024) {
				setHashLength(16)
			} else {
				setHashLength(null)
			}
		}

		// Initial check
		updateHashLength()

		// Add event listener
		window.addEventListener("resize", updateHashLength)

		// Cleanup
		return () => window.removeEventListener("resize", updateHashLength)
	}, [])

	return (
		<div className="space-y-2" data-testid="block-list">
			{blocks.map((block) => (
				<Link
					key={block.hash}
					href={`block/${block.hash}`}
					className="flex items-center justify-between border-b pb-3 hover:bg-muted/50 transition-colors"
					data-testid="block-list-item">
					<div className="space-y-1 min-w-0 flex-1">
						<div className="flex items-center gap-2">
							<span className="font-mono text-sm font-medium shrink-0">{block.height}</span>
							<div className="flex items-center gap-1 min-w-0">
								<span className="text-sm text-blue-600 dark:text-blue-400 font-mono truncate">
									{hashLength ? shortenHash(block.hash, hashLength) : block.hash}
								</span>
								<CopyButton text={block.hash} title="Block hash copied" description="The full block hash has been copied to your clipboard" />
							</div>
						</div>
						<div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 text-xs text-muted-foreground">
							<span className="font-semibold">
								{formatDate(block.time)}
								<span className="ml-1 font-normal">({format(block.time * 1000)})</span>
							</span>
							<div className="flex items-center gap-1">
								<span className="font-mono">nonce: {block.nonce.toLocaleString()}</span>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Info className="h-3.5 w-3.5" />
										</TooltipTrigger>
										<TooltipContent className="max-w-[300px]">
											<p>
												The nonce is a number that miners increment to find a valid block hash. It&apos;s a key part of Bitcoin&apos;s
												proof of work system, where miners must find a hash below a certain target value.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
						</div>
					</div>
					<div className="text-right shrink-0 ml-4">
						<div className="text-sm font-medium">{block.nTx} txs</div>
						<p className="text-xs text-muted-foreground">{(block.size / 1000000).toFixed(2)} MB</p>
					</div>
				</Link>
			))}
		</div>
	)
}
