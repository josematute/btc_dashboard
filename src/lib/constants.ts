import { SpecialBlock } from "./types"

export const EMAIL = "jemg1210@gmail.com"

export const SPECIAL_BLOCKS: Record<number, SpecialBlock> = {
  0: {
    title: "Genesis Block",
    description: "The first block in the Bitcoin blockchain, mined by Satoshi Nakamoto on January 3, 2009.",
    icon: "Bitcoin",
    gradient: "from-blue-500/20 to-purple-500/20",
    textColor: "text-blue-500"
  },
  57043: {
    title: "Bitcoin Pizza Day",
    description: "The first real-world Bitcoin transaction where 10,000 BTC were used to buy two pizzas worth about $41 at the time.",
    icon: "Pizza",
    gradient: "from-orange-500/20 to-red-500/20",
    textColor: "text-orange-500"
  },
  210000: {
    title: "First Halving",
    description: "The first Bitcoin halving event, reducing the block reward from 50 BTC to 25 BTC.",
    icon: "Sparkles",
    gradient: "from-yellow-500/20 to-orange-500/20",
    textColor: "text-yellow-500"
  },
  420000: {
    title: "Second Halving",
    description: "The second Bitcoin halving event, reducing the block reward from 25 BTC to 12.5 BTC.",
    icon: "Sparkles",
    gradient: "from-green-500/20 to-yellow-500/20",
    textColor: "text-green-500"
  },
  481824: {
    title: "SegWit Activation",
    description: "Segregated Witness (SegWit) was activated, improving Bitcoin's scalability and enabling the Lightning Network.",
    icon: "Zap",
    gradient: "from-cyan-500/20 to-blue-500/20",
    textColor: "text-cyan-500"
  },
  630000: {
    title: "Third Halving",
    description: "The third Bitcoin halving event, reducing the block reward from 12.5 BTC to 6.25 BTC.",
    icon: "Sparkles",
    gradient: "from-purple-500/20 to-pink-500/20",
    textColor: "text-purple-500"
  },
  709632: {
    title: "Taproot Activation",
    description: "Taproot was activated, improving privacy and enabling more complex smart contracts on Bitcoin.",
    icon: "Lock",
    gradient: "from-emerald-500/20 to-teal-500/20",
    textColor: "text-emerald-500"
  },
  840000: {
    title: "Fourth Halving",
    description: "The fourth Bitcoin halving event, reducing the block reward from 6.25 BTC to 3.125 BTC.",
    icon: "Sparkles",
    gradient: "from-indigo-500/20 to-blue-500/20",
    textColor: "text-indigo-500"
  }
} 
