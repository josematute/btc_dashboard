import { getLatestBlocks } from "@/lib/block-actions"
import { LatestBlocksSection } from "@/components/latest-blocks-section"

// Force dynamic rendering since we need to fetch live data
export const dynamic = "force-dynamic"

export default async function BlocksPage() {
	// Fetch the latest blocks (190 instead of default 10)
	const { blocks } = await getLatestBlocks(19)

	return (
		<div className="space-y-6 py-6 px-4">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Blocks</h1>
				<p className="text-muted-foreground mt-1">Browse the latest Bitcoin blocks</p>
			</div>

			<LatestBlocksSection initialBlocks={blocks} initialPageSize={19} />
		</div>
	)
}
