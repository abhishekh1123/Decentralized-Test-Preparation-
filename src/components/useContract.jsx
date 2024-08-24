// import { useWeb3ModalProvider } from "@web3modal/ethers/react";
// import { BrowserProvider, Contract } from "ethers";

// export const useContract = () => {
//     const {walletProvider} = useWeb3ModalProvider()
//     const contractAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8'
//     const contractABI = [
//         {
//           "inputs": [],
//           "stateMutability": "nonpayable",
//           "type": "constructor"
//         },
//         {
//           "anonymous": false,
//           "inputs": [
//             {
//               "indexed": false,
//               "internalType": "address",
//               "name": "participant",
//               "type": "address"
//             },
//             {
//               "indexed": false,
//               "internalType": "uint256",
//               "name": "tokens",
//               "type": "uint256"
//             }
//           ],
//           "name": "TokensRewarded",
//           "type": "event"
//         },
//         {
//           "inputs": [
//             {
//               "internalType": "address",
//               "name": "participant",
//               "type": "address"
//             }
//           ],
//           "name": "getTokenBalance",
//           "outputs": [
//             {
//               "internalType": "uint256",
//               "name": "",
//               "type": "uint256"
//             }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//         },
//         {
//           "inputs": [],
//           "name": "owner",
//           "outputs": [
//             {
//               "internalType": "address",
//               "name": "",
//               "type": "address"
//             }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//         },
//         {
//           "inputs": [
//             {
//               "internalType": "address",
//               "name": "participant",
//               "type": "address"
//             },
//             {
//               "internalType": "uint256",
//               "name": "tokens",
//               "type": "uint256"
//             }
//           ],
//           "name": "rewardTokens",
//           "outputs": [],
//           "stateMutability": "nonpayable",
//           "type": "function"
//         },
//         {
//           "inputs": [
//             {
//               "internalType": "address",
//               "name": "",
//               "type": "address"
//             }
//           ],
//           "name": "tokenBalance",
//           "outputs": [
//             {
//               "internalType": "uint256",
//               "name": "",
//               "type": "uint256"
//             }
//           ],
//           "stateMutability": "view",
//           "type": "function"
//         }
//       ];
//     const ethersProvider = new BrowserProvider(walletProvider)
//     const signer = ethersProvider.getSigner()
//     const contract = new Contract(contractAddress, contractABI, signer);
//     return contract;
// }


import { useEffect, useState } from 'react';
import { Contract, BrowserProvider } from 'ethers';

const contractAddress = '0xYourContractAddressHere'; // Replace with your actual contract address
const contractAbi = [
  {
    inputs: [
      { internalType: 'address', name: 'participant', type: 'address' },
      { internalType: 'uint256', name: 'tokens', type: 'uint256' },
    ],
    name: 'rewardTokens',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'participant', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'tokens', type: 'uint256' },
    ],
    name: 'TokensRewarded',
    type: 'event',
  },
  {
    inputs: [
      { internalType: 'address', name: 'participant', type: 'address' },
    ],
    name: 'getTokenBalance',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      { internalType: 'address', name: '', type: 'address' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
    ],
    name: 'tokenBalance',
    outputs: [
      { internalType: 'uint256', name: '', type: 'uint256' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export const useContract = () => {
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractInstance = new Contract(contractAddress, contractAbi, signer);
        setContract(contractInstance);
      } catch (error) {
        console.error("Failed to load contract:", error);
      }
    };

    initContract();
  }, []);

  return contract;
};
