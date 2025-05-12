
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
        default: "bg-primary text-white hover:bg-primary/90 hover:text-white",
        destructive: "bg-destructive text-white hover:bg-destructive/90 hover:text-white",
        outline: "border border-input bg-white text-gray-800 hover:bg-gray-100 hover:text-gray-900",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-transparent text-gray-800 hover:bg-gray-100 hover:text-gray-900",
        link: "text-primary underline-offset-4 hover:underline",
        gradient: "bg-gradient-to-r from-adking-primary to-adking-secondary text-adking-dark hover:opacity-90",
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
      
      // Base text colors for each variant
      {
        // Dark text on light backgrounds
        "text-gray-800": 
          effectiveVariant === 'outline' || 
          effectiveVariant === 'ghost',
          
        // Dark text for gradient variants
        "text-adking-dark font-medium": 
          effectiveVariant === 'gradient' || selected,
          
        // White text on dark backgrounds  
        "text-white": 
          effectiveVariant === 'default' || 
          effectiveVariant === 'destructive' ||
          effectiveVariant === 'secondary',
      },
      
      // Hover states with guaranteed contrast
      {
        "hover:bg-gray-100 hover:text-gray-900": 
          effectiveVariant === 'outline' || 
          effectiveVariant === 'ghost',
          
        "hover:bg-primary/80 hover:text-white": 
          effectiveVariant === 'default',
          
        "hover:bg-destructive/80 hover:text-white": 
          effectiveVariant === 'destructive',
          
        "hover:bg-secondary/80 hover:text-white": 
          effectiveVariant === 'secondary',
          
        "hover:opacity-90 hover:text-adking-dark": 
          effectiveVariant === 'gradient',
      },
      
      // Focus states with guaranteed contrast
      {
        "focus:bg-gray-200 focus:text-gray-900": 
          effectiveVariant === 'outline' || 
          effectiveVariant === 'ghost',
          
        "focus:bg-primary/70 focus:text-white": 
          effectiveVariant === 'default',
          
        "focus:bg-destructive/70 focus:text-white": 
          effectiveVariant === 'destructive',
          
        "focus:bg-secondary/70 focus:text-white": 
          effectiveVariant === 'secondary',
          
        "focus:opacity-85 focus:text-adking-dark": 
          effectiveVariant === 'gradient',
      },
      
      // Active states with guaranteed contrast
      {
        "active:bg-gray-300 active:text-gray-900": 
          effectiveVariant === 'outline' || 
          effectiveVariant === 'ghost',
          
        "active:bg-primary/60 active:text-white": 
          effectiveVariant === 'default',
          
        "active:bg-destructive/60 active:text-white": 
          effectiveVariant === 'destructive',
          
        "active:bg-secondary/60 active:text-white": 
          effectiveVariant === 'secondary',
          
        "active:opacity-80 active:text-adking-dark": 
          effectiveVariant === 'gradient',
      },
      
      // Selected state with visible indicator
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
