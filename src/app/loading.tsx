import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
	return (
		<div className="space-y-6 py-6 px-4">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Bitcoin Dashboard</h1>
				<p className="text-muted-foreground mt-1">Real-time overview of the Bitcoin blockchain</p>
			</div>

			{/* Latest Blocks Section */}
			<div className="space-y-4">
				<Skeleton className="h-8 w-[150px]" />
				<div className="space-y-2">
					{[...Array(5)].map((_, i) => (
						<Skeleton key={i} className="h-16 w-full" />
					))}
				</div>
			</div>

			{/* Summary Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{[...Array(4)].map((_, i) => (
					<Skeleton key={i} className="h-24 w-full" />
				))}
			</div>

			{/* Cards */}
			<div className="grid gap-4 md:grid-cols-2">
				{[...Array(2)].map((_, i) => (
					<Skeleton key={i} className="h-[200px] w-full" />
				))}
			</div>

			{/* Bitcoin Block Museum */}
			<Skeleton className="h-[300px] w-full" />
		</div>
	)
}
