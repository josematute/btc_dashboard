import { LoadingSpinner } from "@/components/loading-spinner"

export default function Loading() {
	return (
		<div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
			<LoadingSpinner size="lg" message="Retrieving blocks... please wait" fullHeight />
			<h2 className="text-2xl font-bold mt-2">Loading Blockchain Data</h2>
		</div>
	)
}
