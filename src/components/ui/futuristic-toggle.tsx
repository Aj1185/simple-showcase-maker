import * as React from "react"
import { cn } from "@/lib/utils"

interface FuturisticToggleProps {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

const FuturisticToggle = React.forwardRef<HTMLButtonElement, FuturisticToggleProps>(
  ({ checked = false, onCheckedChange, disabled = false, className, children, ...props }, ref) => {
    const [isChecked, setIsChecked] = React.useState(checked)
    const [isPulsing, setIsPulsing] = React.useState(false)

    React.useEffect(() => {
      setIsChecked(checked)
    }, [checked])

    const handleToggle = () => {
      if (disabled) return
      
      const newValue = !isChecked
      setIsChecked(newValue)
      setIsPulsing(true)
      
      // Dispatch custom event for cursor adaptation
      const event = new CustomEvent('element-interact', { 
        detail: { 
          color: newValue ? 'neon-cyan' : 'neon-pink',
          element: 'toggle'
        } 
      })
      document.dispatchEvent(event)
      
      onCheckedChange?.(newValue)
      
      // Remove pulse animation after it completes
      setTimeout(() => setIsPulsing(false), 600)
    }

    return (
      <div className="flex items-center space-x-3">
        <button
          ref={ref}
          type="button"
          role="switch"
          aria-checked={isChecked}
          disabled={disabled}
          onClick={handleToggle}
          className={cn(
            "toggle-switch",
            isChecked && "active",
            isPulsing && "pulse",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          {...props}
        >
          <div className="toggle-thumb" />
        </button>
        {children && (
          <span className="text-sm font-rajdhani font-medium">
            {children}
          </span>
        )}
      </div>
    )
  }
)

FuturisticToggle.displayName = "FuturisticToggle"

export { FuturisticToggle }