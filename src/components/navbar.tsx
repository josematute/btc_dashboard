"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { UnitSelector } from "@/components/unit-selector"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import { BITCOIN_IMAGE_PATH } from "@/lib/constants"

interface NavbarProps {
	btcPrice: number | null
}

export function Navbar({ btcPrice }: NavbarProps) {
	const [isOpen, setIsOpen] = useState(false)
	const isSatsConverterPage = usePathname() === "/sats-converter"
	const isFCFCalculatorPage = usePathname() === "/fcf-calculator"
	const isBitcoin24Page = usePathname() === "/bitcoin24"

	const formatPrice = (price: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 0,
			maximumFractionDigits: 0
		}).format(price)
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-16">
			<div className="flex h-16 items-center px-4 max-w-6xl mx-auto">
				{/* Logo and Bitcoin Price together on desktop */}
				<div className="flex items-center gap-4">
					<Link href="/" className="flex items-center gap-2">
						<Image src={BITCOIN_IMAGE_PATH} alt="Bitcoin Logo" width={32} height={32} />
						<span className="text-xl font-bold hidden lg:inline">Bitcoin Dashboard</span>
					</Link>

					{/* Bitcoin Price - next to logo on desktop, hidden on mobile */}
					<div className="hidden md:flex items-center gap-2 bg-orange-50 dark:bg-orange-950 px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800">
						<span className="text-sm font-semibold text-orange-700 dark:text-orange-300">{btcPrice ? formatPrice(btcPrice) : "Loading..."}</span>
					</div>
				</div>

				{/* Bitcoin Price centered on mobile only */}
				<div className="flex-1 flex justify-center md:hidden">
					<div className="flex items-center gap-2 bg-orange-50 dark:bg-orange-950 px-3 py-1.5 rounded-full border border-orange-200 dark:border-orange-800">
						<span className="text-sm font-semibold text-orange-700 dark:text-orange-300">{btcPrice ? formatPrice(btcPrice) : "Loading..."}</span>
					</div>
				</div>

				{/* Spacer for desktop to push menu to the right */}
				<div className="flex-1 hidden md:block"></div>

				<div className="flex items-center gap-2">
					{/* Desktop view */}
					<div className="hidden md:flex items-center gap-4">
						{!isSatsConverterPage && (
							<Link href="/sats-converter">
								<Button variant="outline" size="sm" className="cursor-pointer">
									Sats Converter
								</Button>
							</Link>
						)}
						{!isFCFCalculatorPage && (
							<Link href="/fcf-calculator">
								<Button variant="outline" size="sm" className="cursor-pointer">
									FCF Calculator
								</Button>
							</Link>
						)}
						{!isBitcoin24Page && (
							<Link href="/bitcoin24">
								<Button variant="outline" size="sm" className="cursor-pointer">
									Bitcoin24
								</Button>
							</Link>
						)}
						<UnitSelector />
					</div>

					{/* Mobile view */}
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="md:hidden cursor-pointer">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px] md:w-[400px]">
							<SheetTitle hidden>Bitcoin Dashboard</SheetTitle>
							<SheetDescription hidden>Bitcoin Dashboard Menu</SheetDescription>
							<div className="flex flex-col gap-4 mt-4">
								<div className="flex items-center gap-2 px-2">
									<Image src={BITCOIN_IMAGE_PATH} alt="Bitcoin Logo" width={24} height={24} />
									<span className="text-lg font-semibold">Bitcoin Dashboard</span>
								</div>

								<div className="border-t pt-4">
									<div className="space-y-4">
										{!isSatsConverterPage && (
											<div className="px-2">
												<Link href="/sats-converter" className="block" onClick={() => setIsOpen(false)}>
													<Button variant="outline" className="w-full cursor-pointer max-w-[150px]">
														Sats Converter
													</Button>
												</Link>
											</div>
										)}
										{!isFCFCalculatorPage && (
											<div className="px-2">
												<Link href="/fcf-calculator" className="block" onClick={() => setIsOpen(false)}>
													<Button variant="outline" className="w-full cursor-pointer max-w-[150px]">
														FCF Calculator
													</Button>
												</Link>
											</div>
										)}
										{!isBitcoin24Page && (
											<div className="px-2">
												<Link href="/bitcoin24" className="block" onClick={() => setIsOpen(false)}>
													<Button variant="outline" className="w-full cursor-pointer max-w-[150px]">
														Bitcoin24
													</Button>
												</Link>
											</div>
										)}
										<div className="px-2">
											<p className="text-sm text-muted-foreground mb-2">Display Units</p>
											<UnitSelector />
										</div>
									</div>
								</div>
							</div>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</header>
	)
}
