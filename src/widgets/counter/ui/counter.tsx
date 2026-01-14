import { useState } from 'react'
import type { Counter } from '../../../entities/counter'
import { CounterDisplay } from '../../../entities/counter'
import { ResetButton } from '../../../features/reset-counter'
import './counter.css'

export function CounterWidget() {
  const [counter, setCounter] = useState<Counter>({ value: 0 })

  const handleIncrement = () => {
    setCounter((prev) => ({ value: prev.value + 1 }))
  }

  const handleReset = () => {
    setCounter({ value: 0 })
  }

  return (
    <div className="counter-widget">
      <button onClick={handleIncrement}>
        <CounterDisplay counter={counter} />
      </button>
      <ResetButton onReset={handleReset} />
    </div>
  )
}
