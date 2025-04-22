import { useState } from 'react';
import { motion } from 'framer-motion';
import { SecurityDeclaration } from './SecurityDeclaration';
import { SecurityCheck } from '../../types';
import { performSecurityChecks } from '../../utils/passwordGenerator';
import { Button } from './Button';
import { Input } from './Input';
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { CrackTimeEstimate } from '../../utils/estimateCrackTime';
import { formatLargeTime } from '../../utils/formatTime';

interface ConverterProps {
  onConvert: (input: string) => Promise<string>;
  isConverting: boolean;
  crackTimeInfo: CrackTimeEstimate | null;
}

export const Converter = ({ onConvert, isConverting, crackTimeInfo }: ConverterProps) => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleConvert = async () => {
    try {
      const result = await onConvert(input);
      setOutput(result);
      setCopied(false);
    } catch (error) {
      // Error is handled by the parent component (App.tsx)
      // Ensure output is cleared if conversion fails
      setOutput(''); 
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setCopied(false);
    // Error and crackTimeInfo state are managed in App.tsx, 
    // clearing output here is sufficient to hide the related UI.
  };

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-md mx-auto rounded-2xl bg-background-dark/90 backdrop-blur-xl border border-gray-800 p-6"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">
          Link to Password
        </h2>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <Input
            label="Enter CS2 Skin Link"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="steam://rungame/730/..."
            className="bg-background-dark/50 border-gray-700 focus:border-primary"
          />
        </div>

        <div className="flex gap-3">
          <Button
            onClick={handleConvert}
            disabled={!input || isConverting}
            isLoading={isConverting}
            className="flex-1 bg-primary hover:bg-primary/90 text-white py-2.5"
          >
            Convert
          </Button>
          <Button
            onClick={handleClear}
            variant="secondary"
            disabled={!input && !output}
            className="px-4 py-2.5 bg-gray-700/50 hover:bg-gray-700/70"
          >
            Clear
          </Button>
        </div>

        {output && (
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Input
                label="Generated Password"
                value={output}
                readOnly
                className="bg-background-dark/50 border-gray-700 font-mono"
              />
              <Button
                onClick={handleCopy}
                className="w-full bg-gray-700/50 hover:bg-gray-700/70 text-white py-2.5"
              >
                {copied ? (
                  <>
                    <CheckIcon className="w-5 h-5 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <CopyIcon className="w-5 h-5 mr-2" />
                    Copy Password
                  </>
                )}
              </Button>
            </div>

            {crackTimeInfo && (
              <div className="flex items-center justify-between text-sm text-gray-400 pt-2">
                <span>Est. Time to Crack:</span>
                <span className="font-medium text-gray-100">
                  {formatLargeTime(crackTimeInfo.crackTimeSeconds)}
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};