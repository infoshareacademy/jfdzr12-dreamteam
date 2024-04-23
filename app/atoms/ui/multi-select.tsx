import { ChangeEvent, useState } from "react";

interface Option {
    label: string;
    value: string;
  }
  
  interface CheckboxProps {
    options: Option[];
    name: string;
    checked: string | string[] | undefined;
    onChange: (value: string[]) => void;
  }
  
export const Checkbox: React.FC<CheckboxProps> = ({options, onChange}) => {
    const [checkedValues, setCheckedValues] = useState<string[]>([]);
    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {value, checked} = e.target;
        if (checked) {
            setCheckedValues([...checkedValues, value])
        } else {
            setCheckedValues(checkedValues.filter((element)=> element !== value))
        }
        onChange(checkedValues);
    }
  
    return (
        <>
            {options.map((option) => (
            <div key={option.value}>
                <input
                type="checkbox"
                value={option.value}
                checked={checkedValues.includes(option.value)}
                onChange={handleCheckboxChange}
                />
                <label htmlFor={option.value}>{option.label}</label>
            </div>
            ))}
        </>
    );
  };
  