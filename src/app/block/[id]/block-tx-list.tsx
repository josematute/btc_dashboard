"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { formatNumber, copyToClipboard } from "@/lib/utils/string.utils"
import Link from "next/link"
import { Database, ChevronLeft, ChevronRight, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

interface BlockTxListProps {
	txids: string[]
	blockHeight: number
}

export function BlockTxList({ txids, blockHeight }: BlockTxListProps) {
	const [currentPage, setCurrentPage] = useState(1)
	const transactionsPerPage = 25
	const totalPages = Math.ceil(txids.length / transactionsPerPage)
	const startIndex = (currentPage - 1) * transactionsPerPage
	const endIndex = startIndex + transactionsPerPage
	const currentTransactions = txids.slice(startIndex, endIndex)

	return (
		<Card data-testid="block-tx-list">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Database className="h-5 w-5" />
					<span>Transactions</span>
				</CardTitle>
				<CardDescription>
					{formatNumber(txids.length)} transactions included in block #{blockHeight}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="border rounded-md">
					<div className="grid grid-cols-[1fr_auto] gap-4 p-4 font-medium border-b">
						<div>Transaction ID</div>
						<div className="hidden md:block">Index</div>
					</div>
					<div className="divide-y">
						{currentTransactions.map((txid, index) => (
							<div key={txid} className="grid grid-cols-[1fr_auto] gap-4 p-4">
								<div className="flex items-start gap-2 min-w-0">
									<div className="font-mono text-xs md:text-sm break-all">
										<Link href={`/tx/${txid}`} className="hover:text-primary">
											{txid}
										</Link>
									</div>
									<Button
										variant="ghost"
										size="icon"
										className="h-6 w-6 shrink-0 cursor-pointer"
										onClick={() => {
											copyToClipboard(txid, {
												title: "Transaction ID copied",
												description: "The transaction ID has been copied to your clipboard"
											})
										}}>
										<Copy className="h-3 w-3" />
										<span className="sr-only">Copy transaction ID</span>
									</Button>
								</div>
								<div className="hidden md:block shrink-0">{startIndex + index}</div>
							</div>
						))}
					</div>
				</div>

				{/* Pagination */}
				{totalPages > 1 && (
					<div className="flex flex-col sm:flex-row items-center justify-between gap-2 mt-4">
						<div className="text-sm text-muted-foreground order-2 sm:order-1">
							<span className="hidden sm:inline">
								Showing {startIndex + 1}-{Math.min(endIndex, txids.length)} of {txids.length} transactions
							</span>
							<span className="sm:hidden">
								{startIndex + 1}-{Math.min(endIndex, txids.length)} of {txids.length}
							</span>
						</div>
						<div className="flex items-center gap-2 order-1 sm:order-2">
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 cursor-pointer"
								onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
								disabled={currentPage === 1}>
								<ChevronLeft className="h-4 w-4" />
								<span className="sr-only">Previous page</span>
							</Button>
							<div className="flex items-center gap-1 px-2 sm:px-4 whitespace-nowrap">
								<span className="text-sm font-medium">Page</span>
								<span className="text-sm">{currentPage}</span>
								<span className="text-sm text-muted-foreground">of {totalPages}</span>
							</div>
							<Button
								variant="outline"
								size="icon"
								className="h-8 w-8 cursor-pointer"
								onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
								disabled={currentPage === totalPages}>
								<ChevronRight className="h-4 w-4" />
								<span className="sr-only">Next page</span>
							</Button>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	)
}
