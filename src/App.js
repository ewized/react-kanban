import React, { Component } from 'react';
import Col from './Col.js';
import Card from './Card.js'

const styles = {
  app: {
    display: 'flex',
    backgroundColor: '#eee',
    height: '100vh',
    overflow: 'scroll'
    //flexWrap: 'wrap',
  },
};

export default class extends Component {
  constructor() {
    super()
    // if local storage is none
    if (!localStorage.getItem('kanban')) {
      localStorage.setItem('kanban', JSON.stringify([{
          header: 'Charly',
          color: '#8e6e95',
        },
        {
          header: 'Nancy',
          color: '#39a59c',
        },
        {
          header: 'Josh',
          color: '#344759',
        },
        {
          header: 'Bob',
          color: '#e8741e',
        }]))
    }
    if (!localStorage.getItem('cards')) {
      localStorage.setItem('cards', JSON.stringify([['nancy'], ['cow'], ['drew', 'bob'], ['done', 'pid', 'kill']]))
    }
    this.state = {
      kanban: JSON.parse(localStorage.getItem('kanban')),
      cards: JSON.parse(localStorage.getItem('cards')),
    }
  }

  addCard(col, value = 'test') {
    this.setState(({ cards }) => ({ cards: cards.map((card, cardIndex) => cardIndex === col ? ([ ...card, value ]) : (card))}), () => localStorage.setItem('cards', JSON.stringify(this.state.cards)))

  }

  removeCard(col, index) {
    this.setState(({ cards }) => ({ cards: cards.map((card, cardIndex) => cardIndex === col ? card.filter((c, i) => i !== index) : card )}), () => localStorage.setItem('cards', JSON.stringify(this.state.cards)))
    localStorage.setItem('cards', JSON.stringify(this.state.cards))
  }

  moveRight(col, index) {
    let card = this.state.cards[col][index];
    this.removeCard(col, index);
    if (this.state.cards[col + 1]) {
      this.addCard(col + 1, card)
    }
  }

  moveLeft(col, index) {
    let card = this.state.cards[col][index];
    this.removeCard(col, index);
    if (this.state.cards[col - 1]) {
      this.addCard(col - 1, card)
    }
  }

  render() {
    return (
      <div style={styles.app}>
        {this.state.kanban.map((kanban, col) => (
          <Col {...kanban} addCard={() => this.addCard(col, prompt('Enter new kanban item'))} key={col} style={styles.col}>
            {this.state.cards[col].map((card, index) => <Card key={index} onRight={this.state.cards[col + 1] ? () => this.moveRight(col, index) : null} onLeft={this.state.cards[col - 1] ? () => this.moveLeft(col, index) : null}>{card}</Card>)}
          </Col>
        ))}
      </div>
    )
  }
}
