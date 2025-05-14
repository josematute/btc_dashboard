"use client"

import { Button } from "@/components/ui/button"
import { copyToClipboard } from "@/lib/utils"
import { Copy, Check } from "lucide-react"
import { useState } from "react"

interface CopyButtonProps {
	text: string
	title: string
	description: string
	className?: string
}

export function CopyButton({ text, title, description, className }: CopyButtonProps) {
	const [copied, setCopied] = useState(false)

	const handleCopy = (e?: React.MouseEvent) => {
		if (e) {
			e.preventDefault()
		}
		copyToClipboard(text, { title, description })
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<Button variant="ghost" size="icon" className={`h-6 w-6 shrink-0 cursor-pointer ${className || ""}`} onClick={handleCopy}>
			{copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
			<span className="sr-only">Copy to clipboard</span>
		</Button>
	)
}
