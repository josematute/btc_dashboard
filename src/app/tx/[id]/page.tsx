import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { getTransaction } from "@/lib/tx-actions"
import { notFound } from "next/navigation"
import { Tx } from "@/lib/types"
import { TxInformation } from "@/components/tx/tx-information"
import { TxInputsOutputs } from "@/components/tx/tx-inputsoutputs"
import { TxRaw } from "@/components/tx/tx-raw"

type Props = {
	params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { id } = await params
	const tx = (await getTransaction(id)) as Tx

	if (!tx) {
		return {
			title: "Transaction Not Found - Bitcoin Dashboard",
			description: "The requested Bitcoin transaction could not be found.",
		}
	}

	const truncatedTxid = tx.txid.substring(0, 16)
	const inputCount = tx.vin.length
	const outputCount = tx.vout.length

	return {
		title: `Bitcoin Transaction ${truncatedTxid}... - Bitcoin Dashboard`,
		description: `Bitcoin transaction details with ${inputCount} inputs and ${outputCount} outputs. Transaction ID: ${tx.txid}`,
	}
}

export default async function TransactionPage({ params }: { params: Promise<{ id: string }> }) {
	const txid = (await params).id
	const tx = (await getTransaction(txid)) as Tx

	if (!tx) {
		notFound()
	}

	return (
		<div className="space-y-6 py-6 px-4" data-testid="transaction-page">
			<div className="flex items-center gap-2">
				<Link href={`/block/${tx.blockhash}`} className="rounded-md border p-2 inline-flex items-center justify-center hover:bg-muted">
					<ArrowLeft className="h-4 w-4" />
				</Link>
				<h1 className="text-3xl font-bold tracking-tight">Transaction Details</h1>
			</div>

			<TxInformation tx={tx} />
			<TxInputsOutputs tx={tx} />
			{tx.hex && <TxRaw tx={tx} />}
		</div>
	)
}
