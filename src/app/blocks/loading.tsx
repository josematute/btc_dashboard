import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div>
				<Skeleton className="h-9 w-[100px]" />
				<Skeleton className="h-5 w-[250px] mt-1" />
			</div>

			<div className="space-y-4">
				<div className="space-y-2">
					<Skeleton className="h-8 w-[150px]" />
					<Skeleton className="h-5 w-[300px]" />
				</div>
				<div className="space-y-2">
					{[...Array(10)].map((_, i) => (
						<Skeleton key={i} className="h-16 w-full" />
					))}
				</div>
				<Skeleton className="h-10 w-full mt-4" />
			</div>
		</div>
	)
}
