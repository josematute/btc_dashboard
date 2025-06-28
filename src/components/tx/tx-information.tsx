import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { CopyButton } from "../copy-button"
import { Hash } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { format } from "timeago.js"
import { formatNumber } from "@/lib/utils"
import { formatBytes } from "@/lib/utils"
import { Tx } from "@/lib/types"
import { BitcoinValue } from "../bitcoin-value"
import { Badge } from "../ui/badge"
import Link from "next/link"

interface TxInformationProps {
	tx: Tx
}

export function TxInformation({ tx }: TxInformationProps) {
	return (
		<Card data-testid="tx-information">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Hash className="h-5 w-5" />
					<span>Transaction Information</span>
				</CardTitle>
				<CardDescription>Detailed information about transaction</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="grid gap-4">
					<div>
						<p className="text-sm font-medium text-muted-foreground">Transaction ID</p>
						<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
							<p className="text-sm font-mono break-all min-w-0">{tx.txid}</p>
							<CopyButton text={tx.txid} title="Transaction ID copied" description="The transaction ID has been copied to your clipboard" />
						</div>
					</div>

					{tx.blockhash && (
						<div>
							<p className="text-sm font-medium text-muted-foreground">Included in Block</p>
							<div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
								<p className="text-sm font-mono min-w-0">
									<Link href={`/block/${tx.blockhash}`} className="hover:text-primary break-all">
										{tx.blockhash}
									</Link>
								</p>
								<CopyButton text={tx.blockhash} title="Block hash copied" description="The block hash has been copied to your clipboard" />
							</div>
						</div>
					)}

					<div className="grid gap-4 md:grid-cols-2">
						<div>
							<p className="text-sm font-medium text-muted-foreground">Status</p>
							<div className="flex items-center gap-2 mt-1">
								{tx.confirmations && tx.confirmations >= 6 ? (
									<Badge variant="default">Confirmed</Badge>
								) : (
									<Badge variant="secondary">Unconfirmed</Badge>
								)}
								{tx.confirmations && (
									<span className="text-sm text-muted-foreground">
										{tx.confirmations} confirmation{tx.confirmations !== 1 ? "s" : ""}
									</span>
								)}
							</div>
						</div>

						{tx.time && (
							<div>
								<p className="text-sm font-medium text-muted-foreground">Timestamp</p>
								<p className="text-sm">
									{formatDate(tx.time)}
									<span className="ml-1 text-muted-foreground">({format(tx.time * 1000)})</span>
								</p>
							</div>
						)}

						<div>
							<p className="text-sm font-medium text-muted-foreground">Size</p>
							<p className="text-sm">{formatBytes(tx.size)}</p>
						</div>

						<div>
							<p className="text-sm font-medium text-muted-foreground">Weight</p>
							<p className="text-sm">{formatNumber(tx.weight)} units</p>
						</div>

						<div>
							<p className="text-sm font-medium text-muted-foreground">Version</p>
							<p className="text-sm">{tx.version}</p>
						</div>

						<div>
							<p className="text-sm font-medium text-muted-foreground">Locktime</p>
							<p className="text-sm">{tx.locktime}</p>
						</div>
					</div>

					{tx.fee !== undefined && (
						<div className="mt-2">
							<p className="text-sm font-medium text-muted-foreground">Fee</p>
							<p className="text-sm">
								<BitcoinValue value={tx.fee} />
								<span className="text-muted-foreground ml-2">({((tx.fee / tx.vsize) * 100000000).toFixed(1)} sat/vB)</span>
							</p>
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	)
}
