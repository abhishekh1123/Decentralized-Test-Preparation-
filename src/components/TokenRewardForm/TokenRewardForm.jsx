import React, { useState } from 'react';
import styles from './TokenRewardForm.module.css';

const TokenRewardForm = ({ participants, onRewardTokens }) => {
  const [selectedStudent, setSelectedStudent] = useState('');
  const [tokenAmount, setTokenAmount] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedStudent && tokenAmount && reason) {
      onRewardTokens(selectedStudent, Number(tokenAmount), reason);
      setSelectedStudent('');
      setTokenAmount('');
      setReason('');
    }
  };

  return (
    <div className={styles.tokenRewardForm}>
      <h2 className={styles.header}>Reward Tokens</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="student" className={styles.label}>Select Student:</label>
          <select
            id="student"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className={styles.select}
            required
          >
            <option value="">-- Choose a Student --</option>
            {participants.map((student, index) => (
              <option key={index} value={student.name}>{student.name}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="tokens" className={styles.label}>Token Amount:</label>
          <input
            type="number"
            id="tokens"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            className={styles.input}
            min="1"
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="reason" className={styles.label}>Reason:</label>
          <input
            type="text"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className={styles.input}
            required
          />
        </div>

        <button type="submit" className={styles.submitButton}>Reward Tokens</button>
      </form>
    </div>
  );
};

export default TokenRewardForm;
