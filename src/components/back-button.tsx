"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function BackButton() {
	const router = useRouter()

	return (
		<Button variant="outline" size="icon" onClick={() => router.back()} className="cursor-pointer">
			<ArrowLeft className="h-4 w-4" />
		</Button>
	)
}
