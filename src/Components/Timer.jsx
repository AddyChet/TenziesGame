/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react"

const Timer = ({isRunning, gameWon, reset})=> {
  
  const [elapsedTime, setElapsedTime] = useState(0)
  const [highScore, setHighScore] = useState("00 : 00 : 00")
  const bestScoreRef = useRef(null)
  const intervalId = useRef(null)
  const startTimeRef = useRef(0)
  

  useEffect(() => {
    if (reset) {
      setElapsedTime(0); // Reset timer
      setHighScore("00:00:00") // Rest the current best
    }
  }, [reset]); // Reset when the "reset" prop changes

  useEffect(() => {
    if (isRunning && !gameWon) {
      startTimeRef.current = Date.now() - elapsedTime; // Adjust start time
      intervalId.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);

      return () => {clearInterval(intervalId.current)};
    } else if (isRunning){
      const highscoreStr = displayHighscore(elapsedTime)
      setHighScore(highscoreStr)
      
      return () => {clearInterval(intervalId.current)};
    } else if(gameWon) {
      const highscoreStr = displayHighscore(elapsedTime)
      bestScoreRef.current = highscoreStr
      return () => {clearInterval(intervalId.current)};
    }

  }, [isRunning, gameWon, elapsedTime]);

  function displayTime() {

      let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
      let seconds = Math.floor(elapsedTime / 1000 % 60);
      let milliseconds = Math.floor(elapsedTime % 1000 / 10);
  
      minutes = String(minutes).padStart(2, "0")
      seconds = String(seconds).padStart(2, "0")
      milliseconds = String(milliseconds).padStart(2, "0")
      return `${minutes} : ${seconds} : ${milliseconds}`
  }

  function displayHighscore(ms) {
    let minutes = Math.floor(ms / (1000 * 60) % 60);
    let seconds = Math.floor(ms/ 1000 % 60);
    let milliseconds = Math.floor(ms % 1000 / 10);

    minutes = String(minutes).padStart(2, "0")
    seconds = String(seconds).padStart(2, "0")
    milliseconds = String(milliseconds).padStart(2, "0")
    return `${minutes} : ${seconds} : ${milliseconds}`
}


  return (
    <div>
    <p>Timer: {displayTime()}</p>
    <p>Current Best: {highScore}</p>
    <p>Previous Best: {bestScoreRef.current === null ? "00 : 00 : 00" : bestScoreRef.current}</p>
    </div>
  )
}

export default Timer