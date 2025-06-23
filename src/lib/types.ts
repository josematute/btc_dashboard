export interface BlockchainInfo {
  chain: string
  blocks: number
  headers: number
  bestblockhash: string
  difficulty: number
  time: number
  mediantime: number
  verificationprogress: number
  initialblockdownload: boolean
  chainwork: string
  size_on_disk: number
  pruned: boolean
  warnings: string
}

export interface NetworkInfo {
  version: number
  subversion: string
  protocolversion: number
  localservices: string
  localservicesnames: string[]
  localrelay: boolean
  timeoffset: number
  networkactive: boolean
  connections: number
  connections_in: number
  connections_out: number
  networks: Network[]
  relayfee: number
  incrementalfee: number
  localaddresses: LocalAddress[]
  warnings: string
}

export interface Network {
  name: string
  limited: boolean
  reachable: boolean
  proxy: string
  proxy_randomize_credentials: boolean
}

export interface LocalAddress {
  address: string
  port: number
  score: number
}

export interface MempoolInfo {
  loaded: boolean
  size: number
  bytes: number
  usage: number
  total_fee: number
  maxmempool: number
  mempoolminfee: number
  minrelaytxfee: number
  incrementalrelayfee: number
  unbroadcastcount: number
  fullrbf: boolean
}

export interface Block {
  hash: string
  confirmations: number
  height: number
  version: number
  versionHex: string
  merkleroot: string
  time: number
  mediantime: number
  nonce: number
  bits: string
  difficulty: number
  chainwork: string
  nTx: number
  previousblockhash: string
  strippedsize: number
  size: number
  weight: number
  tx: string[]
  nextblockhash?: string
}

export interface BlockStats {
  avgfee: number
  avgfeerate: number
  avgtxsize: number
  blockhash: string
  feerate_percentiles: number[]
  height: number
  ins: number
  maxfee: number
  maxfeerate: number
  maxtxsize: number
  medianfee: number
  mediantime: number
  mediantxsize: number
  minfee: number
  minfeerate: number
  mintxsize: number
  outs: number
  subsidy: number
  swtotal_size: number
  swtotal_weight: number
  swtxs: number
  time: number
  total_out: number
  total_size: number
  total_weight: number
  totalfee: number
  txs: number
  utxo_increase: number
  utxo_size_inc: number
  utxo_increase_actual: number
  utxo_size_inc_actual: number
}

export interface Tx {
  txid: string
  hash: string
  version: number
  size: number
  vsize: number
  weight: number
  locktime: number
  vin: TxInput[]
  vout: TxOutput[]
  hex?: string
  blockhash?: string
  confirmations?: number
  time?: number
  blocktime?: number
  fee?: number
}

export interface TxInput {
  txid?: string
  vout: number
  scriptSig?: {
    asm: string
    hex: string
  }
  sequence: number
  witness?: string[]
  prevout?: TxOutput
  coinbase?: string
  txinwitness?: string[]
}

export interface TxOutput {
  value: number
  n: number
  scriptPubKey: {
    asm: string
    hex: string
    type: string
    address?: string
    addresses?: string[]
  }
}

export interface SpecialBlock {
  title: string
  description: string
  icon: string
  gradient: string
  textColor: string
  hash: string
}

// Types for FCF Calculator, each year of the loan
export interface YearData {
  year: number
  age: number
  value: number
  agr: number
  gain: number
  ltv: number
  debt: number
  interest: number
  fcf: number
  ppBtc: number
}
