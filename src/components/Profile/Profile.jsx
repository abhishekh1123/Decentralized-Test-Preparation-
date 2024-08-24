import React from 'react';
import styles from './Profile.module.css';

const Profile = ({ participant }) => {
  if (!participant) {
    return <div className={styles.profile}>No participant selected</div>;
  }

  const totalTokens = participant.tokens;
  const rewardCount = participant.rewards.length;

  return (
    <div className={styles.profile}>
      <h2 className={styles.profileHeader}>Participant Profile</h2>

      <div className={styles.profileDetails}>
        <h3 className={styles.profileName}>{participant.name}</h3>
        <p className={styles.profileTokens}>Token Balance: {totalTokens}</p>
      </div>

      <div className={styles.summary}>
        <h4 className={styles.summaryTitle}>Summary</h4>
        <p className={styles.summaryText}>
          {participant.name} has earned a total of {totalTokens} tokens through {rewardCount} rewards. 
          Keep up the great work!
        </p>
      </div>

      <div className={styles.rewardsSection}>
        <h3 className={styles.sectionTitle}>Recent Rewards</h3>
        <ul className={styles.rewardsList}>
          {rewardCount > 0 ? (
            participant.rewards.map((reward, index) => (
              <li key={index} className={styles.rewardItem}>
                <span className={styles.rewardTokens}>{reward.tokens} tokens</span>
                <span className={styles.rewardReason}>{reward.reason}</span>
                <span className={styles.rewardDate}>{reward.date}</span>
              </li>
            ))
          ) : (
            <li className={styles.noRewards}>No rewards yet</li>
          )}
        </ul>
      </div>

      <div className={styles.footer}>
        <p className={styles.footerText}>Encourage {participant.name} to continue their progress!</p>
      </div>
    </div>
  );
};

export default Profile;
