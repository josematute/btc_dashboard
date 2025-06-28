import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Clock } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { Info } from "lucide-react"
import { formatNumber } from "@/lib/utils"
import { formatBytes } from "@/lib/utils"
import { BitcoinValue } from "../bitcoin-value"
import { BlockchainInfo } from "@/lib/types"
import { NetworkInfo } from "@/lib/types"
import { MempoolInfo } from "@/lib/types"

interface BlockchainStatsProps {
	blockchain: BlockchainInfo
	networkInfo: NetworkInfo
	mempool: MempoolInfo
}

export function BlockchainStats({ blockchain, networkInfo, mempool }: BlockchainStatsProps) {
	return (
		<Card data-testid="blockchain-stats">
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
										The current mining difficulty target. This number represents how difficult it is to find a hash below the target value.
										Higher numbers mean more computational work is required to mine new blocks.
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
						<p className="text-lg font-semibold">{networkInfo.subversion}</p>
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
	)
}
