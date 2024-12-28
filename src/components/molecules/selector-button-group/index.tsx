import { SelectorButton } from "../../atoms/selector-button";

type SelectorButtonGroupProps<T extends string | number> = {
  values: T[];
  selectedValue: T;
  onClick: (value: T) => void;
  label?: string;
};

export const SelectorButtonGroup = <T extends string | number>({ values, selectedValue, onClick, label }: SelectorButtonGroupProps<T>) => {
  return (
    <div className="flex gap-2 items-center">
      {label && <span className="text-main text-sm">{label}</span>}
      {values.map((value) => (
        <SelectorButton key={value} value={value} isSelected={selectedValue === value} onClick={onClick} label={value} />
      ))}
    </div>
  );
};
