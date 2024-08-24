import React from 'react';
import styles from './StudentDashboard.module.css';

const StudentDashboard = ({ students, onSelectStudent }) => {
  return (
    <div className={styles.studentDashboard}>
      <h2 className={styles.header}>Student Dashboard</h2>

      <div className={styles.dashboardSection}>
        <h3 className={styles.sectionTitle}>Students</h3>
        <ul className={styles.studentsList}>
          {students.map((student, index) => (
            <li key={index} className={styles.studentItem} onClick={() => onSelectStudent(student.name)}>
              <div className={styles.studentInfo}>
                <span className={styles.studentName}>{student.name}</span>
                <span className={styles.studentTokens}>{student.tokens} tokens</span>
              </div>
              <div className={styles.studentProgress}>
                <progress value={student.tokens} max="100" className={styles.progressBar}></progress>
              </div>
              <div className={styles.studentDetails}>
                <button className={styles.detailsButton}>View Details</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
