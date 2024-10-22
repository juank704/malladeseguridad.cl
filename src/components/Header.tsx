import React from 'react';

import Link from 'next/link';
import styles from '@styles/Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">LOGO</Link>
      </div>
      <nav className={styles.nav}>
        <Link href="/proyectos-realizados" className={styles.navItem}>
          Proyectos Realizados
        </Link>
        <Link href="/quienes-somos" className={styles.navItem}>
          Quiénes Somos
        </Link>
        <Link href="/contacto" className={styles.navItem}>
          Contacto
        </Link>
      </nav>
    </header>
  );
};

export default Header;
