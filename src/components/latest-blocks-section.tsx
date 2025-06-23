"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlockList } from "@/components/block-list"
import { Button } from "@/components/ui/button"
import { Blocks } from "lucide-react"
import Link from "next/link"
import { getMoreBlocks } from "@/lib/block-actions"
import { LoadingSpinner } from "./loading-spinner"
import { Block } from "@/lib/types"
import { usePathname } from "next/navigation"

interface LatestBlocksSectionProps {
	initialBlocks: Block[]
	initialPageSize: number
}

export function LatestBlocksSection({ initialBlocks, initialPageSize }: LatestBlocksSectionProps) {
	const [blocks, setBlocks] = useState<Block[]>(initialBlocks)
	const [isLoading, setIsLoading] = useState(false)
	const [page, setPage] = useState(1)
	const pageSize = initialPageSize
	const pathname = usePathname()
	const isBlocksPage = pathname === "/blocks"

	async function loadMoreBlocks() {
		setIsLoading(true)
		try {
			const nextPage = page + 1
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
					The most recently mined blocks on the Bitcoin blockchain{" "}
					{!isBlocksPage && (
						<Link href="/blocks" className="text-primary hover:underline text-md font-semibold ml-2">
							View all
						</Link>
					)}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<BlockList blocks={blocks} />

				{isLoading ? (
					<div className="mt-4">
						<LoadingSpinner size="sm" message="Retrieving additional blocks..." />
					</div>
				) : (
					<div className="mt-4 text-center">
						<Button variant="outline" onClick={loadMoreBlocks} disabled={isLoading} className="w-full cursor-pointer">
							Load More Blocks
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
