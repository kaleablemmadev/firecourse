interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "label"> {
    label?: string;
    title?: string;
}

const Input = ({
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    required = false,
    title = "",
    ...props
}: InputProps) => {
    return (
        <div className="mt-5">
            {label && (
                <label className="font-amharic text-base lg:text-md mt-6 font-semibold text-gray-800 ">
                    {label} {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                className="font-amharic w-full text-sm mt-2 text-gray-600 px-4 lg:px-6 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 placeholder-gray-400 bg-white hover:border-gray-400"
                title={title}
                placeholder={placeholder}
                type={type}
                required={required}
                value={value}
                onChange={onChange}
                {...props}
            />
        </div>
    );
};

export default Input;