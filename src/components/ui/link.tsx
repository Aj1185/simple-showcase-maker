import * as React from "react"
import { cn } from "@/lib/utils"

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'default' | 'glow'
  children: React.ReactNode
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    const handleFocus = () => {
      const event = new CustomEvent('element-interact', { 
        detail: { 
          color: 'neon-purple',
          element: 'link'
        } 
      })
      document.dispatchEvent(event)
    }

    const handleMouseEnter = () => {
      const event = new CustomEvent('element-interact', { 
        detail: { 
          color: 'neon-purple',
          element: 'link'
        } 
      })
      document.dispatchEvent(event)
    }

    return (
      <a
        ref={ref}
        className={cn(
          variant === 'glow' && "link-glow",
          "transition-colors",
          className
        )}
        onFocus={handleFocus}
        onMouseEnter={handleMouseEnter}
        {...props}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = "Link"

export { Link }