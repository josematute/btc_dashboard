import { StatCard } from "@/components/stat-card"
import { formatBytes, formatNumber, formatDate } from "@/lib/utils/string.utils"
import Image from "next/image"
import { Blocks, Network, Database } from "lucide-react"
import { LatestBlocksSection } from "@/components/latest-blocks-section"
import { getLatestBlocks, getBitcoinInfo } from "@/lib/block-actions"
import { FamousBlocks } from "@/components/dashboard/famous-blocks"
import { BITCOIN_IMAGE_PATH } from "@/lib/constants"
import { NetworkInfoCard } from "@/components/dashboard/network-info-card"
import { BlockchainStats } from "@/components/dashboard/blockchain-stats"

// Force dynamic rendering since we need to fetch live data
export const dynamic = "force-dynamic"

export default async function Home() {
	const { blockchain, network, mempool } = await getBitcoinInfo()
	const { blocks } = await getLatestBlocks(10)

	return (
		<div className="space-y-6 py-6 px-4" data-testid="dashboard">
			<div>
				<h1 className="text-3xl font-bold tracking-tight" data-testid="dashboard-title">
					Bitcoin Dashboard
				</h1>
				<p className="text-muted-foreground mt-1" data-testid="dashboard-description">
					Real-time overview of the Bitcoin blockchain
				</p>
			</div>

			{/* Latest Blocks Section */}
			<LatestBlocksSection initialBlocks={blocks} initialPageSize={15} />

			{/* Summary Stats */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Chain"
					value={blockchain.chain.toUpperCase()}
					description="Current blockchain"
					icon={<Image src={BITCOIN_IMAGE_PATH} alt="Bitcoin" width={16} height={16} />}
					data-testid="chain-stat"
				/>
				<StatCard
					title="Block Height"
					value={formatNumber(blockchain.blocks)}
					description={`Last updated: ${formatDate(blockchain.time)}`}
					icon={<Blocks className="h-4 w-4" />}
					data-testid="block-height-stat"
				/>
				<StatCard
					title="Connections"
					value={network.connections}
					description={`Out: ${network.connections_out}, In: ${network.connections_in}`}
					icon={<Network className="h-4 w-4" />}
					data-testid="connections-stat"
				/>
				<StatCard
					title="Mempool"
					value={mempool.size}
					description={`${formatBytes(mempool.bytes)} in pending transactions`}
					icon={<Database className="h-4 w-4" />}
					data-testid="mempool-stat"
				/>
			</div>

			<div className="grid gap-4 md:grid-cols-2">
				<BlockchainStats blockchain={blockchain} networkInfo={network} mempool={mempool} />
				<NetworkInfoCard networkInfo={network} />
			</div>

			{/* Bitcoin Block Museum */}
			<FamousBlocks />
		</div>
	)
}
