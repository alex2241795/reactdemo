import { createContext, useContext, useState, type ReactNode } from 'react'
import './accordion.css'

interface AccordionContextType {
  openIndexes: number[]
  toggleItem: (index: number) => void
  mode: 'single' | 'multiple'
  registerItem: (index: number, buttonRef: HTMLButtonElement | null) => void
  focusItem: (index: number) => void
  itemCount: number
}

const AccordionContext = createContext<AccordionContextType | null>(null)

export function useAccordionContext() {
  const context = useContext(AccordionContext)
  if (!context) {
    throw new Error('Accordion components must be used within an Accordion')
  }
  return context
}

interface AccordionProps {
  mode?: 'single' | 'multiple'
  defaultOpenIndexes?: number[]
  children: ReactNode
  className?: string
}

export function Accordion({ 
  mode = 'single', 
  defaultOpenIndexes = [], 
  children,
  className = ''
}: AccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<number[]>(defaultOpenIndexes)
  const [itemRefs, setItemRefs] = useState<Map<number, HTMLButtonElement>>(new Map())
  
  // Count children to support keyboard navigation
  const childrenArray = Array.isArray(children) ? children : [children]
  const itemCount = childrenArray.filter(Boolean).length

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) => {
      const isOpen = prev.includes(index)
      
      if (mode === 'single') {
        // Classic accordion: only one panel open at a time
        return isOpen ? [] : [index]
      } else {
        // Multiple mode: toggle individual panels
        return isOpen 
          ? prev.filter((i) => i !== index)
          : [...prev, index]
      }
    })
  }

  const registerItem = (index: number, buttonRef: HTMLButtonElement | null) => {
    setItemRefs((prev) => {
      const newMap = new Map(prev)
      if (buttonRef) {
        newMap.set(index, buttonRef)
      } else {
        newMap.delete(index)
      }
      return newMap
    })
  }

  const focusItem = (index: number) => {
    const button = itemRefs.get(index)
    if (button) {
      button.focus()
    }
  }

  return (
    <AccordionContext.Provider 
      value={{ 
        openIndexes, 
        toggleItem, 
        mode,
        registerItem,
        focusItem,
        itemCount
      }}
    >
      <div className={`accordion ${className}`.trim()}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}
