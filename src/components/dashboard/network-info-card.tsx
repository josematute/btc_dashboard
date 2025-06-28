import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { NetworkInfo } from "@/lib/types"

interface NetworkInfoCardProps {
	networkInfo: NetworkInfo
}

export function NetworkInfoCard({ networkInfo }: NetworkInfoCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Network Status</CardTitle>
				<CardDescription>Current Bitcoin network information</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="space-y-4">
					<div>
						<p className="text-sm font-medium text-muted-foreground">Network Services</p>
						<div className="flex flex-wrap gap-2 mt-1">
							{networkInfo.localservicesnames.map((service: string) => (
								<div key={service} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
									{service}
								</div>
							))}
						</div>
					</div>
					<div>
						<p className="text-sm font-medium text-muted-foreground">Network Status</p>
						<div className="grid grid-cols-2 gap-2 mt-1">
							{networkInfo.networks?.map((network: { name: string; reachable: boolean }) => (
								<div key={network.name} className="flex items-center gap-2">
									<div className={`h-2 w-2 rounded-full ${network.reachable ? "bg-green-500" : "bg-red-500"}`} />
									<span className="text-sm">{network.name}</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
