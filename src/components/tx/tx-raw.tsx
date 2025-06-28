import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card"
import { CreditCard } from "lucide-react"
import { Tx } from "@/lib/types"
import { CopyButton } from "@/components/copy-button"

interface TxRawProps {
	tx: Tx
}

export function TxRaw({ tx }: TxRawProps) {
	if (!tx.hex) return null

	return (
		<Card data-testid="tx-raw">
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
						<CopyButton text={tx.hex} title="Raw transaction copied" description="The raw transaction data has been copied to your clipboard" />
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
