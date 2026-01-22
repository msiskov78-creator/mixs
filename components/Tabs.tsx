import { cn } from "@/lib/utils";

export type TabOption = {
  id: string;
  label: string;
};

export function Tabs({
  options,
  active,
  onChange
}: {
  options: TabOption[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.id}
          className={cn(
            "rounded-full px-4 py-1 text-sm",
            active === option.id
              ? "bg-brand-500 text-white"
              : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-200"
          )}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
