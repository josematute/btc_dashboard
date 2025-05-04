"use client"

import { useUnit } from "@/lib/use-unit"

interface BitcoinValueProps {
	value: number
}

export function BitcoinValue({ value }: BitcoinValueProps) {
	const { formatBTC } = useUnit()

	return <span>{formatBTC(value)}</span>
}
