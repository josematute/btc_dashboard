import { BlockList } from "@/components/block-list"
import { mockBlocks } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function BlocksPage() {
	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Blocks</h1>
				<p className="text-muted-foreground mt-1">Browse the latest Bitcoin blocks</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Latest Blocks</CardTitle>
					<CardDescription>The most recently mined blocks on the Bitcoin blockchain</CardDescription>
				</CardHeader>
				<CardContent>
					<BlockList blocks={mockBlocks} />
				</CardContent>
			</Card>
		</div>
	)
}
