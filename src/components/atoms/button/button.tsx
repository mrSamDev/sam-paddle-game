import { LucideIcon } from "lucide-react";
import { BaseButtonProps, BaseButton } from "./base";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors", {
  variants: {
    variant: {
      primary: "bg-main text-white hover:bg-main/90 border border-main",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-transparent",
      outline: "bg-transparent border border-main text-main hover:bg-main/10",
    },
    fullWidth: {
      true: "w-full",
      false: "w-auto",
    },
  },
  defaultVariants: {
    variant: "primary",
    fullWidth: false,
  },
});

interface ButtonProps extends Omit<BaseButtonProps, "className">, VariantProps<typeof buttonVariants> {
  icon?: LucideIcon;
  className?: string;
}

export const Button = ({ children, icon: Icon, variant, fullWidth, className = "", ...props }: ButtonProps) => {
  return (
    <BaseButton className={buttonVariants({ variant, fullWidth, className })} {...props}>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </BaseButton>
  );
};
