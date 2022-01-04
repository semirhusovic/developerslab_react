import './App.css';
import { useState, useEffect } from 'react';
import Card from './components/Card';

const cardImages = [
  { src: '/images/1.jpg', matched: false },
  { src: '/images/2.jpg', matched: false },
  { src: '/images/3.jpg', matched: false },
  { src: '/images/4.jpg', matched: false },
  { src: '/images/5.jpg', matched: false },
  { src: '/images/6.jpg', matched: false }
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(5);
  const [score, setScore] = useState(0);
  const [firstCard, setFirstCard] = useState(null);
  const [secondCard, setSecondCard] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [won, setWon] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffledCards);
    setTurns(5);
    setScore(0);
    setWon(false);
    setFirstCard(null);
    setSecondCard(null);
  };

  const handleChoice = (card) => {
    firstCard ? setSecondCard(card) : setFirstCard(card);
  };

  useEffect(() => {
    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard.src === secondCard.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstCard.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        setScore((prevScore) => prevScore + 1);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1200);
        setTurns((prevTurns) => prevTurns - 1);
      }
    }
  }, [secondCard]);

  useEffect(() => {
    if (score === 6 && turns > 0) {
      setWon(true);
    }
  }, [score, turns, won]);

  const resetTurn = () => {
    setFirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="App">
      <h3>Attack on titan - Memory game</h3>
      <div className="ctn">
        <p>Broj otvaranja: {turns}</p>
        <button onClick={shuffleCards}>Nova igra</button>
        <p>Broj poena: {score}</p>
      </div>
      {!!won && <p>Pobijedili ste! Bravo!!!</p>}

      {!!turns && (
        <div className="card-grid">
          {cards.map((card) => (
            <Card
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card.matched || card === firstCard || card === secondCard}
              disabled={disabled}
            />
          ))}
        </div>
      )}
      {!turns && (
        <>
          <p>Izgubili ste</p>
          <button onClick={shuffleCards}>Pokusajte ponovo</button>
        </>
      )}
    </div>
  );
}

export default App;
