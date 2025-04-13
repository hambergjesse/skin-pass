import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon, ShieldCheckIcon } from '@heroicons/react/24/solid';
import { SecurityCheck } from '../../types';

interface SecurityDeclarationProps {
  checks: SecurityCheck[];
}

export function SecurityDeclaration({ checks }: SecurityDeclarationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mt-4 w-full text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors text-left"
      >
        <ShieldCheckIcon className="h-4 w-4 flex-shrink-0" />
        <span className="flex-1 text-left">Security Declaration</span>
        {isOpen ? (
          <ChevronUpIcon className="h-4 w-4 flex-shrink-0" />
        ) : (
          <ChevronDownIcon className="h-4 w-4 flex-shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="mt-2 rounded-lg bg-white/5 p-4 w-full text-left">
          <h3 className="text-sm font-medium text-white mb-2 text-left">Security Requirements</h3>
          <ul className="space-y-2 w-full text-left">
            {checks.map((check, index) => (
              <li key={index} className="flex items-center gap-2 w-full text-left">
                <div
                  className={`h-2 w-2 rounded-full flex-shrink-0 ${
                    check.passed ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <div className="flex-1 min-w-0 text-left">
                  <span className="text-sm text-white break-words text-left">{check.name}</span>
                  <p className="text-xs text-gray-400 break-words text-left">{check.details}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}