import React from 'react';
import styles from './TransactionHistory.module.css';

const TransactionHistory = ({ participant }) => {
  if (!participant) {
    return <p className={styles.noSelection}>Please select a student to view the transaction history.</p>;
  }

  return (
    <div className={styles.transactionHistory}>
      <h2 className={styles.header}>{participant.name}'s Transaction History</h2>
      <ul className={styles.transactionList}>
        {participant.rewards.map((reward, index) => (
          <li key={index} className={styles.transactionItem}>
            <div className={styles.transactionDetails}>
              <span className={styles.reason}>{reward.reason}</span>
              <span className={styles.date}>{reward.date}</span>
            </div>
            <div className={styles.tokenAmount}>
              +{reward.tokens} tokens
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionHistory;
