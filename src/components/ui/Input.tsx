import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const Input = ({
  label,
  error,
  className = '',
  ...props
}: InputProps) => {
  return (
    <div>
      <label htmlFor={props.id} className="block text-sm font-medium text-white">
        {label}
      </label>
      <div className="mt-2">
        <input
          className={`block w-full rounded-lg border-0 bg-white/5 py-3 px-4 text-white shadow-sm ring-1 ring-inset ${
            error ? 'ring-red-500' : 'ring-white/10'
          } focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm ${className}`}
          {...props}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}; 