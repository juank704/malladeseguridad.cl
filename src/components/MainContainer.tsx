import React from 'react';
import Calculator from '@/components/Calculator';
import Hero from '@/components/Hero';
import styles from '@styles/MainContainer.module.css';

const MainContainer: React.FC = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <Calculator />
      </div>
      <div className={styles.rightContainer}>
        <Hero />
      </div>
    </div>
  );
};

export default MainContainer;
