import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react"
import { getBlock } from "@/lib/block-actions"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { BlockTxList } from "./block-tx-list"
import { SPECIAL_BLOCKS } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { BlockInfo } from "@/components/block-page/block-info"
import { SpecialBlockInfo } from "@/components/block-page/special-block-info"

type Props = {
	params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params
	const block = await getBlock(id)

	if (!block) {
		return {
			title: "Block Not Found - Bitcoin Dashboard",
			description: "The requested Bitcoin block could not be found.",
		}
	}

	const isSpecialBlock = block.height in SPECIAL_BLOCKS
	const specialInfo = isSpecialBlock ? ` - ${SPECIAL_BLOCKS[block.height].title}` : ""

	return {
		title: `Bitcoin Block #${block.height}${specialInfo} - Bitcoin Dashboard`,
		description: `Bitcoin block #${block.height} details including ${block.nTx} transactions, block hash ${block.hash.substring(0, 16)}..., and complete block information.`,
	}
}

export default async function BlockPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params
	const block = await getBlock(id)

	console.log("block", block)

	if (!block) {
		notFound()
	}

	const isSpecialBlock = block.height in SPECIAL_BLOCKS

	return (
		<div
			className={cn(
				"space-y-6 py-6 px-4",
				isSpecialBlock &&
					"relative before:absolute before:inset-0 before:-z-10 before:bg-gradient-to-r before:from-yellow-500/5 before:via-amber-500/5 before:to-yellow-500/5 before:animate-gradient-x before:rounded-3xl"
			)}
			data-testid="block-page">
			<div className="flex items-center gap-2">
				<Link href="/" className="rounded-md border p-2 inline-flex items-center justify-center hover:bg-muted" data-testid="back-to-home-link">
					<ArrowLeft className="h-4 w-4" />
				</Link>
				<h1 className="text-3xl font-bold tracking-tight" data-testid="block-page-title">
					Block #{block.height}
				</h1>
				<Badge variant={block.confirmations >= 6 ? "secondary" : "secondary"} className="gap-1">
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

			<BlockInfo block={block} />
			<SpecialBlockInfo height={block.height} />
			<BlockTxList txids={block.tx} blockHeight={block.height} />
		</div>
	)
}
