import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Blocks } from "lucide-react"

export default function Loading() {
	return (
		<div className="space-y-6 py-6 px-4">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Blocks</h1>
				<p className="text-muted-foreground mt-1">Browse the latest Bitcoin blocks</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Blocks className="h-4 w-4" />
						<span>Latest Blocks</span>
					</CardTitle>
					<CardDescription>
						The most recently mined blocks on the Bitcoin blockchain{" "}
						<span className="text-primary hover:underline text-md font-semibold ml-2">View all</span>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="space-y-2">
						{[...Array(19)].map((_, i) => (
							<Skeleton key={i} className="h-16 w-full" />
						))}
					</div>
					<div className="mt-4 text-center">
						<Skeleton className="h-10 w-full" />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
