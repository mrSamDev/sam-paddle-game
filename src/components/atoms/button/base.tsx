import React from "react";
import { clsx } from "clsx";

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  raised?: boolean;
}

export const BaseButton = ({ children, className = "", raised = true, disabled, ...props }: BaseButtonProps) => {
  return (
    <button
      className={clsx(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-lg transition-all duration-150",
        raised && ["shadow-[0_8px_0_0_rgba(0,0,0,0.2)]", "active:shadow-[0_0_0_0_rgba(0,0,0,0.2)]", "active:translate-y-2"],
        disabled && ["opacity-50", "cursor-not-allowed", "active:translate-y-0", raised && "active:shadow-[0_8px_0_0_rgba(0,0,0,0.2)]"],
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};
