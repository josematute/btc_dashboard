import { getLatestBlocks } from "@/lib/block-actions"
import { LatestBlocksSection } from "@/components/latest-blocks-section"

export default async function BlocksPage() {
	// Fetch the latest blocks (20 instead of default 10)
	const { blocks } = await getLatestBlocks(20)

	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Blocks</h1>
				<p className="text-muted-foreground mt-1">Browse the latest Bitcoin blocks</p>
			</div>

			<LatestBlocksSection initialBlocks={blocks} initialPageSize={20} />
		</div>
	)
}
