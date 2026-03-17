import { InputHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...props }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && <label className="text-sm text-slate-400">{label}</label>}
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-lg bg-white/5 border px-3.5 py-2.5 text-sm text-white placeholder:text-slate-600 outline-none transition",
          error
            ? "border-red-500/50 focus:border-red-500"
            : "border-white/10 focus:border-brand-500",
          className
        )}
        {...props}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";
