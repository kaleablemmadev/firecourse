import { useState } from 'react';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options: Option[];
  label?: string;
  description?: string;
  required?: boolean;
  name?: string;
  onSelect?: (name: string, selectedValues: string[]) => void;
  maxSelections?: number;
}

function MultiSelect({ 
  options, 
  label, 
  description, 
  required = false, 
  name = "multiSelect",
  onSelect,
  maxSelections
}: MultiSelectProps) {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleChange = (value: string) => {
    let newSelected: string[];
    
    if (selectedValues.includes(value)) {
      newSelected = selectedValues.filter(v => v !== value);
    } else {
      if (maxSelections && selectedValues.length >= maxSelections) {
        alert(`You can only select up to ${maxSelections} options`);
        return;
      }
      newSelected = [...selectedValues, value];
    }
    
    setSelectedValues(newSelected);
    if (onSelect) onSelect(name, newSelected);
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
          {maxSelections && (
            <p className="font-amharic text-xs lg:text-sm text-gray-500">
              እስከ {maxSelections} ምርጫዎችን መምረግ ይችላሉ
            </p>
          )}
        </>
      )}

      <div className="flex flex-wrap gap-3 lg:gap-4 mt-2">
        {options.map((option) => (
          <label key={option.value} className="flex items-center gap-2 cursor-pointer hover:bg-orange-50 px-3 py-2 rounded-lg transition-colors duration-200">
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => handleChange(option.value)}
              className="w-4 h-4 lg:w-5 lg:h-5 text-orange-600 rounded focus:ring-orange-500"
            />
            <span className="text-gray-700 font-amharic text-sm lg:text-base">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default MultiSelect;