import { useState } from 'react'
import type { Counter } from '../../../entities/counter'
import { CounterDisplay } from '../../../entities/counter'

export function CounterWidget() {
  const [counter, setCounter] = useState<Counter>({ value: 0 })

  const handleIncrement = () => {
    setCounter((prev) => ({ value: prev.value + 1 }))
  }

  return (
    <button onClick={handleIncrement}>
      <CounterDisplay counter={counter} />
    </button>
  )
}
