export const ABI_JSON = [
    {
        "type": "constructor",
        "stateMutability": "undefined",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_admin"
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
        "name": "BootstrapSetted",
        "inputs": [
            {
                "type": "address",
                "name": "tokenA",
                "indexed": true
            },
            {
                "type": "address",
                "name": "tokenB",
                "indexed": true
            },
            {
                "type": "address",
                "name": "bootstrap",
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
        "name": "FeeBasePointUpdated",
        "inputs": [
            {
                "type": "uint8",
                "name": "basePoint",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "FeetoUpdated",
        "inputs": [
            {
                "type": "address",
                "name": "feeto",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "PairCreateLocked",
        "inputs": [
            {
                "type": "address",
                "name": "caller",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "PairCreateUnlocked",
        "inputs": [
            {
                "type": "address",
                "name": "caller",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "PairCreated",
        "inputs": [
            {
                "type": "address",
                "name": "token0",
                "indexed": true
            },
            {
                "type": "address",
                "name": "token1",
                "indexed": true
            },
            {
                "type": "address",
                "name": "pair",
                "indexed": false
            },
            {
                "type": "uint256",
                "name": "param",
                "indexed": false
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
        "name": "allPairs",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": ""
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
        "name": "allPairsLength",
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
        "name": "candidateConfirm",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "createPair",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "pair"
            }
        ]
    },
    {
        "type": "function",
        "name": "feeBasePoint",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "uint8",
                "name": ""
            }
        ]
    },
    {
        "type": "function",
        "name": "feeto",
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
        "name": "getBootstrap",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "address",
                "name": ""
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
        "name": "getPair",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": ""
            },
            {
                "type": "address",
                "name": ""
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
        "name": "lockForPairCreate",
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
        "name": "lockPairCreate",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "pairCodeHash",
        "constant": true,
        "stateMutability": "pure",
        "payable": false,
        "inputs": [],
        "outputs": [
            {
                "type": "bytes32",
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
        "name": "setBootstrap",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "tokenA"
            },
            {
                "type": "address",
                "name": "tokenB"
            },
            {
                "type": "address",
                "name": "bootstrap"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFeeBasePoint",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint8",
                "name": "_basePoint"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "setFeeto",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_feeto"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "unlockPairCreate",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    }
]
