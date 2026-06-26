import { Link } from 'react-router-dom';

interface BlueButtonProps {
  label: string;
  to?: string;           // Optional: for navigation
  onClick?: () => void;  // Optional: for handling clicks
  className?: string;    // Optional: for custom styling
  disabled?: boolean;   // Optional: for disabling the button
}

function BlueButton({ label, to, onClick, className = "", disabled = false }: BlueButtonProps) {
  const baseClass = `px-6 py-2.5 ${disabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} text-white font-amharic font-semibold rounded-lg transition-colors inline-block text-center ${className}`;

  // If 'to' is provided, render as a Link
  if (to) {
    return (
      <Link to={to} className={baseClass}>
        {label}
      </Link>
    );
  }

  // Otherwise render as a button with onClick
  return (
    <button onClick={onClick} className={baseClass} disabled={disabled}>
      {label}
    </button>
  );
}

export default BlueButton;