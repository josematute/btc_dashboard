import { StatCard } from "@/components/stat-card"
import { BlockList } from "@/components/block-list"
import { mockBlockchainInfo, mockNetworkInfo, mockMempoolInfo, mockBlocks } from "@/lib/mock-data"
import { formatBytes, formatNumber, formatDate } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

// We're using dynamic imports for the icons since we couldn't install lucide-react
export default function Home() {
	// Using placeholder SVGs instead of Lucide icons
	const BitcoinIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-4 w-4">
			<path d="M11.767 19.089c4.924.868 6.14-6.025 1.216-6.894m-1.216 6.894L5.86 18.047m5.908 1.042-.347 1.97m1.563-8.864c4.924.869 6.14-6.025 1.215-6.893m-1.215 6.893-3.94-.694m5.155-6.2L8.29 4.26m5.908 1.042.348-1.97M7.48 20.364l3.126-17.727"></path>
		</svg>
	)

	const BlocksIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-4 w-4">
			<rect x="2" y="2" width="8" height="8" rx="2"></rect>
			<rect x="14" y="2" width="8" height="8" rx="2"></rect>
			<rect x="2" y="14" width="8" height="8" rx="2"></rect>
			<rect x="14" y="14" width="8" height="8" rx="2"></rect>
		</svg>
	)

	const NetworkIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-4 w-4">
			<circle cx="12" cy="12" r="1"></circle>
			<path d="M7.5 4.2c-.3-.5-.9-.7-1.3-.4C3.9 5.5 2.3 8.1 2 11c-.1.5.4 1 1 1h2c.6 0 1-.4 1-1 0-1.1.3-2.1.9-3 .1-.1.1-.2.1-.3 0-.4-.2-.8-.5-1.1z"></path>
			<path d="M17.5 4.2c.3-.5.9-.7 1.3-.4C21.1 5.5 22.7 8.1 23 11c.1.5-.4 1-1 1h-2c-.6 0-1-.4-1-1 0-1.1-.3-2.1-.9-3-.1-.1-.1-.2-.1-.3 0-.4.2-.8.5-1.1z"></path>
			<path d="M4.2 17.5c-.5-.3-.7-.9-.4-1.3C5.5 13.9 8.1 12.3 11 12c.5-.1 1 .4 1 1v2c0 .6-.4 1-1 1-1.1 0-2.1.3-3 .9-.1.1-.2.1-.3.1-.4 0-.8-.2-1.1-.5z"></path>
			<path d="M19.8 17.5c.5-.3.7-.9.4-1.3-1.7-2.3-4.3-3.9-7.2-4.2-.5-.1-1 .4-1 1v2c0 .6.4 1 1 1 1.1 0 2.1.3 3 .9.1.1.2.1.3.1.4 0 .8-.2 1.1-.5z"></path>
		</svg>
	)

	const DatabaseIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-4 w-4">
			<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
			<path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
			<path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
		</svg>
	)

	const ClockIcon = () => (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-5 w-5">
			<circle cx="12" cy="12" r="10"></circle>
			<polyline points="12 6 12 12 16 14"></polyline>
		</svg>
	)

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
						<BlocksIcon />
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
				<StatCard title="Chain" value={mockBlockchainInfo.chain.toUpperCase()} description="Current blockchain" icon={<BitcoinIcon />} />
				<StatCard
					title="Block Height"
					value={formatNumber(mockBlockchainInfo.blocks)}
					description={`Last updated: ${formatDate(mockBlockchainInfo.time)}`}
					icon={<BlocksIcon />}
				/>
				<StatCard
					title="Connections"
					value={mockNetworkInfo.connections}
					description={`Out: ${mockNetworkInfo.connections_out}, In: ${mockNetworkInfo.connections_in}`}
					icon={<NetworkIcon />}
				/>
				<StatCard
					title="Mempool"
					value={mockMempoolInfo.size}
					description={`${formatBytes(mockMempoolInfo.bytes)} in pending transactions`}
					icon={<DatabaseIcon />}
				/>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<ClockIcon />
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
