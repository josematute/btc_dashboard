import { StatCard } from "@/components/stat-card"
import { formatBytes, formatNumber, formatDate } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { Blocks, Network, Database, Clock, Info } from "lucide-react"
import { cookies } from "next/headers"
import { LatestBlocksSection } from "@/components/latest-blocks-section"
import { getLatestBlocks } from "@/lib/block-actions"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { BitcoinValue } from "@/components/bitcoin-value"

async function getBitcoinInfo() {
	const cookieStore = await cookies()
	const token = cookieStore.get("accessToken")?.value
	if (!token) {
		return { blockchain: null, network: null, mempool: null }
	}

	try {
		const res = await fetch(`${process.env.BTC_SERVER_URL}/api/v1/btc/info`, {
			cache: "no-store",
			headers: {
				Authorization: `Bearer ${token}`
			}
		})

		if (!res.ok) {
			console.error("Failed to fetch Bitcoin info:", await res.text())
			return { blockchain: null, network: null, mempool: null }
		}

		const data = await res.json()
		return data
	} catch (error) {
		console.error("Error fetching Bitcoin info:", error)
		return { blockchain: null, network: null, mempool: null }
	}
}

// Dashboard content component
async function DashboardContent() {
	const { blockchain, network, mempool } = await getBitcoinInfo()
	const { blocks } = await getLatestBlocks(10)

	// If no data, show login prompt
	if (!blockchain || !network || !mempool) {
		return (
			<div className="flex flex-col items-center justify-center min-h-[60vh]">
				<h2 className="text-2xl font-bold mb-4">Authentication Required</h2>
				<p className="text-muted-foreground mb-6">Please log in to view Bitcoin blockchain data.</p>
				<div className="flex gap-4">
					<Link href="/login" className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
						Login
					</Link>
					<Link href="/signup" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md">
						Sign Up
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Bitcoin Dashboard</h1>
				<p className="text-muted-foreground mt-1">Real-time overview of the Bitcoin blockchain</p>
			</div>

			{/* Latest Blocks Section */}
			<LatestBlocksSection initialBlocks={blocks} initialPageSize={15} />

			{/* Summary Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Chain"
					value={blockchain.chain.toUpperCase()}
					description="Current blockchain"
					icon={<Image src="/Bitcoin.svg.png" alt="Bitcoin" width={16} height={16} />}
				/>
				<StatCard
					title="Block Height"
					value={formatNumber(blockchain.blocks)}
					description={`Last updated: ${formatDate(blockchain.time)}`}
					icon={<Blocks className="h-4 w-4" />}
				/>
				<StatCard
					title="Connections"
					value={network.connections}
					description={`Out: ${network.connections_out}, In: ${network.connections_in}`}
					icon={<Network className="h-4 w-4" />}
				/>
				<StatCard
					title="Mempool"
					value={mempool.size}
					description={`${formatBytes(mempool.bytes)} in pending transactions`}
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
						<div>
							<div className="flex items-center gap-2">
								<p className="text-sm font-medium text-muted-foreground">Difficulty Adjustment</p>
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<Info className="h-4 w-4 text-muted-foreground" />
										</TooltipTrigger>
										<TooltipContent className="max-w-[300px]">
											<p>
												The current mining difficulty target. This number represents how difficult it is to find a hash below the target
												value. Higher numbers mean more computational work is required to mine new blocks.
											</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							</div>
							<p className="text-lg font-semibold break-all">{formatNumber(blockchain.difficulty)}</p>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Size on Disk</p>
								<p className="text-lg font-semibold">{formatBytes(blockchain.size_on_disk)}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">Version</p>
								<p className="text-lg font-semibold">{network.subversion}</p>
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">Mempool Fee</p>
								<p className="text-lg font-semibold">
									<BitcoinValue value={mempool.total_fee || 0} />
								</p>
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
									{network.localservicesnames.map((service: string) => (
										<div key={service} className="bg-secondary text-secondary-foreground px-2 py-1 rounded-md text-xs">
											{service}
										</div>
									))}
								</div>
							</div>
							<div>
								<p className="text-sm font-medium text-muted-foreground">Network Status</p>
								<div className="grid grid-cols-2 gap-2 mt-1">
									{network.networks?.map((network: { name: string; reachable: boolean }) => (
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

export default function Home() {
	return (
		<div className="max-w-6xl mx-auto py-6 px-4">
			<DashboardContent />
		</div>
	)
}
