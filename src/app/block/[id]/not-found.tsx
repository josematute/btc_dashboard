import { NotFoundContent } from "@/components/not-found-content"

export default function BlockNotFound() {
	return (
		<NotFoundContent
			title="Block Not Found"
			description="We couldn't find the block you were looking for. Perhaps it was orphaned or never mined."
			secondaryButtonText="View Latest Blocks"
			secondaryButtonHref="/blocks"
		/>
	)
}
