"use client"

import { useUnit } from "@/lib/use-unit"
import { Check, ChevronsUpDown, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"

export function UnitSelector() {
	const { unit, setUnit, isUSDAvailable } = useUnit()

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="sm" className="h-8 gap-1 px-2 w-[80px]">
					{unit.toUpperCase()}
					<ChevronsUpDown className="h-3.5 w-3.5 opacity-50" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setUnit("btc")}>
					<Check className={cn("mr-2 h-4 w-4", unit === "btc" ? "opacity-100" : "opacity-0")} />
					BTC
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setUnit("sats")}>
					<Check className={cn("mr-2 h-4 w-4", unit === "sats" ? "opacity-100" : "opacity-0")} />
					SATS
				</DropdownMenuItem>
				<TooltipProvider>
					<Tooltip>
						<TooltipTrigger asChild>
							<div>
								<DropdownMenuItem
									className={!isUSDAvailable ? "opacity-50 cursor-not-allowed" : ""}
									onClick={() => isUSDAvailable && setUnit("usd")}>
									<Check className={cn("mr-2 h-4 w-4", unit === "usd" ? "opacity-100" : "opacity-0")} />
									<span className="flex items-center gap-1">
										<DollarSign className="h-3.5 w-3.5" />
										USD
									</span>
								</DropdownMenuItem>
							</div>
						</TooltipTrigger>
						<TooltipContent side="left">
							<p className="text-xs">USD conversion coming soon</p>
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
