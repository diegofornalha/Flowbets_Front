export const BETTING_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_matchesContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "apostador",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "teamAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "flowAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "betId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "betAddress",
        type: "address",
      },
    ],
    name: "BetPlaced",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "teamAddress",
        type: "address",
      },
    ],
    name: "placeBet",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "betAddressToId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "betCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "betIdToAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "matchesContract",
    outputs: [
      {
        internalType: "contract Matches",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getBettingHistory",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "apostador",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "flowAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "teamAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "betId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "betAddress",
            type: "address",
          },
          {
            internalType: "enum FlowBets.BetStatus",
            name: "status",
            type: "uint8",
          }
        ],
        internalType: "struct FlowBets.BetInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "n",
        type: "uint256",
      }
    ],
    name: "getLastBets",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "apostador",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "flowAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "timestamp",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "teamAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "betId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "betAddress",
            type: "address",
          },
          {
            internalType: "enum FlowBets.BetStatus",
            name: "status",
            type: "uint8",
          }
        ],
        internalType: "struct FlowBets.BetInfo[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getContractBalance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;

export const TEAMS_ABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "teamId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        indexed: false,
        internalType: "address",
        name: "teamAddress",
        type: "address",
      },
    ],
    name: "TeamCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
    ],
    name: "createTeam",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "teamAddress",
        type: "address",
      },
    ],
    name: "getTeamByAddress",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "teamId",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "teamAddress",
            type: "address",
          },
        ],
        internalType: "struct Teams.Team",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "teamCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

export const MATCHES_ABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_teamsContract",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "matchId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "teamA",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "teamB",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "matchAddress",
        type: "address",
      },
    ],
    name: "MatchCreated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_teamA",
        type: "address",
      },
      {
        internalType: "address",
        name: "_teamB",
        type: "address",
      },
    ],
    name: "createMatch",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "matchAddress",
        type: "address",
      },
    ],
    name: "getMatchByAddress",
    outputs: [
      {
        components: [
          {
            internalType: "address",
            name: "teamA",
            type: "address",
          },
          {
            internalType: "address",
            name: "teamB",
            type: "address",
          },
          {
            internalType: "address",
            name: "matchAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "matchId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "teamAVolume",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "teamBVolume",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isActive",
            type: "bool",
          },
        ],
        internalType: "struct Matches.Match",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const; 