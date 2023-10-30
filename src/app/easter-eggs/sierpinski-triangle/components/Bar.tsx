import type { CSSProperties } from "react";

type BarProps = {
  percentage: number;
  label: string;
  className?: string;
  style?: CSSProperties;
};

export function Bar({ percentage, label, className, style }: BarProps) {
  return (
    <div className="flex flex-row w-full">
      <p className="flex items-center justify-center w-32 min-w-[128px]">
        {label}
      </p>
      <div
        className={"relative flex items-center justify-center h-8" + className}
        style={{
          ...style,
          width: `${percentage}%`,
        }}
      >
        <div className="absolute -right-12">{percentage}%</div>
      </div>
    </div>
  );
}
