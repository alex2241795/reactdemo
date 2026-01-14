import './reset-button.css'

interface ResetButtonProps {
  onReset: () => void
  text?: string
}

export function ResetButton({ 
  onReset, 
  text = "New workflow" 
}: ResetButtonProps) {
  return (
    <button 
      className="reset-button" 
      onClick={onReset}
    >
      {text}
    </button>
  )
}
