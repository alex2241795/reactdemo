import { Button } from '../../../shared/ui/button'

interface IncrementButtonProps {
  onIncrement: () => void
}

export function IncrementButton({ onIncrement }: IncrementButtonProps) {
  return (
    <Button onClick={onIncrement}>
      Increment
    </Button>
  )
}
