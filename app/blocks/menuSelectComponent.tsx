import { ChangeEvent } from "react";

interface Option {
    value: string;
    label: string;
  }
  
  interface SelectMenuProps {
    options: Option[];
    name: string;
    onChange: (value: string) => void;
  }
  
export const SelectMenu: React.FC<SelectMenuProps> = ({ options, name, onChange }) => {
    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const selectedValue = e.target.value;
      onChange(selectedValue);
    };
  
    return (
      <select name={name} onChange={handleSelectChange}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    );
  };
  