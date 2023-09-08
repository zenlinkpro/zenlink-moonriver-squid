export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": []
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "AddLiquidity",
        "inputs": [
            {
                "type": "address",
                "name": "provider",
                "indexed": true
            },
            {
                "type": "uint256[]",
                "name": "tokenAmounts"
            },
            {
                "type": "uint256[]",
                "name": "fees"
            },
            {
                "type": "uint256",
                "name": "invariant",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "tokenSupply",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "AdminChanged",
        "inputs": [
            {
                "type": "address",
                "name": "oldAdmin",
                "indexed": true
            },
            {
                "type": "address",
                "name": "newAdmin",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Candidate",
        "inputs": [
            {
                "type": "address",
                "name": "newAdmin",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "CollectProtocolFee",
        "inputs": [
            {
                "type": "address",
                "name": "token",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "amount",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "FeeControllerChanged",
        "inputs": [
            {
                "type": "address",
                "name": "newController",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "FeeDistributorChanged",
        "inputs": [
            {
                "type": "address",
                "name": "newController",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "FlashLoan",
        "inputs": [
            {
                "type": "address",
                "name": "caller",
                "indexed": true
            },
            {
                "type": "address",
                "name": "receiver",
                "indexed": true
            },
            {
                "type": "uint256[]",
                "name": "amounts_out"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Initialized",
        "inputs": [
            {
                "type": "uint8",
                "name": "version",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "NewFee",
        "inputs": [
            {
                "type": "uint256",
                "name": "fee",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "adminFee",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Paused",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RampA",
        "inputs": [
            {
                "type": "uint256",
                "name": "oldA",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "newA",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "initialTime",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "futureTime",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RemoveLiquidity",
        "inputs": [
            {
                "type": "address",
                "name": "provider",
                "indexed": true
            },
            {
                "type": "uint256[]",
                "name": "tokenAmounts"
            },
            {
                "type": "uint256[]",
                "name": "fees"
            },
            {
                "type": "uint256",
                "name": "tokenSupply",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RemoveLiquidityImbalance",
        "inputs": [
            {
                "type": "address",
                "name": "provider",
                "indexed": true
            },
            {
                "type": "uint256[]",
                "name": "tokenAmounts"
            },
            {
                "type": "uint256[]",
                "name": "fees"
            },
            {
                "type": "uint256",
                "name": "invariant",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "tokenSupply",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "RemoveLiquidityOne",
        "inputs": [
            {
                "type": "address",
                "name": "provider",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "tokenIndex",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "tokenAmount",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "coinAmount",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "StopRampA",
        "inputs": [
            {
                "type": "uint256",
                "name": "A",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "timestamp",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "TokenExchange",
        "inputs": [
            {
                "type": "address",
                "name": "buyer",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "soldId",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "tokensSold",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "boughtId",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "tokensBought",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Unpaused",
        "inputs": [
            {
                "type": "address",
                "name": "account",
                "indexed": false
            }
        ]
    },
    {
        "type": "function",
        "name": "MAX_A",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "MAX_ADMIN_FEE",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "MAX_A_CHANGE",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "MAX_SWAP_FEE",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "MIN_RAMP_TIME",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "addLiquidity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            },
            {
                "type": "uint256",
                "name": "minMintAmount"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "admin",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "adminCandidate",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "calculateRemoveLiquidity",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amount"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "calculateRemoveLiquidityOneToken",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "uint8",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "calculateSwap",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "inIndex"
            },
            {
                "type": "uint8",
                "name": "outIndex"
            },
            {
                "type": "uint256",
                "name": "inAmount"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "calculateTokenAmount",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            },
            {
                "type": "bool",
                "name": "deposit"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "candidateConfirm",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "feeController",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "feeDistributor",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "flashLoan",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256[]",
                "name": "amountsOut"
            },
            {
                "type": "address",
                "name": "to"
            },
            {
                "type": "bytes",
                "name": "data"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getA",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getAPrecise",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getAdminBalance",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getAdminBalances",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "adminBalances"
            }
        ]
    },
    {
        "type": "function",
        "name": "getLpToken",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getNumberOfTokens",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getToken",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getTokenBalance",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "index"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getTokenBalances",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getTokenIndex",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "token"
            }
        ],
        "outputs": [
            {
                "type": "uint8",
                "name": "index"
            }
        ]
    },
    {
        "type": "function",
        "name": "getTokenPrecisionMultipliers",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getTokens",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "getVirtualPrice",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "initialize",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address[]",
                "name": "_coins"
            },
            {
                "type": "uint8[]",
                "name": "_decimals"
            },
            {
                "type": "string",
                "name": "lpTokenName"
            },
            {
                "type": "string",
                "name": "lpTokenSymbol"
            },
            {
                "type": "uint256",
                "name": "_A"
            },
            {
                "type": "uint256",
                "name": "_fee"
            },
            {
                "type": "uint256",
                "name": "_adminFee"
            },
            {
                "type": "address",
                "name": "_feeDistributor"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "pause",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "paused",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bool",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "rampA",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "futureA"
            },
            {
                "type": "uint256",
                "name": "futureATime"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "removeLiquidity",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "lpAmount"
            },
            {
                "type": "uint256[]",
                "name": "minAmounts"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityImbalance",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256[]",
                "name": "amounts"
            },
            {
                "type": "uint256",
                "name": "maxBurnAmount"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "removeLiquidityOneToken",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "lpAmount"
            },
            {
                "type": "uint8",
                "name": "index"
            },
            {
                "type": "uint256",
                "name": "minAmount"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "setAdminCandidate",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_candidate"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFee",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "newSwapFee"
            },
            {
                "type": "uint256",
                "name": "newAdminFee"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFeeController",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_feeController"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFeeDistributor",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_feeDistributor"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "stopRampA",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "swap",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "fromIndex"
            },
            {
                "type": "uint8",
                "name": "toIndex"
            },
            {
                "type": "uint256",
                "name": "inAmount"
            },
            {
                "type": "uint256",
                "name": "minOutAmount"
            },
            {
                "type": "uint256",
                "name": "deadline"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "swapStorage",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "address",
                "name": "lpToken"
            },
            {
                "type": "uint256",
                "name": "fee"
            },
            {
                "type": "uint256",
                "name": "adminFee"
            },
            {
                "type": "uint256",
                "name": "initialA"
            },
            {
                "type": "uint256",
                "name": "futureA"
            },
            {
                "type": "uint256",
                "name": "initialATime"
            },
            {
                "type": "uint256",
                "name": "futureATime"
            }
        ]
    },
    {
        "type": "function",
        "name": "tokenIndexes",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            }
        ],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "unpause",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "withdrawAdminFee",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    }
]
