import { StatCard } from "@/components/stat-card"
import { BlockList } from "@/components/block-list"
import { mockBlockchainInfo, mockNetworkInfo, mockMempoolInfo, mockBlocks } from "@/lib/mock-data"
import { formatBytes, formatNumber, formatDate } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Blocks, Network, Database, Clock } from "lucide-react"

export default function Home() {
	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Bitcoin Dashboard</h1>
				<p className="text-muted-foreground mt-1">Real-time overview of the Bitcoin blockchain</p>
			</div>

			{/* Latest Blocks Section */}
			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Blocks className="h-4 w-4" />
						<span>Latest Blocks</span>
					</CardTitle>
					<CardDescription>
						The most recently mined blocks on the Bitcoin blockchain.{" "}
						<Link href="/blocks" className="text-primary hover:underline">
							View all
						</Link>
					</CardDescription>
				</CardHeader>
				<CardContent>
					<BlockList blocks={mockBlocks} />
				</CardContent>
			</Card>

			{/* Summary Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Chain"
					value={mockBlockchainInfo.chain.toUpperCase()}
					description="Current blockchain"
					icon={<Image src="/Bitcoin.svg.png" alt="Bitcoin" width={16} height={16} />}
				/>
				<StatCard
					title="Block Height"
					value={formatNumber(mockBlockchainInfo.blocks)}
					description={`Last updated: ${formatDate(mockBlockchainInfo.time)}`}
					icon={<Blocks className="h-4 w-4" />}
				/>
				<StatCard
					title="Connections"
					value={mockNetworkInfo.connections}
					description={`Out: ${mockNetworkInfo.connections_out}, In: ${mockNetworkInfo.connections_in}`}
					icon={<Network className="h-4 w-4" />}
				/>
				<StatCard
					title="Mempool"
					value={mockMempoolInfo.size}
					description={`${formatBytes(mockMempoolInfo.bytes)} in pending transactions`}
					icon={<Database className="h-4 w-4" />}
				/>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Clock className="h-5 w-5" />
							<span>Blockchain Stats</span>
						</CardTitle>
						<CardDescription>Current state of the Bitcoin blockchain</CardDescription>
					</CardHeader>
					<CardContent className="grid gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Difficulty</p>
								<p className="text-lg font-semibold">{formatNumber(mockBlockchainInfo.difficulty)}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">Size on Disk</p>
								<p className="text-lg font-semibold">{formatBytes(mockBlockchainInfo.size_on_disk)}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">Version</p>
								<p className="text-lg font-semibold">{mockNetworkInfo.subversion}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">Mempool Fee</p>
								<p className="text-lg font-semibold">{mockMempoolInfo.total_fee.toFixed(8)} BTC</p>
							</div>
						</div>
					</CardContent>
				</Card>

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
									{mockNetworkInfo.localservicesnames.map((service) => (
										<div key={service} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
											{service}
										</div>
									))}
								</div>
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">Network Status</p>
								<div className="grid grid-cols-2 gap-2 mt-1">
									{mockNetworkInfo.networks.map((network) => (
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
			</div>
		</div>
	)
}
