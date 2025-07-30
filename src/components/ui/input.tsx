import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const handleFocus = () => {
      const event = new CustomEvent('element-interact', { 
        detail: { 
          color: 'neon-purple',
          element: 'input'
        } 
      })
      document.dispatchEvent(event)
    }

    return (
      <input
        type={type}
        className={cn(
          "input-glow flex h-10 w-full rounded-md px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onFocus={handleFocus}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
