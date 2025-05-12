
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2, Check, XIcon } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 button-press hover-lift",
  {
    variants: {
      variant: {
        default: "bg-primary text-white hover:bg-primary/90 hover:text-white focus:bg-primary/80 active:bg-primary/70",
        destructive: "bg-destructive text-white hover:bg-destructive/90 hover:text-white focus:bg-destructive/80 active:bg-destructive/70",
        outline: "border border-input bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 active:bg-gray-200",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground focus:bg-secondary/70 active:bg-secondary/60",
        ghost: "bg-transparent text-gray-800 hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 active:bg-gray-200",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary/90 focus:text-primary/80 active:text-primary/70",
        gradient: "bg-gradient-to-r from-adking-primary to-adking-secondary text-adking-dark hover:opacity-90 focus:opacity-85 active:opacity-80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      state: {
        default: "",
        loading: "",
        success: "",
        error: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      state: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
  selected?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    state, 
    asChild = false, 
    loading = false, 
    startIcon, 
    endIcon, 
    disabled,
    selected,
    children, 
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // Compute disabled state
    const isDisabled = disabled || loading || state === "loading"
    
    // Handle state-specific icons
    const renderStateIcon = () => {
      if (loading || state === "loading") {
        return <Loader2 className="h-4 w-4 animate-spin" />
      }
      
      if (state === "success") {
        return <Check className="h-4 w-4" />
      }
      
      if (state === "error") {
        return <XIcon className="h-4 w-4" />
      }
      
      return startIcon
    }
    
    // Determine effective variant based on selected state
    let effectiveVariant = variant;
    if (selected && variant !== 'gradient') {
      effectiveVariant = 'gradient';
    }
    
    // Enhanced button class with guaranteed text contrast
    const buttonClass = cn(
      buttonVariants({ variant: effectiveVariant, size, state, className }),
      
      // Selected state with clear visual indicator - always on top of other styles
      selected && "font-bold shadow-md border-2 border-amber-500 dark:border-amber-400 z-10",
      
      // Disabled state with visible but muted appearance
      isDisabled && "opacity-50 bg-gray-200 text-gray-500 border border-gray-300 pointer-events-none",
    )
    
    return (
      <Comp
        className={buttonClass}
        ref={ref}
        disabled={isDisabled}
        aria-selected={selected}
        {...props}
      >
        {renderStateIcon()}
        {children}
        {!loading && state !== "loading" && endIcon}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
