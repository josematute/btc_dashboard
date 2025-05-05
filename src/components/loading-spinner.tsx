import Image from "next/image"

interface LoadingSpinnerProps {
	size?: "sm" | "md" | "lg"
	message?: string
	fullHeight?: boolean
}

export function LoadingSpinner({ size = "md", message = "Loading...", fullHeight = false }: LoadingSpinnerProps) {
	const sizeClasses = {
		sm: "w-8 h-8",
		md: "w-12 h-12",
		lg: "w-16 h-16"
	}

	return (
		<div className={`flex flex-col items-center justify-center text-center ${fullHeight ? "min-h-[80vh]" : "py-8"}`}>
			<div className={`relative ${sizeClasses[size]} mb-4 animate-spin`}>
				<Image src="/Bitcoin.svg.png" alt="Bitcoin Logo" fill className="object-contain" priority />
			</div>
			{message && <p className="text-muted-foreground font-medium">{message}</p>}
		</div>
	)
}
