import Card from "./components/CArd";
import GameHeader from "./components/GameHeader";
import WinMessage from "./components/WinMessage";
import { useGameLogic } from "./hooks/useGameLogic";

const cardValues = [
  "🍎",
  "🍇",
  "🍐",
  "🥭",
  "🍌",
  "🍊",
  "🍓",
  "🥑",
  "🍎",
  "🍇",
  "🍐",
  "🥭",
  "🍌",
  "🍊",
  "🍓",
  "🥑",
];

export default function App() {
  const { cards, score, moves, isGameComplete, initializeGame, handleClick } =
    useGameLogic(cardValues);
  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      {isGameComplete && <WinMessage moves={moves} />}

      <div className="cards-grid">
        {cards.length > 0 &&
          cards.map((card) => (
            <Card key={card.id} card={card} onClick={handleClick} />
          ))}
      </div>
    </div>
  );
}
