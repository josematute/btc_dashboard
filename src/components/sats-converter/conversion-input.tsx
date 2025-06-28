import type React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from "next/image"

interface ConversionInputProps {
	id: string
	label: string
	value: string
	placeholder: string
	imageSrc: string
	imageAlt: string
	symbol?: string
	onChange: (value: string) => void
	className?: string
}

export default function ConversionInput({ id, label, value, placeholder, imageSrc, imageAlt, symbol, onChange, className = "" }: ConversionInputProps) {
	return (
		<div className="space-y-2" data-testid="conversion-input">
			<div className="flex items-center gap-2">
				<Image src={imageSrc} alt={imageAlt} width={20} height={20} />
				<Label htmlFor={id} className="text-base font-medium">
					{label}
				</Label>
			</div>
			<div className="relative">
				{symbol && <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">{symbol}</span>}
				<Input
					id={id}
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className={`h-12 ${symbol ? "pl-8" : ""} ${className}`}
					placeholder={placeholder}
				/>
			</div>
		</div>
	)
}
