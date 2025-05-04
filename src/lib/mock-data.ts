import type { BlockchainInfo, NetworkInfo, MempoolInfo, Block, BlockStats, Transaction } from "./types"

export const mockBlockchainInfo: BlockchainInfo = {
  chain: "main",
  blocks: 890188,
  headers: 890188,
  bestblockhash: "0000000000000000000104559f54ebe87b2b05e790e4e0a2d48fa3b3f7bf7a33",
  difficulty: 113757508810854,
  time: 1743387761,
  mediantime: 1743384849,
  verificationprogress: 0.9999992438279525,
  initialblockdownload: false,
  chainwork: "0000000000000000000000000000000000000000b83b5bb1ab3308a7434311e0",
  size_on_disk: 738044033950,
  pruned: false,
  warnings: "",
}

export const mockNetworkInfo: NetworkInfo = {
  version: 270000,
  subversion: "/Satoshi:27.0.0/",
  protocolversion: 70016,
  localservices: "0000000000000c09",
  localservicesnames: ["NETWORK", "WITNESS", "NETWORK_LIMITED", "P2P_V2"],
  localrelay: true,
  timeoffset: -7,
  networkactive: true,
  connections: 10,
  connections_in: 0,
  connections_out: 10,
  networks: [
    {
      name: "ipv4",
      limited: false,
      reachable: true,
      proxy: "",
      proxy_randomize_credentials: false,
    },
    {
      name: "ipv6",
      limited: false,
      reachable: true,
      proxy: "",
      proxy_randomize_credentials: false,
    },
    {
      name: "onion",
      limited: true,
      reachable: false,
      proxy: "",
      proxy_randomize_credentials: false,
    },
    {
      name: "i2p",
      limited: true,
      reachable: false,
      proxy: "",
      proxy_randomize_credentials: false,
    },
    {
      name: "cjdns",
      limited: true,
      reachable: false,
      proxy: "",
      proxy_randomize_credentials: false,
    },
  ],
  relayfee: 0.00001,
  incrementalfee: 0.00001,
  localaddresses: [
    {
      address: "::223:24ff:fecc:99bf",
      port: 8333,
      score: 1,
    },
    {
      address: "::b0a2:3c41:43fa:b96c",
      port: 8333,
      score: 1,
    },
  ],
  warnings: "",
}

export const mockMempoolInfo: MempoolInfo = {
  loaded: true,
  size: 817,
  bytes: 286426,
  usage: 1643936,
  total_fee: 0.00744478,
  maxmempool: 300000000,
  mempoolminfee: 0.00001,
  minrelaytxfee: 0.00001,
  incrementalrelayfee: 0.00001,
  unbroadcastcount: 0,
  fullrbf: false,
}

export const mockBlock: Block = {
  hash: "0000000000000000000104559f54ebe87b2b05e790e4e0a2d48fa3b3f7bf7a33",
  confirmations: 1,
  height: 890188,
  version: 850984960,
  versionHex: "32b90000",
  merkleroot: "31db7ef93b1757b61a1a5d4d702acb4a0db15e897a970fd4644f909921218d95",
  time: 1743387761,
  mediantime: 1743384849,
  nonce: 1483923662,
  bits: "1702796c",
  difficulty: 113757508810854,
  chainwork: "0000000000000000000000000000000000000000b83b5bb1ab3308a7434311e0",
  nTx: 2106,
  previousblockhash: "0000000000000000000125ce419a3417d4e5f3fac319c562d5cf93757b8fa6e2",
  strippedsize: 568018,
  size: 1562561,
  weight: 3266615,
  tx: [
    "5de83b2855c285eb58486dca87fd57306726048ca44f8b2e65cde8e02e943066",
    "3cdb8e6c9dcc9aa354661e84fe4310f9e5a81c7ccbd1de2822cf27962548a415",
    "c57b1e17becd20505ccfaf982085efe21344ad5406c4bfbdaa3cad56a26d1773",
    "91e5e6228cb88456adedcd69ace0668339be8901a1a223f4f34dd894ee6743f0",
    "257bf6b634b2198e9ad81fe9a241f135faeb8aa0abbd5f91329ac3cba2c48e79",
    "cc4ccb8b3d9c99f7733f6cb297e9bdbf8f76545b5ddef6afc114ff2312e0a1f7",
    "6fe681ac6c1a0b952e5a488fb44239bb1f9387806945e8355bffe431759cb468",
    "5179693f085648f6160860d0fd15a329873c021ce6096d9e6f15b39944314921",
    "4dadc73b52864d6e35c33b3ab40e049d48d7583cbc69a4fb53b2de14141fe509",
    "0ab54e88835cefe056e297dc0d40ddab24cdb5d2d43218e579b922d4c34ac306",
    "3321fc9ddafc0d0f0381ef269782e9a8f4140bc608975adb39907c8b82795482",
  ],
}

