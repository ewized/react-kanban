import React, { Component } from 'react';
import Card from './Card.js';

const styles = {
  col: {
    flex: 1,
    margin: '10px',
    minWidth: '200px',
  },
  header: {
    margin: '5px',
    padding: '5px',
    fontSize: '18px',
    color: '#fff',
    textAlign: 'center',
  },
  link: {
    background: 'none',
    border: 'none',
  }
}

export default ({ header = 'empty', color = '#567', addCard , children }) => (
  <div style={styles.col}>
    <h1 style={{ ...styles.header, backgroundColor: color }}>{header}</h1>
    <div>
      {children}
    </div>
    <button style={styles.link} onClick={addCard}>+ Add card</button>
  </div>
)
