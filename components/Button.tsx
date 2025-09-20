import React from 'react';
import { LoadingIcon } from './icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, isLoading = false, variant = 'primary', className = '', ...props }) => {
  const baseClasses = "w-full text-center font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white";
  
  const variantClasses = {
    primary: 'bg-white border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white focus:ring-gray-900',
    secondary: 'bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900',
  };

  const disabledClasses = "opacity-50 cursor-not-allowed";

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${isLoading || props.disabled ? disabledClasses : ''} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <LoadingIcon className="animate-spin -ml-1 mr-3 h-5 w-5" />
          Processing...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;