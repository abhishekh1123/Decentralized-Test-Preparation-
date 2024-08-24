
// import React from 'react';
// import styles from './AdminDashboard.module.css';
// import { useWeb3ModalProvider, useWeb3ModalAccount } from '@web3modal/ethers/react';
// import { BrowserProvider, Contract, formatUnits } from 'ethers';
// import { useContract } from '../useContract';

// const AdminDashboard = ({ participants, onAddParticipant, onRewardTokens }) => {
//   const useTest = async () => {
//     const contract = await useContract();
//     console.log(contract.owner)
//   }
  
  
//   const [newParticipant, setNewParticipant] = React.useState('');
//   const [rewardTokens, setRewardTokens] = React.useState('');
//   const [selectedParticipant, setSelectedParticipant] = React.useState('');

//   const handleAddParticipant = () => {
//     if (newParticipant) {
//       onAddParticipant(newParticipant);
//       setNewParticipant('');
//     }
//   };

//   const handleRewardParticipant = () => {
//     if (selectedParticipant && rewardTokens > 0) {
//       onRewardTokens(selectedParticipant, parseInt(rewardTokens), 'Admin Reward');
//       setRewardTokens('');
//       setSelectedParticipant('');
//     }
//   };

//   return (
//     <div className={styles.adminDashboard}>
//       <h2 className={styles.header}>Admin Dashboard</h2>
      
//       <div className={styles.dashboardSection}>
//         <h3 className={styles.sectionTitle} onClick={useTest}>Add Participant</h3>
//         <input
//           type="text"
//           value={newParticipant}
//           onChange={(e) => setNewParticipant(e.target.value)}
//           placeholder="Participant Name"
//           className={styles.inputField}
//         />
//         <button onClick={useTest} className={styles.addButton}>Add Participant</button>
//       </div>

//       <div className={styles.dashboardSection}>
//         <h3 className={styles.sectionTitle}>Reward Participant</h3>
//         <select
//           value={selectedParticipant}
//           onChange={(e) => setSelectedParticipant(e.target.value)}
//           className={styles.selectField}
//         >
//           <option value="">Select Participant</option>
//           {participants.map((participant, index) => (
//             <option key={index} value={participant.name}>
//               {participant.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="number"
//           value={rewardTokens}
//           onChange={(e) => setRewardTokens(e.target.value)}
//           placeholder="Tokens"
//           className={styles.inputField}
//         />
//         <button onClick={handleRewardParticipant} className={styles.addButton}>Reward Tokens</button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


// import React, { useState } from 'react';
// import styles from './AdminDashboard.module.css';
// import { useContract } from '../useContract';

// const AdminDashboard = ({ participants, onAddParticipant, onRewardTokens }) => {
//   const contract = useContract(); // Initialize the contract using your custom hook

//   const [newParticipant, setNewParticipant] = useState('');
//   const [rewardTokens, setRewardTokens] = useState('');
//   const [selectedParticipant, setSelectedParticipant] = useState('');

//   const handleAddParticipant = () => {
//     if (newParticipant) {
//       onAddParticipant(newParticipant);
//       setNewParticipant('');
//     }
//   };

//   const handleRewardParticipant = async () => {
//     if (selectedParticipant && rewardTokens > 0) {
//       // Reward tokens via the smart contract (add appropriate logic here)
//       await contract.rewardTokens(selectedParticipant, parseInt(rewardTokens)); 

//       // Optionally call onRewardTokens to update the UI state
//       onRewardTokens(selectedParticipant, parseInt(rewardTokens), 'Admin Reward');
      
//       setRewardTokens('');
//       setSelectedParticipant('');
//     }
//   };

//   return (
//     <div className={styles.adminDashboard}>
//       <h2 className={styles.header}>Admin Dashboard</h2>
      
