import { Card, CardContent } from "@/components/ui/card"
import { SPECIAL_BLOCKS } from "@/lib/constants"
import { Bitcoin, Pizza, Sparkles, Zap, Lock, Settings } from "lucide-react"
import Link from "next/link"

const iconMap = {
	Bitcoin,
	Pizza,
	Sparkles,
	Zap,
	Lock,
	Settings
}

export function FamousBlocks() {
	return (
		<Card data-testid="famous-blocks">
			<CardContent className="p-6">
				<div className="space-y-4">
					<div className="flex items-center justify-between">
						<h2 className="text-2xl font-bold tracking-tight">Famous Blocks</h2>
						<p className="text-sm text-muted-foreground">Historical blocks in Bitcoin&apos;s blockchain</p>
					</div>
					<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{Object.entries(SPECIAL_BLOCKS).map(([height, block]) => {
							const Icon = iconMap[block.icon as keyof typeof iconMap]
							return (
								<Link
									key={height}
									href={`/block/${block.hash}`}
									className="group relative overflow-hidden rounded-lg border bg-background p-4 transition-all hover:shadow-lg">
									<div
										className={`absolute inset-0 bg-gradient-to-r ${block.gradient} opacity-0 transition-opacity group-hover:opacity-10`}
									/>
									<div className="relative space-y-3">
										<div className={`inline-flex rounded-lg bg-background/50 p-2 ${block.textColor}`}>
											<Icon className="h-5 w-5" />
										</div>
										<div className="space-y-1">
											<h3 className={`font-semibold ${block.textColor}`}>{block.title}</h3>
											<p className="text-sm text-muted-foreground line-clamp-2">{block.description}</p>
											<p className="text-xs font-mono text-muted-foreground">Block #{height}</p>
										</div>
									</div>
								</Link>
							)
						})}
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
