import { ReactNode } from "react";
import clsx from "clsx";
import { BaseButton } from "../button/base";

type SelectorButtonProps<T> = {
  value: T;
  isSelected: boolean;
  onClick: (value: T) => void;
  label?: ReactNode;
  className?: string;
};

export const SelectorButton = <T extends string | number>({ value, isSelected, onClick, label, className = "" }: SelectorButtonProps<T>) => {
  return (
    <BaseButton
      onClick={() => onClick(value)}
      className={clsx("px-3 py-1 rounded border", isSelected ? "bg-main text-zinc-100 border-main" : "bg-muted text-main border-main/20 hover:border-main/40", className)}
    >
      {label || value}
    </BaseButton>
  );
};
