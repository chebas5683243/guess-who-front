import { cn } from "@/lib/utils";

interface StarcraftCheckboxProps {
  checked: boolean;
  className?: string;
}

export function StarcraftCheckbox({
  checked,
  className,
}: StarcraftCheckboxProps) {
  return (
    <div className={cn("relative w-4 h-4", className)}>
      <div className="absolute inset-0 border-2 border-cyan-500/40" />
      {checked && (
        <div className="absolute inset-[2px] border-2 border-cyan-500" />
      )}
      {checked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-2 h-2 bg-cyan-500" />
        </div>
      )}
    </div>
  );
}
