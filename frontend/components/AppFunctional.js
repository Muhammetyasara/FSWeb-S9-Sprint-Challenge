import React, { useState } from 'react'

const initialMessage = ''
const initialEmail = ''
const initialSteps = 0
const initialIndex = 4

export default function AppFunctional(props) {
  const [index, setIndex] = useState(initialIndex)
  const [steps, setSteps] = useState(initialSteps)
  const [email, setEmail] = useState(initialEmail)
  const [message, setMessage] = useState(initialMessage)

  function getXY() {
    const x = (index % 3) + 1
    const y = Math.floor(index / 3) + 1
    return { x, y }
  }

  function getXYMesaj() {
    const { x, y } = getXY()
    return `Koordinatlar (${x}, ${y})`
  }

  function reset() {
    setIndex(initialIndex)
    setSteps(initialSteps)
    setEmail(initialEmail)
    setMessage(initialMessage)
  }

  function sonrakiIndex(yon) {
    const row = Math.floor(index / 3)
    const col = index % 3

    switch (yon) {
      case 'up':
        if (row === 0) return null
        return index - 3
      case 'down':
        if (row === 2) return null
        return index + 3
      case 'left':
        if (col === 0) return null
        return index - 1
      case 'right':
        if (col === 2) return null
        return index + 1
      default:
        return null
    }
  }

  function ilerle(evt) {
    const yon = evt.target.id
    const yeniIndex = sonrakiIndex(yon)

    if (yeniIndex === null) {
      const mesajlar = {
        up: 'Yukarıya gidemezsiniz',
        down: 'Aşağıya gidemezsiniz',
        left: 'Sola gidemezsiniz',
        right: 'Sağa gidemezsiniz',
      }
      setMessage(mesajlar[yon])
      return
    }

    setIndex(yeniIndex)
    setSteps(s => s + 1)
    setMessage('')
  }

  function onChange(evt) {
    setEmail(evt.target.value)
  }

  function onSubmit(evt) {
    evt.preventDefault()

    const { x, y } = getXY()

    fetch('http://localhost:9000/api/result', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        x,
        y,
        steps,
        email,
      }),
    })
      .then(res => res.json())
      .then(data => {
        setMessage(data.message)
        setEmail('') // ❗ test F7
      })
      .catch(err => {
        setMessage(err.message)
      })
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">{getXYMesaj()}</h3>
        <h3 id="steps">{steps} kere ilerlediniz</h3>
      </div>

      <div id="grid">
        {[0,1,2,3,4,5,6,7,8].map(idx => (
          <div
            key={idx}
            className={`square${idx === index ? ' active' : ''}`}
          >
            {idx === index ? 'B' : null}
          </div>
        ))}
      </div>

      <div className="info">
        <h3 id="message">{message}</h3>
      </div>

      <div id="keypad">
        <button id="left" onClick={ilerle}>SOL</button>
        <button id="up" onClick={ilerle}>YUKARI</button>
        <button id="right" onClick={ilerle}>SAĞ</button>
        <button id="down" onClick={ilerle}>AŞAĞI</button>
        <button id="reset" onClick={reset}>reset</button>
      </div>

      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          value={email}
          onChange={onChange}
          placeholder="email girin"
        />
        <input id="submit" type="submit" />
      </form>
    </div>
  )
}
