import React, { useState } from 'react';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import Profile from './components/Profile/Profile';
import StudentDashboard from './components/StudentDashboard/StudentDashboard';
import TokenRewardForm from './components/TokenRewardForm/TokenRewardForm';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';
import './App.css';
import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import ConnectButton from './components/ConnectWallat/ConnectWallat';
import USDTBalance from './USDTBalance'; // Import the USDTBalance component

// 1. Get projectId
const projectId = 'YOUR_PROJECT_ID';

// 2. Set chains
const mainnet = {
  chainId: 1,
  name: 'Ethereum',
  currency: 'ETH',
  explorerUrl: 'https://etherscan.io',
  rpcUrl: 'https://cloudflare-eth.com',
};
const eduChain = {
  chainId: 656476,
  name: 'Arbitrum Sepolia 421614',
  currency: 'EDU',
  explorerUrl: 'https://opencampus-codex.blockscout.com',
  rpcUrl: 'https://rpc.open-campus-codex.gelato.digital',
};

// 3. Create a metadata object
const metadata = {
  name: 'My Website',
  description: 'My Website description',
  url: 'https://mywebsite.com', // origin must match your domain & subdomain
  icons: ['https://avatars.mywebsite.com/'],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  metadata, // Required

  // Optional
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  rpcUrl: '...', // used for the Coinbase SDK
  defaultChainId: 1, // used for the Coinbase SDK
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet, eduChain],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
});

const App = () => {
  const [participants, setParticipants] = useState([
    { name: 'Alice', tokens: 50, rewards: [{ tokens: 20, reason: 'Quiz 1', date: '2024-08-01' }, { tokens: 30, reason: 'Quiz 2', date: '2024-08-15' }] },
    { name: 'Bob', tokens: 70, rewards: [{ tokens: 70, reason: 'Quiz 1', date: '2024-08-01' }] },
  ]);

  const [selectedParticipant, setSelectedParticipant] = useState(null);

  const handleSelectParticipant = (participantName) => {
    const participant = participants.find((p) => p.name === participantName);
    setSelectedParticipant(participant);
  };

  const handleRewardTokens = (studentName, tokens, reason) => {
    const updatedParticipants = participants.map((participant) => {
      if (participant.name === studentName) {
        return {
          ...participant,
          tokens: participant.tokens + tokens,
          rewards: [
            ...participant.rewards,
            { tokens, reason, date: new Date().toISOString().split('T')[0] },
          ],
        };
      }
      return participant;
    });

    setParticipants(updatedParticipants);
  };

  return (
    <div className="App">
      <AdminDashboard
        participants={participants}
        onSelectParticipant={handleSelectParticipant}
      />
      <StudentDashboard
        students={participants}
        onSelectStudent={handleSelectParticipant}
      />
      <TokenRewardForm
        participants={participants}
        onRewardTokens={handleRewardTokens}
      />
      <TransactionHistory participant={selectedParticipant} />
      <Profile participant={selectedParticipant} />
      
      {/* Integrate USDTBalance component */}
      <USDTBalance selectedParticipant={selectedParticipant} />

      <ConnectButton />
    </div>
  );
};

export default App;
