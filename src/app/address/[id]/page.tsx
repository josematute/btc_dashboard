import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BackButton } from "@/components/back-button"

export default async function AddressPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div className="flex items-center gap-2">
				<BackButton />
				<h1 className="text-3xl font-bold tracking-tight">Address Details</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Address Information (more info coming soon)</CardTitle>
					<CardDescription>Detailed information about address {id}</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4">
						<div>
							<p className="text-sm font-medium text-muted-foreground">Address</p>
							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
								<p className="text-sm font-mono break-all min-w-0">{id}</p>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
