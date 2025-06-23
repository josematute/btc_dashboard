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

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false)
	const isSatsConverterPage = usePathname() === "/sats-converter"

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="flex h-16 items-center px-4 max-w-6xl mx-auto">
				<Link href="/" className="flex items-center gap-2">
					<Image src={BITCOIN_IMAGE_PATH} alt="Bitcoin Logo" width={32} height={32} />
					<span className="text-xl font-bold hidden sm:inline">Bitcoin Dashboard</span>
				</Link>
				<div className="ml-auto flex items-center gap-2">
					{/* Desktop view */}
					<div className="hidden sm:flex items-center gap-4">
						{!isSatsConverterPage && (
							<Link href="/sats-converter">
								<Button variant="outline" size="sm" className="cursor-pointer">
									Sats Converter
								</Button>
							</Link>
						)}
						<UnitSelector />
					</div>

					{/* Mobile view */}
					<Sheet open={isOpen} onOpenChange={setIsOpen}>
						<SheetTrigger asChild>
							<Button variant="ghost" size="icon" className="sm:hidden cursor-pointer">
								<Menu className="h-5 w-5" />
							</Button>
						</SheetTrigger>
						<SheetContent side="right" className="w-[300px] sm:w-[400px]">
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
													<Button variant="outline" className="w-full cursor-pointer">
														Sats Converter
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
