import { NotFoundContent } from "@/components/not-found-content"

export default function TxNotFound() {
	return (
		<NotFoundContent
			title="Transaction Not Found"
			description="We couldn't find the transaction you were looking for. It may have been dropped from the mempool or never broadcast."
			secondaryButtonText="View Mempool"
			secondaryButtonHref="/mempool"
		/>
	)
}
