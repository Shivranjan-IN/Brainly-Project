import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement; // Made optional
  onClick?: () => void;
  fullWidth?: boolean;      // Made optional
  loading?: boolean;        // Made optional
}

const variantStyles = {
  "primary": "bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500",
  "secondary": "bg-purple-200 text-purple-600 hover:bg-purple-300 focus:ring-purple-200"
};

const defaultStyles = "px-4 py-2 rounded-md font-light flex items-center gap-x-2 transition-all duration-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-1";

export function Button({ variant, text, startIcon, onClick, fullWidth, loading }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        ${variantStyles[variant]} 
        ${defaultStyles} 
        ${fullWidth ? "w-full justify-center" : ""} 
        ${loading ? "opacity-45 cursor-not-allowed" : "cursor-pointer"}
      `}
    >
      {/* If loading, show spinner, otherwise show startIcon */}
      {loading ? <Spinner /> : startIcon}
      
      <span>{text}</span>
    </button>
  );
}

// Simple SVG Spinner component to use inside the button
function Spinner() {
  return (
    <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}