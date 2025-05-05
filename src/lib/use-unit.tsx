"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type UnitType = "btc" | "sats" | "usd"

interface UnitContextType {
	unit: UnitType
	setUnit: (unit: UnitType) => void
	formatBTC: (value: number) => string
	isUSDAvailable: boolean
}

const UnitContext = createContext<UnitContextType>({
	unit: "btc",
	setUnit: () => {},
	formatBTC: (value) => `${value} BTC`,
	isUSDAvailable: false
})

export function UnitProvider({ children }: { children: React.ReactNode }) {
	const [unit, setUnit] = useState<UnitType>("btc")
	const isUSDAvailable = false // Feature flag for USD conversion

	const formatBTC = (value: number) => {
		if (unit === "btc") {
			return `${value.toFixed(8)} BTC`
		} else if (unit === "sats") {
			// 1 BTC = 100,000,000 sats
			return `${Math.round(value * 100000000).toLocaleString()} sats`
		} else {
			// USD is not implemented yet
			return `$-- USD`
		}
	}

	return <UnitContext.Provider value={{ unit, setUnit, formatBTC, isUSDAvailable }}>{children}</UnitContext.Provider>
}

export function useUnit() {
	return useContext(UnitContext)
}