export const mockBlockStats: BlockStats = {
  avgfee: 1101,
  avgfeerate: 2,
  avgtxsize: 742,
  blockhash: "0000000000000000000104559f54ebe87b2b05e790e4e0a2d48fa3b3f7bf7a33",
  feerate_percentiles: [1, 1, 1, 3, 3],
  height: 890188,
  ins: 6414,
  maxfee: 83779,
  maxfeerate: 302,
  maxtxsize: 327752,
  medianfee: 288,
  mediantime: 1743384849,
  mediantxsize: 284,
  minfee: 0,
  minfeerate: 0,
  mintxsize: 150,
  outs: 5766,
  subsidy: 312500000,
  swtotal_size: 1489306,
  swtotal_weight: 2973703,
  swtxs: 1928,
  time: 1743387761,
  total_out: 250489576007,
  total_size: 1562057,
  total_weight: 3264707,
  totalfee: 2319517,
  txs: 2106,
  utxo_increase: -648,
  utxo_size_inc: -42595,
  utxo_increase_actual: -754,
  utxo_size_inc_actual: -54323,
}

// Generate some mock transactions for the dashboard
export const mockTransactions = Array.from({ length: 20 }, (_, i) => ({
  txid: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
  time: Date.now() - i * 60000,
  size: Math.floor(Math.random() * 1000) + 200,
  fee: Math.random() * 0.001,
}))

// Generate some mock blocks for the dashboard
export const mockBlocks = Array.from({ length: 10 }, (_, i) => ({
  height: mockBlockchainInfo.blocks - i,
  hash: `${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
  time: Date.now() - i * 600000,
  txCount: Math.floor(Math.random() * 3000) + 500,
  size: Math.floor(Math.random() * 1000000) + 500000,
}))

// Mock transaction detail
export const mockTransactionDetail: Transaction = {
  txid: "5de83b2855c285eb58486dca87fd57306726048ca44f8b2e65cde8e02e943066",
  hash: "5de83b2855c285eb58486dca87fd57306726048ca44f8b2e65cde8e02e943066",
  version: 2,
  size: 247,
  vsize: 166,
  weight: 661,
  locktime: 890187,
  vin: [
    {
      txid: "7b5685fba27352f64acc95c35a3e0f0aac5e0f9a8c8dcc8987ae86a2788fe537",
      vout: 0,
      scriptSig: {
        asm: "0014a8f96c6a7e558a5b230a24afca3b4c90db5f9b8a",
        hex: "160014a8f96c6a7e558a5b230a24afca3b4c90db5f9b8a",
      },
      txinwitness: [
        "304402207d0a47e1fa24c23a4ad0be4c5f508e8e319a1c7e8e57a6e3c5e79c0af3bcc9c502203c8b6f5a3f2e7c9a6a66a64e35a5e2a3d1f60f9f6a07c1c07ce4cd2fba5e352901",
        "02c7d9964b54cb0526e6c6b24ebf2ecc27fb0299b7ee0efca5a1c14dac8100ad69",
      ],
      sequence: 4294967294,
    },
  ],
  vout: [
    {
      value: 12.5,
      n: 0,
      scriptPubKey: {
        asm: "OP_DUP OP_HASH160 a8f96c6a7e558a5b230a24afca3b4c90db5f9b8a OP_EQUALVERIFY OP_CHECKSIG",
        hex: "76a914a8f96c6a7e558a5b230a24afca3b4c90db5f9b8a88ac",
        address: "1GnLSjS85P5hRPgwFNXdAjEMQUQB4FsUi7",
        type: "pubkeyhash",
      },
    },
    {
      value: 0.00012345,
      n: 1,
      scriptPubKey: {
        asm: "OP_HASH160 a8f96c6a7e558a5b230a24afca3b4c90db5f9b8a OP_EQUAL",
        hex: "a914a8f96c6a7e558a5b230a24afca3b4c90db5f9b8a87",
        address: "3GnLSjS85P5hRPgwFNXdAjEMQUQB4FsUi7",
        type: "scripthash",
      },
    },
  ],
  hex: "0200000000010137e58f78a286ae8789cc8d8c9a0f5eac0a0f3e5ac395cc4af65273a2fb85567b0000000017160014a8f96c6a7e558a5b230a24afca3b4c90db5f9b8afeffffff0200f2052a01000000001976a914a8f96c6a7e558a5b230a24afca3b4c90db5f9b8a88ac39300000000000001976a914a8f96c6a7e558a5b230a24afca3b4c90db5f9b8a88ac0247304402207d0a47e1fa24c23a4ad0be4c5f508e8e319a1c7e8e57a6e3c5e79c0af3bcc9c502203c8b6f5a3f2e7c9a6a66a64e35a5e2a3d1f60f9f6a07c1c07ce4cd2fba5e3529012102c7d9964b54cb0526e6c6b24ebf2ecc27fb0299b7ee0efca5a1c14dac8100ad69fbd90d00",
  blockhash: "0000000000000000000104559f54ebe87b2b05e790e4e0a2d48fa3b3f7bf7a33",
  confirmations: 1,
  time: 1743387761,
  blocktime: 1743387761,
  fee: 0.00001234,
  status: {
    confirmed: true,
    block_height: 890188,
    block_hash: "0000000000000000000104559f54ebe87b2b05e790e4e0a2d48fa3b3f7bf7a33",
    block_time: 1743387761,
  },
}

