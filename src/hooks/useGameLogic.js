import { useEffect, useState } from "react";

export const useGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }
  function initializeGame() {
    // shuffled cards
    const shuffled = shuffleArray(cardValues);
    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setIsLocked(false);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setMoves(0);
  }

  function handleClick(card) {
    // Don't allow clicking if card is already flipped, matched
    if (
      card.isFlipped ||
      card.isMatched ||
      isLocked ||
      flippedCards.length === 2
    ) {
      return;
    }

    // Update card flipped state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });
    console.log(newCards);

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);
    console.log(newFlippedCards);

    //Check for match if two cards are flipped
    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];
      if (firstCard.value === card.value) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev + 1);
          setCards((prev) =>
            prev.map((c) => {
              if (c.id === card.id || c.id === firstCard.id) {
                return { ...c, isMatched: true };
              } else {
                return c;
              }
            }),
          );
          setIsLocked(false);
          setFlippedCards([]);
        }, 500);
      } else {
        // flip back card 1, card 2
        setTimeout(() => {
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });

          setCards(flippedBackCard);
          setIsLocked(false);
          setFlippedCards([]);
        }, 1000);
      }
      setMoves((prev) => prev + 1);
    }
  }

  useEffect(() => {
    initializeGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isGameComplete = matchedCards.length === cards.length;

  return { cards, score, moves, isGameComplete, handleClick };
};
