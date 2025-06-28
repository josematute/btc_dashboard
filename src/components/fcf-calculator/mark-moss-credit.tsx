import { MARK_MOSS_YOUTUBE_URL } from "@/lib/constants"
import Link from "next/link"
import FCFVideoLink from "./fcf-video-link"

export default function MarkMossReference() {
	return (
		<div className="mt-4 text-center">
			<p className="text-sm text-muted-foreground">
				All credits go to{" "}
				<Link
					href={MARK_MOSS_YOUTUBE_URL}
					target="_blank"
					rel="noopener noreferrer"
					className="text-blue-600 underline cursor-pointer hover:text-blue-800 font-medium">
					Mark Moss
				</Link>
				, Bitcoin educator. <FCFVideoLink text="Watch his video explaining how Bitcoin collateralized loans work over time." />
			</p>
		</div>
	)
}
