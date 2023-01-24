import React from 'react';
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

import './App.css';

import Die from './components/Die';
function App() {

  // create random numbers for dice
  const roll = () => {
    const random = Math.floor((Math.random() * 6) + 1)
    return random
  }

  // create array of ten die with the random numbers
  const diceRolls = () => {
    const dieArr = []
    for (let i = 1; i < 11; i++) {
      dieArr.push({id: nanoid(), value: roll(), isHeld: false})
    }
    return dieArr
  }

  // state
  const [dice, setDice] = React.useState(() => diceRolls())
  const [tenzies, setTenzies] = React.useState(false)

  // change holding status of die
  const isHeld = (id) => {
    
    setDice(prevState => {
      return prevState.map(die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      })
    })
  }

  const rollTheDice = () => {
    { if(!tenzies) {
      setDice( dice.map( die => die.isHeld ? die : {...die, value: roll()}))
      } else { 
        setTenzies(false)
        setDice(diceRolls()) 
      }
    }
  }

  // create die components
  const myRolls = dice.map( roll => 
        <Die  key={roll.id}
              id={roll.id} 
              value={roll.value} 
              isHeld={roll.isHeld}
              onClick={isHeld}/>)

    React.useEffect(() => {
      const allHeld = dice.every(die => die.isHeld)
      const firstValue = dice[0].value
      const allSameValue = dice.every(die => die.value === firstValue)
      if (allHeld && allSameValue) {
          setTenzies(true)
      }
  }, [dice])

  return (
    <main className="App flex_column center">
      {tenzies && <Confetti /> }
      <h1>TENZIES</h1>
      <p>Roll until all dice are the same. Click each dice to freeze it at its current value between rolls.</p>
      <div className="dice_container">
        {myRolls}
      </div>
      <div className='button_container'>
        <button onClick={rollTheDice}>{!tenzies ? 'Roll' : 'Play Again'}</button>
      </div>
    </main>
  );
}

export default App