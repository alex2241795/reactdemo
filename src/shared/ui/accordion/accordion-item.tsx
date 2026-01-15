import { useEffect, useRef, type ReactNode, type KeyboardEvent } from 'react'
import { useAccordionContext } from './accordion'

interface AccordionItemProps {
  title: string
  children: ReactNode
  index: number
}

export function AccordionItem({ title, children, index }: AccordionItemProps) {
  const { openIndexes, toggleItem, registerItem, focusItem, itemCount } = useAccordionContext()
  const isOpen = openIndexes.includes(index)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const headerId = `accordion-header-${index}`
  const panelId = `accordion-panel-${index}`

  useEffect(() => {
    registerItem(index, buttonRef.current)
    return () => registerItem(index, null)
  }, [index, registerItem])

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    let preventDefault = false

    switch (event.key) {
      case 'ArrowDown':
        // Focus next item (with wrapping)
        preventDefault = true
        focusItem((index + 1) % itemCount)
        break
      
      case 'ArrowUp':
        // Focus previous item (with wrapping)
        preventDefault = true
        focusItem(index === 0 ? itemCount - 1 : index - 1)
        break
      
      case 'Home':
        // Focus first item
        preventDefault = true
        focusItem(0)
        break
      
      case 'End':
        // Focus last item
        preventDefault = true
        focusItem(itemCount - 1)
        break
    }

    if (preventDefault) {
      event.preventDefault()
    }
  }

  return (
    <div className="accordion-item">
      <h3 className="accordion-header">
        <button
          ref={buttonRef}
          id={headerId}
          className="accordion-trigger"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => toggleItem(index)}
          onKeyDown={handleKeyDown}
          type="button"
        >
          <span className="accordion-title">{title}</span>
          <span className="accordion-icon" aria-hidden="true">
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 16 16" 
              fill="none"
              className={isOpen ? 'accordion-icon-open' : ''}
            >
              <path 
                d="M4 6L8 10L12 6" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>
      </h3>
      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`accordion-panel ${isOpen ? 'accordion-panel-open' : ''}`}
        hidden={!isOpen}
      >
        <div className="accordion-content">
          {children}
        </div>
      </div>
    </div>
  )
}
