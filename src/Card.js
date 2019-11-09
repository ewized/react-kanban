import React from 'react';

const styles = {
  card: {
    backgroundColor: '#fff',
    margin: '5px',
    padding: '5px',
  },
  arrow: {
    fontSize: 'bold',
    padding: '5px',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
  }
}

export default ({ onLeft, onRight, children }) => (
  <div style={styles.card}>
    {onLeft && <button style={styles.arrow} onClick={onLeft}>{'<'}</button>}
    <span>{children}</span>
    {onRight && <button style={{ ...styles.arrow, float: 'right' }} href="#" onClick={onRight}>{'>'}</button>}
  </div>
);
