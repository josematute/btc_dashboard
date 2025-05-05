import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh]">
			<LoadingSpinner message="Mining block data..." />
		</div>
	)
}
