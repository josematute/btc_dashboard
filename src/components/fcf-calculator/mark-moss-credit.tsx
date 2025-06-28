import Link from "next/link"

export default function MarkMossReference() {
	return (
		<div className="mt-4 text-center">
			<p className="text-sm text-muted-foreground">
				All credits go to{" "}
				<Link
					href="https://www.youtube.com/@1MarkMoss"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 underline cursor-pointer hover:text-blue-800 font-medium">
					Mark Moss
				</Link>
				, Bitcoin educator.{" "}
				<Link
					href="https://www.youtube.com/watch?v=0dbBQyIGT_4&t=1283s"
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 underline cursor-pointer hover:text-blue-800">
					Watch his video explaining how Bitcoin collateralized loans work over time.
				</Link>
			</p>
		</div>
	)
}
