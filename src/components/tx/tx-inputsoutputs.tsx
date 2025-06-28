import { Tx } from "@/lib/types"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { ArrowDownUp, ArrowRight } from "lucide-react"
import { TxInput, TxOutput } from "@/lib/types"
import { BitcoinValue } from "../bitcoin-value"
import Link from "next/link"
interface TxInputsOutputsProps {
	tx: Tx
}

export function TxInputsOutputs({ tx }: TxInputsOutputsProps) {
	const totalOutput = tx.vout.reduce((sum: number, output: TxOutput) => sum + output.value, 0)

	return (
		<Card data-testid="tx-inputs-outputs">
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
	)
}
