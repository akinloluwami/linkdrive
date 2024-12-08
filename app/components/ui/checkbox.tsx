import { useState } from "react";

type CheckboxProps = {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
};

export const Checkbox = ({
  checked = false,
  onChange,
  label,
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleChange = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="hidden peer"
      />
      <div
        onClick={handleChange}
        className="w-5 h-5 flex items-center justify-center border-2 border-gray-500 rounded cursor-pointer peer-checked:bg-accent peer-checked:border-accent"
      >
        {isChecked && <span className="text-white text-sm">✓</span>}
      </div>
      {label && (
        <label className="cursor-pointer select-none font-medium text-accent">
          {label}
        </label>
      )}
    </div>
  );
};
