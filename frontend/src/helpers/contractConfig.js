import IPFS from 'ipfs-api'

const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_title",
				"type": "string"
			},
			{
				"name": "_description",
				"type": "string"
			},
			{
				"name": "_genre",
				"type": "string"
			},
			{
				"name": "_price",
				"type": "uint256"
			},
			{
				"name": "_linkHash",
				"type": "string"
			},
			{
				"name": "_imageHash",
				"type": "string"
			}
		],
		"name": "addBook",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "genre",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "linkHash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "imageHash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "BookAdded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "title",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "description",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "author",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "genre",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "price",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "linkHash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "imageHash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "index",
				"type": "uint256"
			}
		],
		"name": "BookRemoved",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "buyBook",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "removeBook",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdrawBalance",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_index",
				"type": "uint256"
			}
		],
		"name": "getBookAt",
		"outputs": [
			{
				"name": "title",
				"type": "string"
			},
			{
				"name": "description",
				"type": "string"
			},
			{
				"name": "author",
				"type": "address"
			},
			{
				"name": "genre",
				"type": "string"
			},
			{
				"name": "price",
				"type": "uint256"
			},
			{
				"name": "linkHash",
				"type": "string"
			},
			{
				"name": "imageHash",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getBookCount",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getContractBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

const address = '0x62063dbfd684deb960276b7a7c07c8513705e087'

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

export { abi, address, ipfs }