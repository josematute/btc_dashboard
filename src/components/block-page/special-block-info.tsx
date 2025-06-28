import { Card, CardContent } from "@/components/ui/card"
import { SPECIAL_BLOCKS } from "@/lib/constants"
import { Bitcoin, Pizza, Sparkles, Zap, Lock, Settings } from "lucide-react"

interface SpecialBlockInfoProps {
	height: number
}

const iconMap = {
	Bitcoin,
	Pizza,
	Sparkles,
	Zap,
	Lock,
	Settings
}

export function SpecialBlockInfo({ height }: SpecialBlockInfoProps) {
	const specialBlock = SPECIAL_BLOCKS[height]

	if (!specialBlock) return null

	const Icon = iconMap[specialBlock.icon as keyof typeof iconMap]

	return (
		<Card className={`bg-gradient-to-r ${specialBlock.gradient} border-0`} data-testid="special-block-info">
			<CardContent className="p-6">
				<div className="flex items-start gap-4">
					<div className={`p-3 rounded-lg bg-background/50 ${specialBlock.textColor}`}>
						<Icon className="h-6 w-6" />
					</div>
					<div className="space-y-1">
						<h3 className={`text-lg font-semibold ${specialBlock.textColor}`}>{specialBlock.title}</h3>
						<p className="text-sm text-muted-foreground">{specialBlock.description}</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
