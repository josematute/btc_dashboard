import { SpecialBlock } from "./types"

export const EMAIL = "jemg1210@gmail.com"

export const SPECIAL_BLOCKS: Record<number, SpecialBlock> = {
  0: {
    title: "Genesis Block",
    description: "The first block in the Bitcoin blockchain, mined by Satoshi Nakamoto on January 3, 2009.",
    icon: "Bitcoin",
    gradient: "from-blue-500/20 to-purple-500/20",
    textColor: "text-blue-500",
    hash: "000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f"
  },
  2016: {
    title: "First Difficulty Adjustment",
    description: "The first time Bitcoin's mining difficulty was automatically adjusted, ensuring consistent block times.",
    icon: "Settings",
    gradient: "from-violet-500/20 to-purple-500/20",
    textColor: "text-violet-500",
    hash: "00000000a141216a896c54f211301c436e557a8d55900637bbdce14c6c7bddef"
  },
  57043: {
    title: "Bitcoin Pizza Day",
    description: "The first real-world Bitcoin transaction where 10,000 BTC were used to buy two pizzas worth about $41 at the time.",
    icon: "Pizza",
    gradient: "from-orange-500/20 to-red-500/20",
    textColor: "text-orange-500",
    hash: "00000000152340ca42227603908689183edc47355204e7aca59383b0aaac1fd8"
  },
  210000: {
    title: "First Halving",
    description: "The first Bitcoin halving event, reducing the block reward from 50 BTC to 25 BTC.",
    icon: "Sparkles",
    gradient: "from-yellow-500/20 to-orange-500/20",
    textColor: "text-yellow-500",
    hash: "000000000000048b95347e83192f69cf0366076336c639f9b7228e9ba171342e"
  },
  420000: {
    title: "Second Halving",
    description: "The second Bitcoin halving event, reducing the block reward from 25 BTC to 12.5 BTC.",
    icon: "Sparkles",
    gradient: "from-green-500/20 to-yellow-500/20",
    textColor: "text-green-500",
    hash: "000000000000000002cce816c0ab2c5c269cb081896b7dcb34b8422d6b74ffa1"
  },
  481824: {
    title: "SegWit Activation",
    description: "Segregated Witness (SegWit) was activated, improving Bitcoin's scalability and enabling the Lightning Network.",
    icon: "Zap",
    gradient: "from-cyan-500/20 to-blue-500/20",
    textColor: "text-cyan-500",
    hash: "0000000000000000001c8018d9cb3b742ef25114f27563e3fc4a1902167f9893"
  },
  630000: {
    title: "Third Halving",
    description: "The third Bitcoin halving event, reducing the block reward from 12.5 BTC to 6.25 BTC.",
    icon: "Sparkles",
    gradient: "from-purple-500/20 to-pink-500/20",
    textColor: "text-purple-500",
    hash: "000000000000000000024bead8df69990852c202db0e0097c1a12ea637d7e96d"
  },
  709632: {
    title: "Taproot Activation",
    description: "Taproot was activated, improving privacy and enabling more complex smart contracts on Bitcoin.",
    icon: "Lock",
    gradient: "from-emerald-500/20 to-teal-500/20",
    textColor: "text-emerald-500",
    hash: "0000000000000000000687bca986194dc2c1f949318629b44bb54ec0a94d8244"
  },
  840000: {
    title: "Fourth Halving",
    description: "The fourth Bitcoin halving event, reducing the block reward from 6.25 BTC to 3.125 BTC.",
    icon: "Sparkles",
    gradient: "from-indigo-500/20 to-blue-500/20",
    textColor: "text-indigo-500",
    hash: "0000000000000000000320283a032748cef8227873ff4872689bf23f1cda83a5"
  }
}

export const SATS_PER_BTC = 100000000
export const BITCOIN_IMAGE_PATH = "/bitcoin-logo.png"
export const SATS_IMAGE_PATH = "/sats-icon.png"
export const USD_IMAGE_PATH = "/dollar-icon.png"
export const FCF_CALCULATOR_VIDEO_URL = "https://www.youtube.com/watch?v=0dbBQyIGT_4&t=1283s"
export const MARK_MOSS_YOUTUBE_URL = "https://www.youtube.com/@1MarkMoss"
