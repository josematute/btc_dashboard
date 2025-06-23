import { NotFoundContent } from "@/components/not-found-content"

export default function NotFound() {
	return (
		<NotFoundContent
			title="Page Not Found"
			description="We couldn't find the page you were looking for. It may have been moved or doesn't exist."
			secondaryButtonText="View Latest Blocks"
			secondaryButtonHref="/blocks"
		/>
	)
}
