import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes, formatNumber, formatDate } from "@/lib/utils"
import Link from "next/link"
import { BitcoinValue } from "@/components/bitcoin-value"
import { ArrowLeft, Hash, ArrowDownUp, ArrowRight, CreditCard } from "lucide-react"
import { getTransaction } from "@/lib/tx-actions"
import { notFound } from "next/navigation"
import { Tx, TxInput, TxOutput } from "@/lib/types"
import { CopyButton } from "@/components/copy-button"
import { format } from "timeago.js"

export default async function TransactionPage({ params }: { params: Promise<{ id: string }> }) {
	const txid = (await params).id
	const tx = (await getTransaction(txid)) as Tx

	if (!tx) {
		notFound()
	}

	// Calculate total input and output values
	const totalOutput = tx.vout.reduce((sum: number, output: TxOutput) => sum + output.value, 0)

	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div className="flex items-center gap-2">
				<Link href={`/block/${tx.blockhash}`} className="rounded-md border p-2 inline-flex items-center justify-center hover:bg-muted">
					<ArrowLeft className="h-4 w-4" />
				</Link>
				<h1 className="text-3xl font-bold tracking-tight">Transaction Details</h1>
			</div>

			<Card>
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
										<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20">
											Confirmed
										</span>
									) : (
										<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20">
											Unconfirmed
										</span>
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

			<Card>
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<ArrowDownUp className="h-5 w-5" />
						<span>Inputs and Outputs</span>
					</CardTitle>
					<CardDescription>Transaction inputs and outputs</CardDescription>
				</CardHeader>
				<CardContent className="space-y-6">
					<div>
						<h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
							<ArrowRight className="h-4 w-4 text-red-500" />
							<span>Inputs ({tx.vin.length})</span>
						</h3>
						<div className="rounded-md border overflow-x-auto">
							<div className="grid grid-cols-[2fr_1fr_2fr_1fr] p-3 bg-muted/50 border-b min-w-[600px]">
								<div className="font-medium text-sm">Transaction ID</div>
								<div className="font-medium text-sm">Output Index</div>
								<div className="font-medium text-sm">Script/Witness</div>
								<div className="font-medium text-sm">Sequence</div>
							</div>
							<div className="divide-y">
								{tx.vin.map((input: TxInput, index: number) => (
									<div key={index} className="grid grid-cols-[2fr_1fr_2fr_1fr] p-3 items-start min-w-[600px]">
										<div className="font-mono text-xs break-all">
											{input.txid ? (
												<Link href={`/tx/${input.txid}`} className="hover:text-primary">
													{input.txid}
												</Link>
											) : (
												<span className="text-muted-foreground">Coinbase</span>
											)}
										</div>
										<div>{input.vout}</div>
										<div className="font-mono text-xs break-all">
											{input.txinwitness ? (
												<div className="space-y-1">
													{input.txinwitness.map((witness: string, i: number) => (
														<div key={i} className="text-muted-foreground">
															{witness}
														</div>
													))}
												</div>
											) : input.scriptSig?.hex ? (
												<div className="text-muted-foreground">{input.scriptSig.hex}</div>
											) : (
												<span className="text-muted-foreground">N/A</span>
											)}
										</div>
										<div>{input.sequence}</div>
									</div>
								))}
							</div>
						</div>
					</div>

					<div>
						<h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
							<ArrowRight className="h-4 w-4 text-green-500" />
							<span>Outputs ({tx.vout.length})</span>
						</h3>
						<div className="rounded-md border overflow-x-auto">
							<div className="grid grid-cols-[1fr_2fr_1fr_1fr] p-3 bg-muted/50 border-b min-w-[600px]">
								<div className="font-medium text-sm">Index</div>
								<div className="font-medium text-sm">Address</div>
								<div className="font-medium text-sm">Type</div>
								<div className="font-medium text-sm text-right">Value</div>
							</div>
							<div className="divide-y">
								{tx.vout.map((output: TxOutput) => (
									<div key={output.n} className="grid grid-cols-[1fr_2fr_1fr_1fr] p-3 items-start min-w-[600px]">
										<div>{output.n}</div>
										<div className="font-mono text-xs break-all">
											{output.scriptPubKey.address ? (
												<p>{output.scriptPubKey.address}</p>
											) : (
												<span className="text-muted-foreground">Non-standard</span>
											)}
										</div>
										<div>
											<span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border border-input">
												{output.scriptPubKey.type}
											</span>
										</div>
										<div className="text-right">
											<BitcoinValue value={output.value} />
										</div>
									</div>
								))}
								<div className="grid grid-cols-[1fr_2fr_1fr_1fr] p-3 items-center bg-muted/30 min-w-[600px]">
									<div className="font-medium">Total Output:</div>
									<div className="col-span-2"></div>
									<div className="text-right font-medium">
										<BitcoinValue value={totalOutput} />
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{tx.hex && (
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<CreditCard className="h-5 w-5" />
							<span>Raw Transaction</span>
						</CardTitle>
						<CardDescription>Raw transaction data</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="bg-muted p-4 rounded-md overflow-x-auto">
							<div className="flex items-start gap-2">
								<pre className="text-xs font-mono whitespace-pre-wrap break-all flex-1">{tx.hex}</pre>
								<CopyButton
									text={tx.hex}
									title="Raw transaction copied"
									description="The raw transaction data has been copied to your clipboard"
								/>
							</div>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