//       <div className={styles.dashboardSection}>
//         <h3 className={styles.sectionTitle}>Add Participant</h3>
//         <input
//           type="text"
//           value={newParticipant}
//           onChange={(e) => setNewParticipant(e.target.value)}
//           placeholder="Participant Name"
//           className={styles.inputField}
//         />
//         <button onClick={handleAddParticipant} className={styles.addButton}>
//           Add Participant
//         </button>
//       </div>

//       <div className={styles.dashboardSection}>
//         <h3 className={styles.sectionTitle}>Reward Participant</h3>
//         <select
//           value={selectedParticipant}
//           onChange={(e) => setSelectedParticipant(e.target.value)}
//           className={styles.selectField}
//         >
//           <option value="">Select Participant</option>
//           {participants.map((participant, index) => (
//             <option key={index} value={participant.name}>
//               {participant.name}
//             </option>
//           ))}
//         </select>
//         <input
//           type="number"
//           value={rewardTokens}
//           onChange={(e) => setRewardTokens(e.target.value)}
//           placeholder="Tokens"
//           className={styles.inputField}
//         />
//         <button onClick={handleRewardParticipant} className={styles.addButton}>
//           Reward Tokens
//         </button>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState } from 'react';
import styles from './AdminDashboard.module.css';
import { useContract } from '../useContract';

const AdminDashboard = ({ participants, onAddParticipant, onRewardTokens }) => {
  const contract = useContract(); // Initialize the contract using your custom hook

  const [newParticipant, setNewParticipant] = useState('');
  const [rewardTokens, setRewardTokens] = useState('');
  const [selectedParticipant, setSelectedParticipant] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to indicate processing
  const [error, setError] = useState(''); // Error state to capture any errors

  const handleAddParticipant = () => {
    if (newParticipant) {
      onAddParticipant(newParticipant);
      setNewParticipant('');
    }
  };

  const handleRewardParticipant = async () => {
    if (!contract) {
      setError('Contract is not loaded yet. Please try again later.');
      return;
    }

    if (selectedParticipant && rewardTokens > 0) {
      setLoading(true);
      setError('');

      try {
        // Reward tokens via the smart contract
        const tx = await contract.rewardTokens(selectedParticipant, parseInt(rewardTokens));
        await tx.wait(); // Wait for the transaction to be confirmed

        // Optionally call onRewardTokens to update the UI state
        onRewardTokens(selectedParticipant, parseInt(rewardTokens), 'Admin Reward');
        
        // Clear input fields after successful transaction
        setRewardTokens('');
        setSelectedParticipant('');
      } catch (err) {
        setError(`Failed to reward tokens: ${err.message}`);
      } finally {
        setLoading(false);
      }
    } else {
      setError('Please select a participant and enter a valid token amount.');
    }
  };

  return (
    <div className={styles.adminDashboard}>
      <h2 className={styles.header}>Admin Dashboard</h2>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <div className={styles.dashboardSection}>
        <h3 className={styles.sectionTitle}>Add Participant</h3>
        <input
          type="text"
          value={newParticipant}
          onChange={(e) => setNewParticipant(e.target.value)}
          placeholder="Participant Name"
          className={styles.inputField}
        />
        <button onClick={handleAddParticipant} className={styles.addButton}>
          Add Participant
        </button>
      </div>

      <div className={styles.dashboardSection}>
        <h3 className={styles.sectionTitle}>Reward Participant</h3>
        <select
          value={selectedParticipant}
          onChange={(e) => setSelectedParticipant(e.target.value)}
          className={styles.selectField}
        >
          <option value="">Select Participant</option>
          {participants.map((participant, index) => (
            <option key={index} value={participant.name}>
              {participant.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          value={rewardTokens}
          onChange={(e) => setRewardTokens(e.target.value)}
          placeholder="Tokens"
          className={styles.inputField}
        />
        <button
          onClick={handleRewardParticipant}
          className={styles.addButton}
          disabled={loading} // Disable the button while loading
        >
          {loading ? 'Rewarding...' : 'Reward Tokens'}
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;

