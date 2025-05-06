import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AddressPage({ params }: { params: Promise<{ id: string }> }) {
	const { id } = await params

	return (
		<div className="space-y-6">
			<div className="flex items-center gap-2">
				<Button variant="outline" size="icon" asChild>
					<Link href="/">
						<ArrowLeft className="h-4 w-4" />
					</Link>
				</Button>
				<h1 className="text-3xl font-bold tracking-tight">Address</h1>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Address Details</CardTitle>
					<CardDescription>Address: {id}</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground">This page will display address details in the future.</p>
				</CardContent>
			</Card>
		</div>
	)
}
