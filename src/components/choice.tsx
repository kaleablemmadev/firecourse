import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface MultipleChoiceProps {
  label?: string;
  options: Option[];
  description?: string;
  required?: boolean;
  name?: string;
  onSelect?: (name: string, value: string) => void;
}

function MultipleChoice({ label, options, description, required = false, name = "choice", onSelect }: MultipleChoiceProps) {
  const [selected, setSelected] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelected(value);
    if (onSelect) onSelect(name, value);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <>
          <label className="font-amharic text-base lg:text-md mt-6 font-semibold text-gray-800">
            {label} {required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {description && (
            <p className="font-amharic text-sm lg:text-base font-light text-gray-600">
              {description}
            </p>
          )}
        </>
      )}

      <div className="flex flex-row gap-6 lg:gap-8">
        {options.map((option) => (
            <label key={option.value} className="flex items-center mt-2 gap-3 cursor-pointer hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors duration-200">
                <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={selected === option.value}
                    onChange={handleChange}
                    className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600 focus:ring-orange-500"
                />
                <span className="text-gray-700 font-amharic text-sm lg:text-base">{option.label}</span>
            </label>
        ))}
      </div>
    </div>
  );
}

export default MultipleChoice;