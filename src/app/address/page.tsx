import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AddressesPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Addresses</h1>
				<p className="text-muted-foreground mt-1">Search for Bitcoin addresses</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Address Search</CardTitle>
					<CardDescription>Enter a Bitcoin address to view its details</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">Address search functionality will be implemented in the future.</p>
				</CardContent>
			</Card>
		</div>
	)
}
