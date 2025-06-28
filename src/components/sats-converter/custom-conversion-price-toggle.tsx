import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

interface CustomConversionPriceToggleProps {
	useCustomPrice: boolean
	customPrice: string
	onSetUseCustomPrice: (value: boolean) => void
	onHandleCustomPriceChange: (value: string) => void
}

export default function CustomConversionPriceToggle({
	useCustomPrice,
	customPrice,
	onSetUseCustomPrice,
	onHandleCustomPriceChange
}: CustomConversionPriceToggleProps) {
	return (
		<div className="mt-4 space-y-3" data-testid="custom-conversion-price-toggle">
			<div className="flex items-center gap-2">
				<Input
					type="checkbox"
					id="useCustomPrice"
					checked={useCustomPrice}
					onChange={(e) => onSetUseCustomPrice(e.target.checked)}
					className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
				/>
				<label htmlFor="useCustomPrice" className="text-sm font-medium cursor-pointer">
					Use custom Bitcoin price
				</label>
			</div>

			{useCustomPrice && (
				<div className="space-y-2">
					<Label htmlFor="customPrice" className="text-sm font-medium">
						Custom BTC Price (USD)
					</Label>
					<div className="relative">
						<span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
						<Input
							id="customPrice"
							type="text"
							value={customPrice}
							onChange={(e) => onHandleCustomPriceChange(e.target.value)}
							className="pl-8 h-12"
							placeholder="100,000"
						/>
					</div>
				</div>
			)}
		</div>
	)
}
