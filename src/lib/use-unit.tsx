"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type UnitType = "btc" | "sats"

interface UnitContextType {
	unit: UnitType
	toggleUnit: () => void
	formatBTC: (value: number) => string
}

const UnitContext = createContext<UnitContextType>({
	unit: "btc",
	toggleUnit: () => {},
	formatBTC: (value) => `${value} BTC`
})

export function UnitProvider({ children }: { children: React.ReactNode }) {
	const [unit, setUnit] = useState<UnitType>("btc")

	const toggleUnit = () => {
		setUnit(unit === "btc" ? "sats" : "btc")
	}

	const formatBTC = (value: number) => {
		if (unit === "btc") {
			return `${value.toFixed(8)} BTC`
		} else {
			// 1 BTC = 100,000,000 sats
			return `${Math.round(value * 100000000).toLocaleString()} sats`
		}
	}

	return <UnitContext.Provider value={{ unit, toggleUnit, formatBTC }}>{children}</UnitContext.Provider>
}

export function useUnit() {
	return useContext(UnitContext)
}
