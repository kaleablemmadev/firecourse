import { useDropdown } from '../hooks/useDropdown';

interface Option {
  value: string;
  label: string;
}

interface DropdownProps {
  required?: boolean;
  label?: string;
  options: Option[];
  placeholder?: string;
  onSelect?: (option: Option) => void;
}

function Dropdown({ required, label, options, placeholder, onSelect }: DropdownProps) {
    const { isOpen, selected, toggle, select, dropdownRef } = useDropdown();
    const handleSelect = (option: Option) => {
        select(option);
        if (onSelect) onSelect(option);
    }

    return(
        <div className="w-1/2 flex flex-col" ref={dropdownRef}>
            {label && (
                <label className="font-amharic text-md mt-7 font-semibold">
                    {label} {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <button 
                type="button" 
                onClick={toggle} 
                className="font-amharic text-md mt-2 font-semibold text-sm text-gray-400 px-6 py-2.5 border border-gray-300 rounded-md focus:ring-2 focus:border-orange-500 flex items-center justify-between w-full"
            >
                <span className="font-amharic text-sm text-gray-400 text-left">
                    {selected?.label || placeholder}
                </span>

                <span className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>

            {isOpen && (
                <div className="absolute w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-10">
                    {options.map((option) => (
                        <div
                        key={option.value}
                        className='px-4 py-2 hover:bg-blue-50 cursor-pointer'
                        onClick={() => handleSelect(option)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default Dropdown;