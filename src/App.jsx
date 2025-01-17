import { useEffect, useRef, useState } from "react";
import Die from "./Components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti-boom";
import Timer from "./Components/Timer";

function App() {
  const [isRunning, setIsRunning] = useState(false)
  const [reset, setReset] = useState(false)

  const [diceRoll, setDiceRoll] = useState(0)
  const [die, setDie] = useState(() => generateAllDie());
  const newbtnFocus = useRef(null);
  
  const gameWon = die.every(
    (e, i, arr) => e.isHeld === true && e.value === arr[0].value
  );
  useEffect(() => {
    if (gameWon) {
      newbtnFocus.current.focus();
      setIsRunning(false)
    }
  }, [gameWon]);

  function changeColor(id) {
    if(!gameWon) {
      setDie((prevState) => {
        return prevState.map((e) => {
          return e.id === id ? { ...e, isHeld: !e.isHeld } : e;
        });
      });
      setIsRunning(true);
    }
  }

  function generateAllDie() {
    const randomArrObj = [];
    for (let i = 0; i < 10; i++) {
      randomArrObj.push({
        value: Math.floor(Math.random() * 6 + 1),
        isHeld: false,
        id: nanoid(),
      });
    }
    
    return randomArrObj;
  }

  const handleClick = () => {
    if (!gameWon) {
      setDie((prevState) => {
        return prevState.map((dice) => {
          return !dice.isHeld
            ? { ...dice, value: Math.floor(Math.random() * 6 + 1) }
            : dice;
        });
      });
      setDiceRoll(prevRoll => prevRoll+1)
      setIsRunning(true)
    } else {
      setDie(generateAllDie);
      setReset(true); // Trigger timer reset
      setTimeout(() => setReset(false), 0); // Clear reset flag immediately
      setDiceRoll(0); // Reset dice roll count
    }
  };

  return (
    <>
      {gameWon && (
        <Confetti
          mode="fall"
          particleCount={50}
          shapeSize={40}
          colors={["#ff577f", "#ff884b", "2088c9", "eae24d", "ea994d"]}
          fadeOutHeight={1}
        />
      )}
      <main>
        <section>
          <div className="wrapper">
            <div className="inner-container">
              <div className="text-container">
                <h1>Tenzies</h1>
                <p>
                  Roll until all dice are the same. Click each die to freeze it
                  at its current value between rolls.
                </p>
              </div>

              <div className="btn-container">
                {die?.map((e) => {
                  return (
                    <Die
                      value={e.value}
                      key={e.id}
                      id={e.id}
                      isHeld={e.isHeld}
                      hold={changeColor}
                    />
                  );
                })}
              </div>
              <button
                ref={newbtnFocus}
                className="roll-btn"
                onClick={() => handleClick()}
              >
                {" "}
                {gameWon ? "New Game" : "Roll"}
              </button>
            </div>
          
          <p>Dice Rolled: {diceRoll}</p>
          <Timer isRunning={isRunning} gameWon={gameWon} reset={reset}/>
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
