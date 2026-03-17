import { clsx } from "clsx";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", loading, children, className, disabled, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          "bg-brand-600 text-white hover:bg-brand-700 shadow-lg shadow-brand-600/20": variant === "primary",
          "bg-transparent text-slate-400 hover:text-white hover:bg-white/5 border border-white/10": variant === "ghost",
          "bg-red-900/30 text-red-400 hover:bg-red-900/50 border border-red-800/40": variant === "danger",
        },
        className
      )}
      {...props}
    >
      {loading && (
        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
        </svg>
      )}
      {children}
    </button>
  )
);
Button.displayName = "Button";
