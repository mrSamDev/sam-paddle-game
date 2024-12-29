import React from "react";
import { clsx } from "clsx";

export interface AnchorButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
  raised?: boolean;
  href: string;
}

export const AnchorButton = ({ children, className = "", raised = true, href, role = "button", ...props }: AnchorButtonProps) => {
  return (
    <a
      href={href}
      role={role}
      className={clsx(
        "flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium text-lg transition-all duration-150",
        "focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500", // Add focus styles
        raised && ["shadow-[0_8px_0_0_rgba(0,0,0,0.2)]", "active:shadow-[0_0_0_0_rgba(0,0,0,0.2)]", "active:translate-y-2"],
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
};
