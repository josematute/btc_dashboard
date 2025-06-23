import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
	return (
		<div className="min-h-screen p-4 flex items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader className="text-center">
					<div className="flex items-center justify-center gap-2 mb-2">
						<Skeleton className="h-6 w-6 rounded" />
						<Skeleton className="h-8 w-[180px]" />
					</div>
					<Skeleton className="h-5 w-[280px] mx-auto" />
					<div className="mt-2">
						<Skeleton className="h-4 w-[200px] mx-auto" />
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					{/* USD Input */}
					<div className="space-y-2">
						<Skeleton className="h-5 w-[120px]" />
						<Skeleton className="h-10 w-full" />
					</div>

					{/* Sats Input */}
					<div className="space-y-2">
						<Skeleton className="h-5 w-[100px]" />
						<Skeleton className="h-10 w-full" />
					</div>

					{/* BTC Input */}
					<div className="space-y-2">
						<Skeleton className="h-5 w-[90px]" />
						<Skeleton className="h-10 w-full" />
					</div>

					{/* Footer Info */}
					<div className="pt-4 border-t space-y-2">
						<Skeleton className="h-3 w-[220px] mx-auto" />
						<Skeleton className="h-3 w-[200px] mx-auto" />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
