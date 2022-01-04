import React from 'react';
import './Card.css';

function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  };
  return (
    <div className="card" key={card.id}>
      <div className={flipped ? 'flipped' : ''}>
        <img className="front" src={card.src} alt="card front" />
        <img className="back" src="/images/back.jpg" alt="card back" onClick={handleClick} />
      </div>
    </div>
  );
}

export default Card;
