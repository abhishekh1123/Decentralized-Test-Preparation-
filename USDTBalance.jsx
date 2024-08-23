import React from 'react';
  import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
  import { BrowserProvider, Contract, formatUnits } from 'ethers';

const contractAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8'; // Replace with your contract address

// Contract ABI
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

function USDTBalance({ selectedParticipant }) {
  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { walletProvider } = useWeb3ModalProvider();

  async function getBalance() {
    try {
      if (!isConnected) throw new Error('User disconnected');

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      // The Contract object
      const contract = new Contract(contractAddress, contractAbi, signer);
      const balance = await contract.getTokenBalance(address);

      console.log(`Token Balance of ${address}: ${formatUnits(balance, 18)}`);
    } catch (error) {
      console.error('Error fetching balance:', error.message);
    }
  }

  async function rewardUser(participantAddress, tokens) {
    try {
      if (!isConnected) throw new Error('User disconnected');

      const ethersProvider = new BrowserProvider(walletProvider);
      const signer = await ethersProvider.getSigner();
      // The Contract object
      const contract = new Contract(contractAddress, contractAbi, signer);
      // Call rewardTokens function
      const tx = await contract.rewardTokens(participantAddress, tokens);
      await tx.wait(); // Wait for the transaction to be mined

      console.log(`Rewarded ${tokens} tokens to ${participantAddress}`);
    } catch (error) {
      console.error('Error rewarding tokens:', error.message);
    }
  }

  return (
    <div>
      <button onClick={getBalance}>Get User Balance</button>
      <button onClick={() => rewardUser(address, 100)}>Reward User with 100 Tokens</button>
    </div>
  );
}

export default USDTBalance;
