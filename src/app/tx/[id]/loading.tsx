import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
	return (
		<div className="space-y-6 py-6 px-4">
			<div className="flex items-center gap-2">
				<Skeleton className="h-10 w-10 rounded-md" />
				<Skeleton className="h-9 w-[200px]" />
			</div>

			{/* Transaction Info Card */}
			<div className="space-y-4">
				<div className="space-y-2">
					<Skeleton className="h-8 w-[200px]" />
					<Skeleton className="h-5 w-[300px]" />
				</div>
				<div className="space-y-4">
					<div className="space-y-2">
						<Skeleton className="h-4 w-[120px]" />
						<Skeleton className="h-5 w-full" />
					</div>
					<div className="space-y-2">
						<Skeleton className="h-4 w-[120px]" />
						<Skeleton className="h-5 w-full" />
					</div>
					<div className="grid gap-4 md:grid-cols-2">
						{[...Array(6)].map((_, i) => (
							<div key={i} className="space-y-2">
								<Skeleton className="h-4 w-[100px]" />
								<Skeleton className="h-5 w-full" />
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Inputs and Outputs Card */}
			<div className="space-y-4">
				<div className="space-y-2">
					<Skeleton className="h-8 w-[200px]" />
					<Skeleton className="h-5 w-[300px]" />
				</div>
				<div className="space-y-6">
					{/* Inputs */}
					<div className="space-y-2">
						<Skeleton className="h-6 w-[150px]" />
						<div className="rounded-md border overflow-hidden">
							<div className="grid grid-cols-[2fr_1fr_2fr_1fr] p-3 bg-muted/50 border-b">
								{[...Array(4)].map((_, i) => (
									<Skeleton key={i} className="h-4 w-full" />
								))}
							</div>
							<div className="divide-y">
								{[...Array(3)].map((_, i) => (
									<div key={i} className="grid grid-cols-[2fr_1fr_2fr_1fr] p-3">
										{[...Array(4)].map((_, j) => (
											<Skeleton key={j} className="h-4 w-full" />
										))}
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Outputs */}
					<div className="space-y-2">
						<Skeleton className="h-6 w-[150px]" />
						<div className="rounded-md border overflow-hidden">
							<div className="grid grid-cols-[1fr_2fr_1fr_1fr] p-3 bg-muted/50 border-b">
								{[...Array(4)].map((_, i) => (
									<Skeleton key={i} className="h-4 w-full" />
								))}
							</div>
							<div className="divide-y">
								{[...Array(3)].map((_, i) => (
									<div key={i} className="grid grid-cols-[1fr_2fr_1fr_1fr] p-3">
										{[...Array(4)].map((_, j) => (
											<Skeleton key={j} className="h-4 w-full" />
										))}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Raw Transaction Card */}
			<div className="space-y-4">
				<div className="space-y-2">
					<Skeleton className="h-8 w-[200px]" />
					<Skeleton className="h-5 w-[300px]" />
				</div>
				<div className="bg-muted p-4 rounded-md">
					<Skeleton className="h-[100px] w-full" />
				</div>
			</div>
		</div>
	)
}
