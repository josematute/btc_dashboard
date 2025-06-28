import { Table, TableHeader, TableRow, TableHead, TableCell, TableBody } from "@/components/ui/table"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import { HelpCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { formatCurrency } from "@/lib/utils/prices.utils"
import { updateBitcoinAGR } from "@/lib/utils/fcf-calculator.utils"
import { formatNumber } from "@/lib/utils/string.utils"
import { YearData } from "@/lib/types"

interface FCFCalculatorTableProps {
	yearData: YearData[]
	showAge: boolean
	holdings: number
	startingYear: number
	interestRate: number
	desiredCashflow: number
	setYearData: (data: YearData[]) => void
}

export default function FCFCalculatorTable({ yearData, showAge, holdings, startingYear, interestRate, desiredCashflow, setYearData }: FCFCalculatorTableProps) {
	return (
		<Table data-id="fcf-calculator-table">
			<TableHeader>
				<TableRow>
					<TableHead>Year</TableHead>
					{showAge && <TableHead>Age</TableHead>}
					<TableHead>Value</TableHead>

					<TableHead>
						<div className="flex items-center gap-1">
							<span>AGR (%)</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p>Annual Growth Rate - The percentage change in Bitcoin price for this year</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TableHead>

					<TableHead>Gain</TableHead>

					<TableHead>
						<div className="flex items-center gap-1">
							<span>LTV (%)</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p>Loan-to-Value ratio - Percentage of your Bitcoin value borrowed as collateral</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TableHead>

					<TableHead>
						<div className="flex items-center gap-1">
							<span>Debt</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p>Total amount borrowed against your Bitcoin collateral</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TableHead>

					<TableHead>
						<div className="flex items-center gap-1">
							<span>Interest</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p>Interest payment on the debt borrowed</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TableHead>

					<TableHead>
						<div className="flex items-center gap-1">
							<span>FCF</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p>Free Cash Flow - Net cash available after borrowing new debt, paying interest, and repaying previous year&apos;s debt</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TableHead>

					<TableHead>
						<div className="flex items-center gap-1">
							<span>PP_BTC</span>
							<Tooltip>
								<TooltipTrigger asChild>
									<HelpCircle className="h-3 w-3 cursor-help text-muted-foreground" />
								</TooltipTrigger>
								<TooltipContent>
									<p>Price Per Bitcoin - The calculated Bitcoin price based on your total portfolio value</p>
								</TooltipContent>
							</Tooltip>
						</div>
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{yearData.map((data) => (
					<TableRow key={data.year}>
						<TableCell className="font-medium">{data.year}</TableCell>
						{showAge && <TableCell className="font-medium">{data.age}</TableCell>}
						<TableCell>{formatCurrency(data.value)}</TableCell>
						<TableCell>
							<Input
								type="number"
								step="1"
								value={data.agr}
								onChange={(e) => {
									const updatedData = updateBitcoinAGR({
										year: data.year,
										newAGR: Number.parseFloat(e.target.value) || 0,
										yearData,
										holdings,
										startingYear,
										interestRate,
										desiredCashflow
									})
									setYearData(updatedData)
								}}
								className="w-20"
							/>
						</TableCell>
						<TableCell className={data.gain >= 0 ? "text-green-600" : "text-red-600"}>{formatCurrency(data.gain)}</TableCell>
						<TableCell>
							{data.year >= startingYear ? (
								<span className={data.ltv > 100 ? "text-red-600 font-semibold" : ""}>{formatNumber(data.ltv)}%</span>
							) : (
								"0.0"
							)}
						</TableCell>
						<TableCell>{formatCurrency(data.debt)}</TableCell>
						<TableCell>{formatCurrency(data.interest)}</TableCell>
						<TableCell className={data.fcf >= 0 ? "text-green-600" : "text-red-600"}>
							{data.year >= startingYear ? (
								<Tooltip>
									<TooltipTrigger asChild>
										<span className="cursor-help underline">{formatCurrency(data.fcf)}</span>
									</TooltipTrigger>
									<TooltipContent className="max-w-xs">
										<div className="space-y-2">
											<p className="font-semibold text-sm">FCF Calculation for {data.year}:</p>
											<div className="text-xs space-y-1">
												<div className="flex justify-between">
													<span>New Debt:</span>
													<span className="font-mono">{formatCurrency(data.debt)}</span>
												</div>
												<div className="flex justify-between">
													<span>Interest Payment:</span>
													<span className="font-mono text-red-500">-{formatCurrency(data.interest)}</span>
												</div>
												<div className="flex justify-between">
													<span>Previous Year Debt:</span>
													<span className="font-mono text-red-500">
														-{formatCurrency(yearData.find((d) => d.year === data.year - 1)?.debt || 0)}
													</span>
												</div>
												<hr className="border-gray-300" />
												<div className="flex justify-between font-semibold">
													<span>Free Cash Flow:</span>
													<span className={`font-mono ${data.fcf >= 0 ? "text-green-600" : "text-red-600"}`}>
														{formatCurrency(data.fcf)}
													</span>
												</div>
											</div>
											<p className="text-xs text-gray-500 italic">Formula: New Debt - Interest - Previous Debt</p>
										</div>
									</TooltipContent>
								</Tooltip>
							) : (
								formatCurrency(data.fcf)
							)}
						</TableCell>
						<TableCell>{formatCurrency(data.ppBtc)}</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	)
}
