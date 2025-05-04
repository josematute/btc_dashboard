import { shortenHash, formatDate } from "@/lib/utils"
import Link from "next/link"
import { BitcoinValue } from "@/components/bitcoin-value"

interface Transaction {
	txid: string
	time: number
	size: number
	fee: number
}

interface TransactionListProps {
	transactions: Transaction[]
}

export function TransactionList({ transactions }: TransactionListProps) {
	return (
		<div className="space-y-4">
			{transactions.map((tx) => (
				<div key={tx.txid} className="flex items-center justify-between border-b pb-3">
					<div className="space-y-1">
						<div className="flex items-center gap-2">
							<Link href={`/tx/${tx.txid}`} className="text-sm hover:underline text-blue-600 dark:text-blue-400 font-mono">
								{shortenHash(tx.txid)}
							</Link>
						</div>
						<p className="text-xs text-muted-foreground">{formatDate(tx.time / 1000)}</p>
					</div>
					<div className="text-right">
						<div className="text-sm font-medium">
							<BitcoinValue value={tx.fee} />
						</div>
						<p className="text-xs text-muted-foreground">{tx.size} bytes</p>
					</div>
				</div>
			))}
		</div>
	)
}
