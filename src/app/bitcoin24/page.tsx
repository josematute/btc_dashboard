import { Metadata } from "next"
import { Bitcoin24Client } from "@/components/bitcoin24/bitcoin24-client"

export const metadata: Metadata = {
	title: "Bitcoin24 - 21-Year Bitcoin Strategy Forecasting",
	description:
		"Simulate 21-year outcomes of various Bitcoin strategies for individuals, corporations, institutions, and nation-states. Based on Michael Saylor's Bitcoin24 model."
}

export default function Bitcoin24Page() {
	return (
		<div className="space-y-8 py-6 px-4" data-testid="bitcoin24-dashboard">
			<div>
				<h1 className="text-3xl font-bold tracking-tight" data-testid="bitcoin24-title">
					Bitcoin24
				</h1>
				<p className="text-muted-foreground mt-1" data-testid="bitcoin24-description">
					21-year macro forecast with micro models for bitcoin strategies
				</p>
			</div>

			<Bitcoin24Client />

			{/* Credits */}
			<div className="pt-8 border-t">
				<div className="text-sm text-muted-foreground space-y-3">
					<div>
						<p className="font-semibold mb-2">Original Contributors:</p>
						<ul className="list-disc list-inside space-y-1">
							<li>Michael J. Saylor</li>
							<li>Shirish Jajodia</li>
							<li>Chaitanya Jain (CJ)</li>
						</ul>
						<p className="mt-3 text-sm">
							<strong>Source Model:</strong>{" "}
							<a 
								href="https://github.com/bitcoin-model/bitcoin_model" 
								target="_blank" 
								rel="noopener noreferrer"
								className="text-blue-600 hover:text-blue-800 underline"
							>
								github.com/bitcoin-model/bitcoin_model
							</a>
						</p>
					</div>

					<div className="pt-4">
						<p className="italic bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
							&ldquo;It might make sense just to get some in case it catches on. If enough people think the same way, that becomes a
							self-fulfilling prophecy.&rdquo; - Satoshi Nakamoto on 01/17/09 (BTC Price: $0)
						</p>
					</div>

					<div className="pt-4 text-xs bg-gray-50 p-4 rounded border">
						<p className="font-semibold mb-2">Disclaimer:</p>
						<p>
							The information provided here is for general informational purposes only and should not be considered financial advice. It contains
							forward-looking information that is inherently unknowable. You should seek advice from a professional financial advisor and other
							trusted sources before acting on any of this information. The authors and publishers of this information disclaim responsibility for
							any action taken by users of this information. This is but one view of potential outcomes. You should inform yourself of other
							views, including those that might disagree.
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
