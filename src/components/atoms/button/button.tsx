import { LucideIcon } from "lucide-react";
import { BaseButtonProps, BaseButton } from "./base";

interface ButtonProps extends Omit<BaseButtonProps, "className"> {
  icon?: LucideIcon;
  variant?: "primary" | "secondary" | "outline";
  fullWidth?: boolean;
  className?: string;
}

export const Button = ({ children, icon: Icon, variant = "primary", fullWidth = false, className = "", ...props }: ButtonProps) => {
  const variants = {
    primary: "bg-main text-white hover:bg-main/90 border border-main",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-transparent",
    outline: "bg-transparent border border-main text-main hover:bg-main/10",
  };

  return (
    <BaseButton className={`${variants[variant]} ${fullWidth ? "w-full" : "w-auto"} ${className}`} {...props}>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </BaseButton>
  );
};
