import { FCF_CALCULATOR_VIDEO_URL } from "@/lib/constants"
import Link from "next/link"

interface FCFVideoLinkProps {
	text: string
}

export default function FCFVideoLink({ text }: FCFVideoLinkProps) {
	return (
		<Link href={FCF_CALCULATOR_VIDEO_URL} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline cursor-pointer hover:text-blue-800">
			{text}
		</Link>
	)
}
