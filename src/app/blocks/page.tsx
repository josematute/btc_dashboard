import { Metadata } from "next"
import { getLatestBlocks } from "@/lib/block-actions"
import { LatestBlocksSection } from "@/components/latest-blocks-section"

export const metadata: Metadata = {
	title: "Latest Bitcoin Blocks - Bitcoin Dashboard",
	description: "Browse the latest Bitcoin blocks with detailed information including block height, timestamp, transaction count, and block size.",
}

// Force dynamic rendering since we need to fetch live data
export const dynamic = "force-dynamic"

export default async function BlocksPage() {
	const { blocks } = await getLatestBlocks(19)

	return (
		<div className="space-y-6 py-6 px-4" data-testid="blocks-page">
			<div>
				<h1 className="text-3xl font-bold tracking-tight" data-testid="blocks-page-title">
					Blocks
				</h1>
				<p className="text-muted-foreground mt-1" data-testid="blocks-page-description">
					Browse the latest Bitcoin blocks
				</p>
			</div>

			<LatestBlocksSection initialBlocks={blocks} initialPageSize={19} />
		</div>
	)
}
