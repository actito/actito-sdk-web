import { PropsWithChildren } from "react";

export function Tooltip({ label, disabled, children }: TooltipProps) {
  return (
    <div className="group relative inline-block z-50">
      {children}

      {!disabled && (
        <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 opacity-0 transition-opacity duration-200 group-hover:delay-500 group-hover:opacity-100">
          <div className="w-max relative items-center rounded bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white p-2 text-center text-xs shadow-md shadow-neutral-300 dark:shadow-none">
            {label}
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-white dark:border-t-neutral-700"></div>
          </div>
        </div>
      )}
    </div>
  );
}

interface TooltipProps extends PropsWithChildren {
  label: string;
  disabled?: boolean;
}
