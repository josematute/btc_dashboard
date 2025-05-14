import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div className="flex items-center gap-2">
				<Skeleton className="h-10 w-10 rounded-md" />
				<Skeleton className="h-9 w-[150px]" />
				<Skeleton className="h-6 w-[120px]" />
			</div>

			<div className="space-y-4">
				<div className="space-y-2">
					<Skeleton className="h-8 w-[200px]" />
					<Skeleton className="h-5 w-[300px]" />
				</div>
				<div className="grid gap-4 md:grid-cols-2">
					{[...Array(8)].map((_, i) => (
						<div key={i} className="space-y-2">
							<Skeleton className="h-4 w-[100px]" />
							<Skeleton className="h-5 w-full" />
						</div>
					))}
				</div>
			</div>

			<div className="space-y-4">
				<Skeleton className="h-8 w-[200px]" />
				<div className="space-y-2">
					{[...Array(5)].map((_, i) => (
						<Skeleton key={i} className="h-16 w-full" />
					))}
				</div>
			</div>
		</div>
	)
}
