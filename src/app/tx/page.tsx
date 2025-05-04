import { TransactionList } from "@/components/transaction-list"
import { mockTransactions } from "@/lib/mock-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function TransactionsPage() {
	return (
		<div className="space-y-6 max-w-6xl mx-auto py-6 px-4">
			<div>
				<h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
				<p className="text-muted-foreground mt-1">Browse the latest Bitcoin transactions</p>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Recent Transactions</CardTitle>
					<CardDescription>The most recent transactions on the Bitcoin blockchain</CardDescription>
				</CardHeader>
				<CardContent>
					<TransactionList transactions={mockTransactions} />
				</CardContent>
			</Card>
		</div>
	)
}
