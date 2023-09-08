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
        "name": "Charged",
        "inputs": [
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
            },
            {
                "type": "address[]",
                "name": "rewards"
            },
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Claim",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
            },
            {
                "type": "address[]",
                "name": "rewards"
            },
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "ClaimableBlockUpdated",
        "inputs": [
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "interval",
                "indexed": false
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "EmergencyWithdraw",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
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
        "name": "PoolAdded",
        "inputs": [
            {
                "type": "address",
                "name": "farmingToken",
                "indexed": true
            }
        ]
    },
    {
        "type": "event",
        "anonymous": false,
        "name": "Redeem",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
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
        "name": "Stake",
        "inputs": [
            {
                "type": "address",
                "name": "user",
                "indexed": true
            },
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
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
        "name": "WithdrawRewards",
        "inputs": [
            {
                "type": "uint256",
                "name": "pid",
                "indexed": true
            },
            {
                "type": "address[]",
                "name": "rewards"
            },
            {
                "type": "uint256[]",
                "name": "amounts"
            }
        ]
    },
    {
        "type": "function",
        "name": "add",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "address",
                "name": "_farmingToken"
            },
            {
                "type": "address[]",
                "name": "_rewardTokens"
            },
            {
                "type": "uint256[]",
                "name": "_rewardPerBlock"
            },
            {
                "type": "uint256",
                "name": "_startBlock"
            },
            {
                "type": "uint256",
                "name": "_claimableInterval"
            }
        ],
        "outputs": []
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
        "name": "candidateConfirm",
        "constant": false,
        "payable": false,
        "inputs": [],
        "outputs": []
    },
    {
        "type": "function",
        "name": "charge",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "uint256[]",
                "name": "_amounts"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "claim",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "emergencyWithdraw",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "getPeriodsSinceStart",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "periods"
            }
        ]
    },
    {
        "type": "function",
        "name": "getPoolInfo",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            }
        ],
        "outputs": [
            {
                "type": "address",
                "name": "farmingToken"
            },
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "address[]",
                "name": "rewardTokens"
            },
            {
                "type": "uint256[]",
                "name": "rewardPerBlock"
            },
            {
                "type": "uint256[]",
                "name": "accRewardPerShare"
            },
            {
                "type": "uint256",
                "name": "lastRewardBlock"
            },
            {
                "type": "uint256",
                "name": "startBlock"
            },
            {
                "type": "uint256",
                "name": "claimableInterval"
            }
        ]
    },
    {
        "type": "function",
        "name": "getRemaingRewards",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "remainingRewards"
            }
        ]
    },
    {
        "type": "function",
        "name": "getUserInfo",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "address",
                "name": "_user"
            }
        ],
        "outputs": [
            {
                "type": "uint256",
                "name": "amount"
            },
            {
                "type": "uint256[]",
                "name": "pending"
            },
            {
                "type": "uint256[]",
                "name": "rewardDebt"
            },
            {
                "type": "uint256",
                "name": "nextClaimableBlock"
            }
        ]
    },
    {
        "type": "function",
        "name": "pendingRewards",
        "constant": true,
        "stateMutability": "view",
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "address",
                "name": "_user"
            }
        ],
        "outputs": [
            {
                "type": "uint256[]",
                "name": "rewards"
            },
            {
                "type": "uint256",
                "name": "nextClaimableBlock"
            }
        ]
    },
    {
        "type": "function",
        "name": "poolLength",
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
        "name": "redeem",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "address",
                "name": "_farmingToken"
            },
            {
                "type": "uint256",
                "name": "_amount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "set",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "uint256[]",
                "name": "_rewardPerBlock"
            },
            {
                "type": "bool",
                "name": "_withUpdate"
            }
        ],
        "outputs": []
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
        "name": "setClaimableBlock",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "uint256",
                "name": "_interval"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "stake",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "address",
                "name": "_farmingToken"
            },
            {
                "type": "uint256",
                "name": "_amount"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "updatePool",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            }
        ],
        "outputs": []
    },
    {
        "type": "function",
        "name": "withdrawRewards",
        "constant": false,
        "payable": false,
        "inputs": [
            {
                "type": "uint256",
                "name": "_pid"
            },
            {
                "type": "uint256[]",
                "name": "_amounts"
            }
        ],
        "outputs": []
    }
]
