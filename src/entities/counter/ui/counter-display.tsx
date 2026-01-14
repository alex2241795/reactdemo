import type { Counter } from '../model/types'

interface CounterDisplayProps {
  counter: Counter
}

export function CounterDisplay({ counter }: CounterDisplayProps) {
  return <>count is {counter.value}</>
}
