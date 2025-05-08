type TimeLimitPickerProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
  options?: number[];
};

export function TimeLimitPicker({
  value,
  onChange,
  min = 20,
  max = 60,
  step = 1,
  label = "TIME LIMIT",
}: TimeLimitPickerProps) {
  return (
    <div className="space-y-1">
      <label className="block font-starcraft text-xs text-cyan-400">
        {label} ({value} sec)
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-cyan-500"
      />
      <div className="flex justify-between text-xs text-cyan-200 font-starcraft">
        {[min, Math.round((max + min) / 2), max].map((option) => (
          <span key={option}>{option} sec</span>
        ))}
      </div>
    </div>
  );
}
