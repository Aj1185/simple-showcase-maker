import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive:
            "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline:
            "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline",
          cyan: "btn-cyan",
          magenta: "btn-magenta",
          violet: "btn-violet",
        },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    
    const handleInteraction = (color: string) => {
      const colorMap: Record<string, string> = {
        cyan: 'neon-cyan',
        magenta: 'neon-pink',
        violet: 'neon-purple'
      }
      
      const event = new CustomEvent('element-interact', { 
        detail: { 
          color: colorMap[color] || 'neon-purple',
          element: 'button'
        } 
      })
      document.dispatchEvent(event)
    }

    const handleMouseEnter = () => {
      if (variant && ['cyan', 'magenta', 'violet'].includes(variant)) {
        handleInteraction(variant)
      }
    }
    if (asChild) {
      return (
        <Slot 
          className={cn(buttonVariants({ variant, size, className }))} 
          ref={ref} 
          onMouseEnter={handleMouseEnter}
          {...props} 
        />
      )
    }

    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        onMouseEnter={handleMouseEnter}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
