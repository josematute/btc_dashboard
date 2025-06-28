import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
	return (
		<div className="space-y-6 py-6 px-4">
			<Card>
				<CardHeader>
					<CardTitle>
						<Skeleton className="h-8 w-96" />
					</CardTitle>
					<CardDescription>
						<Skeleton className="h-4 w-72 mt-2" />
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Input Grid */}
					<div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
						{Array.from({ length: 6 }).map((_, i) => (
							<div key={i} className="space-y-2">
								<Skeleton className="h-4 w-20" />
								<Skeleton className="h-10 w-full" />
							</div>
						))}
					</div>

					{/* Reset Button */}
					<div className="mb-4">
						<Skeleton className="h-10 w-32" />
					</div>

					{/* Table */}
					<div className="space-y-3">
						{/* Table Header */}
						<div className="grid grid-cols-10 gap-2">
							{Array.from({ length: 10 }).map((_, i) => (
								<Skeleton key={i} className="h-6 w-full" />
							))}
						</div>

						{/* Table Rows */}
						{Array.from({ length: 8 }).map((_, rowIndex) => (
							<div key={rowIndex} className="grid grid-cols-10 gap-2">
								{Array.from({ length: 10 }).map((_, colIndex) => (
									<Skeleton key={colIndex} className="h-8 w-full" />
								))}
							</div>
						))}
					</div>

					{/* Footer */}
					<div className="mt-4 text-center">
						<Skeleton className="h-4 w-80 mx-auto" />
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
