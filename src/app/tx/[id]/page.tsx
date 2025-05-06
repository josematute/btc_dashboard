import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatBytes, formatNumber, formatDate, shortenHash } from "@/lib/utils"
import Link from "next/link"
import { BitcoinValue } from "@/components/bitcoin-value"
import { ArrowLeft, Hash, ArrowDownUp, ArrowRight, CreditCard } from "lucide-react"
import { getTransaction } from "@/lib/transaction-actions"
import { notFound } from "next/navigation"
import { Transaction, TransactionInput, TransactionOutput } from "@/lib/types"

export default async function TransactionPage({ params }: { params: Promise<{ id: string }> }) {
	// Fetch real transaction data
	const txid = (await params).id
	const tx = (await getTransaction(txid)) as Transaction

	// If transaction not found, show 404
	if (!tx) {
		notFound()
	}

	// Calculate total input and output values
	const totalOutput = tx.vout.reduce((sum: number, output: TransactionOutput) => sum + output.value, 0)

	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div className="flex items-center gap-2">
				<Link href="/" className="rounded-md border p-2 inline-flex items-center justify-center hover:bg-muted">
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
							<p className="text-sm font-mono break-all">{tx.txid}</p>
						</div>

						{tx.blockhash && (
							<div>
								<p className="text-sm font-medium text-muted-foreground">Included in Block</p>
								<p className="text-sm font-mono">
									<Link href={`/block/${tx.status?.block_height || ""}`} className="hover:text-primary">
										{shortenHash(tx.blockhash, 16)}
									</Link>
								</p>
							</div>
						)}

						<div className="grid gap-4 md:grid-cols-2">
							<div>
								<p className="text-sm font-medium text-muted-foreground">Status</p>
								<div className="flex items-center gap-2 mt-1">
									{tx.status?.confirmed ? (
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
									<p className="text-sm">{formatDate(tx.time)}</p>
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
						<div className="rounded-md border">
							<div className="grid grid-cols-[2fr_1fr_2fr_1fr] p-3 bg-muted/50 border-b">
								<div className="font-medium text-sm">Transaction ID</div>
								<div className="font-medium text-sm">Output Index</div>
								<div className="font-medium text-sm hidden md:block">Script</div>
								<div className="font-medium text-sm hidden md:block">Sequence</div>
							</div>
							<div className="divide-y">
								{tx.vin.map((input: TransactionInput, index: number) => (
									<div key={index} className="grid grid-cols-[2fr_1fr_2fr_1fr] p-3 items-center">
										<div className="font-mono text-xs truncate">
											{input.txid ? (
												<Link href={`/tx/${input.txid}`} className="hover:text-primary">
													{shortenHash(input.txid, 8)}
												</Link>
											) : (
												<span className="text-muted-foreground">Coinbase</span>
											)}
										</div>
										<div>{input.vout}</div>
										<div className="hidden md:block font-mono text-xs truncate">
											{input.scriptSig?.hex ? shortenHash(input.scriptSig.hex, 8) : "N/A"}
										</div>
										<div className="hidden md:block">{input.sequence}</div>
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
						<div className="rounded-md border">
							<div className="grid grid-cols-[1fr_2fr_1fr_1fr] p-3 bg-muted/50 border-b">
								<div className="font-medium text-sm">Index</div>
								<div className="font-medium text-sm">Address</div>
								<div className="font-medium text-sm">Type</div>
								<div className="font-medium text-sm text-right">Value</div>
							</div>
							<div className="divide-y">
								{tx.vout.map((output: TransactionOutput) => (
									<div key={output.n} className="grid grid-cols-[1fr_2fr_1fr_1fr] p-3 items-center">
										<div>{output.n}</div>
										<div className="font-mono text-xs truncate">
											{output.scriptPubKey.address ? (
												<Link href={`/address/${output.scriptPubKey.address}`} className="hover:text-primary">
													{shortenHash(output.scriptPubKey.address, 8)}
												</Link>
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
								<div className="grid grid-cols-[1fr_2fr_1fr_1fr] p-3 items-center bg-muted/30">
									<div className="col-span-3 font-medium text-right">Total Output:</div>
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
							<pre className="text-xs font-mono whitespace-pre-wrap break-all">{tx.hex}</pre>
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	)
}
