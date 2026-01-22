import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

export const buttonStyles = {
  base:
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 disabled:cursor-not-allowed disabled:opacity-60",
  variants: {
    primary: "bg-brand-500 text-white hover:bg-brand-700",
    secondary:
      "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
    ghost: "text-slate-600 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
  }
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonStyles.base, buttonStyles.variants[variant], className)}
      {...props}
    />
  );
}
