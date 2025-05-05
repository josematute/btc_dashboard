"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlockList } from "@/components/block-list"
import { Button } from "@/components/ui/button"
import { Blocks } from "lucide-react"
import Link from "next/link"
import { getMoreBlocks, BlockWithTxCount } from "@/lib/block-actions"
import { LoadingSpinner } from "./loading-spinner"

interface LatestBlocksSectionProps {
	initialBlocks: BlockWithTxCount[]
	initialPageSize: number
}

export function LatestBlocksSection({ initialBlocks, initialPageSize }: LatestBlocksSectionProps) {
	const [blocks, setBlocks] = useState<BlockWithTxCount[]>(initialBlocks)
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)
	const pageSize = initialPageSize

	async function loadMoreBlocks() {
		setIsLoading(true)
		try {
			const nextPage = page + 1
			// Call our server action which includes proper authorization headers
			const newBlocks = await getMoreBlocks(nextPage, pageSize)

			if (newBlocks.length > 0) {
				// Append new blocks
				setBlocks((prev) => [...prev, ...newBlocks])
				setPage(nextPage)
			}
		} catch (error) {
			console.error("Error loading more blocks:", error)
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Blocks className="h-4 w-4" />
					<span>Latest Blocks</span>
				</CardTitle>
				<CardDescription>
					The most recently mined blocks on the Bitcoin blockchain.{" "}
					<Link href="/blocks" className="text-primary hover:underline">
						View all
					</Link>
				</CardDescription>
			</CardHeader>
			<CardContent>
				<BlockList blocks={blocks} />

				{isLoading ? (
					<div className="mt-4">
						<LoadingSpinner size="sm" message="Mining additional blocks..." />
					</div>
				) : (
					<div className="mt-4 text-center">
						<Button variant="outline" onClick={loadMoreBlocks} disabled={isLoading} className="w-full">
							Load More Blocks
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
