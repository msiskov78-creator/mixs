import { useMemo } from "react";
import { cn } from "@/lib/utils";

export function InputAutocomplete({
  value,
  onChange,
  options,
  placeholder,
  label,
  error
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  label: string;
  error?: string;
}) {
  const filtered = useMemo(() => {
    if (!value) return options.slice(0, 6);
    return options.filter((option) => option.toLowerCase().includes(value.toLowerCase())).slice(0, 6);
  }, [value, options]);

  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="font-medium">{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900",
          error && "border-red-400"
        )}
      />
      {error ? <span className="text-xs text-red-500">{error}</span> : null}
      {filtered.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-white p-2 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {filtered.map((option) => (
            <button
              key={option}
              onClick={() => onChange(option)}
              className="block w-full rounded-lg px-2 py-1 text-left text-sm hover:bg-slate-100 dark:hover:bg-slate-800"
              type="button"
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </label>
  );
}
