import { cn } from "@/lib/utils"

interface StarcraftButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export function StarcraftButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled,
  ...props
}: StarcraftButtonProps) {
  return (
    <button
      className={cn(
        "relative group font-starcraft tracking-wider uppercase",
        // Base button
        "bg-black/80",
        // Border and glow
        "border-2",
        "before:absolute before:inset-0 before:bg-gradient-to-b before:from-cyan-500/20 before:to-cyan-900/20",
        "after:absolute after:inset-0 after:bg-gradient-to-b after:from-cyan-500/10 after:to-cyan-900/10",
        // Hover and active states
        "hover:before:from-cyan-500/30 hover:before:to-cyan-900/30",
        "active:before:from-cyan-500/40 active:before:to-cyan-900/40",
        "hover:border-cyan-500/50",
        "active:border-cyan-500/70",
        // Disabled state
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:border-cyan-500/20",
        // Transitions
        "transition-all duration-200",
        // Size variants
        size === 'sm' && "text-xs px-3 py-1.5",
        size === 'md' && "text-sm px-4 py-2",
        size === 'lg' && "text-base px-6 py-3",
        // Color variants
        variant === 'primary' && "border-cyan-500/30 text-cyan-300",
        variant === 'secondary' && "border-cyan-400/20 text-cyan-200",
        variant === 'danger' && "border-red-500/30 text-red-300",
        // Loading state
        isLoading && "cursor-wait",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2002000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </span>
    </button>
  )
} 