import { Spinner } from "@/components/spinner";

export function Button({ text, disabled, loading, className, onClick }: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className={`flex items-center justify-center gap-2 sm:w-auto cursor-pointer rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-neutral-800 dark:disabled:text-neutral-600 disabled:cursor-not-allowed ${className}`}
    >
      {loading && <Spinner />}
      {text}
    </button>
  );
}

export interface ButtonProps {
  text: string;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  onClick: () => void;
}
