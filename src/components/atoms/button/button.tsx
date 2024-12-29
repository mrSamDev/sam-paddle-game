import { LucideIcon } from "lucide-react";
import { BaseButtonProps, BaseButton } from "./base";
import { AnchorButton, AnchorButtonProps } from "./anchor-button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const buttonVariants = cva("inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors relative overflow-hidden", {
  variants: {
    variant: {
      primary: "bg-main text-white hover:bg-main/90 border border-main disabled:bg-main/50",
      secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 border border-transparent disabled:bg-gray-100",
      outline: "bg-transparent border border-main text-main hover:bg-main/10 disabled:border-main/50 disabled:text-main/50",
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

type ButtonBaseProps = {
  disabled?: boolean;
  icon?: LucideIcon;
  className?: string;
  isLoading?: boolean;
  variant?: VariantProps<typeof buttonVariants>["variant"];
  fullWidth?: VariantProps<typeof buttonVariants>["fullWidth"];
};

type ButtonAsButtonProps = ButtonBaseProps &
  Omit<BaseButtonProps, "className"> & {
    as?: "button";
  };

type ButtonAsAnchorProps = ButtonBaseProps &
  Omit<AnchorButtonProps, "className"> & {
    as: "a";
  };

type ButtonProps = ButtonAsButtonProps | ButtonAsAnchorProps;

export const Button = ({ children, isLoading, icon: Icon, variant, fullWidth, className = "", disabled, as = "button", ...props }: ButtonProps) => {
  const commonProps = {
    className: cn(buttonVariants({ variant, fullWidth }), "active:scale-[0.98] transition-transform disabled:cursor-not-allowed disabled:active:scale-100", className),
    disabled: disabled || isLoading,
    ...props,
  };

  const content = (
    <>
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </>
  );

  if (as === "a") {
    return <AnchorButton {...(commonProps as any)}>{content}</AnchorButton>;
  }

  return <BaseButton {...(commonProps as BaseButtonProps)}>{content}</BaseButton>;
};
