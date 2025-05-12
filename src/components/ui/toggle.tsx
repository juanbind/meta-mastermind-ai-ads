
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        gradient: "bg-gradient-to-r from-adking-primary to-adking-secondary text-white hover:opacity-90",
      },
      size: {
        default: "h-10 px-3",
        sm: "h-9 px-2.5",
        lg: "h-11 px-5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(
      toggleVariants({ variant, size, className }),
      
      // Default state with clear contrast
      "bg-white text-gray-700 border border-gray-200",
      
      // Enhanced selected state with yellow gradient
      "data-[state=on]:bg-gradient-to-r data-[state=on]:from-adking-primary data-[state=on]:to-adking-secondary data-[state=on]:text-adking-dark data-[state=on]:font-semibold data-[state=on]:shadow-md data-[state=on]:border-amber-400",
      
      // Hover state with clear distinction and proper contrast
      "hover:bg-gray-100 hover:text-gray-900 hover:border-gray-300",
      
      // Focus state styling for accessibility
      "focus-visible:bg-gray-100 focus-visible:text-gray-900 focus-visible:border-adking-primary",
      
      className
    )}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
