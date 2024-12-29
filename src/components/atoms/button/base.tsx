import React from "react";

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

export const BaseButton = ({ children, className = "", ...props }: BaseButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-lg 
          transition-all hover:-translate-y-1 active:translate-y-0 active:scale-95 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
