import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
	return (
		<div className="max-w-6xl mx-auto py-6 px-4 space-y-6">
			<div>
				<Skeleton className="h-9 w-[200px]" />
				<Skeleton className="h-5 w-[300px] mt-1" />
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
		</div>
	)
}
