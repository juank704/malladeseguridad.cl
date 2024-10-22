"use client";


import React from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import styles from '@styles/Hero.module.css';

const Hero: React.FC = () => {
  // Uso del hook para manejar el texto
  const [text] = useTypewriter({
    words: ['Instalación Rápida', 'Resistente', 'Cotiza Ya'],
    loop: true,
    typeSpeed: 60,
    deleteSpeed: 40,
  });

  return (
    <div className={styles.heroContainer}>
      <h1 className={styles.title}>Malla de Seguridad</h1>
      <span className={styles.typedText}>{text}</span>
    </div>
  );
};

export default Hero;
