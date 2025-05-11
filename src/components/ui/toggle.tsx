
import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
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
      // Default state with visible text
      "text-adking-gray-700",
      // Enhanced selected state with high visibility and guaranteed text contrast
      "data-[state=on]:bg-gradient-to-r data-[state=on]:from-adking-primary data-[state=on]:to-adking-secondary data-[state=on]:!text-adking-dark data-[state=on]:border-none data-[state=on]:font-bold data-[state=on]:shadow-md",
      // Add distinct border for better contrast
      "border border-transparent data-[state=on]:border-amber-400",
      // Ensure hover states maintain proper text contrast
      "hover:text-adking-dark hover:font-medium"
    )}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
