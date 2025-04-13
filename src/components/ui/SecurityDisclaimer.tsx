import React, { useState } from 'react';
import { FaShieldAlt, FaExclamationTriangle, FaLock, FaClipboard, FaDesktop, FaPuzzlePiece, FaChevronDown } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const SecurityDisclaimer = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      <div className="max-w-md mx-auto rounded-2xl bg-background-dark/80 backdrop-blur-xl border border-gray-700 p-6 space-y-6">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full text-left"
        >
          <div className="flex items-center space-x-2">
            <FaShieldAlt className="text-primary-light" />
            <h3 className="text-lg font-semibold text-white">Security Limitations</h3>
          </div>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FaChevronDown className="text-gray-400" />
          </motion.div>
        </button>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <FaExclamationTriangle className="text-warning mt-1" />
                  <div>
                    <h4 className="font-medium text-white">Browser-Based Vulnerabilities</h4>
                    <p className="mt-2 text-sm text-gray-300">
                      This tool is vulnerable to browser-based attacks. Please be aware of:
                    </p>
                    <ul className="mt-2 space-y-2 text-sm text-gray-300">
                      <li className="flex items-start space-x-2">
                        <FaDesktop className="mt-1" />
                        <span>Screen capture software may record sensitive information</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <FaLock className="mt-1" />
                        <span>Keyloggers can capture your keystrokes</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <FaClipboard className="mt-1" />
                        <span>Clipboard monitoring can access copied data</span>
                      </li>
                      <li className="flex items-start space-x-2">
                        <FaPuzzlePiece className="mt-1" />
                        <span>Malicious browser extensions may compromise security</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-background-dark/50 p-4">
                  <h4 className="font-medium text-white mb-3">Best Practices</h4>
                  <ul className="text-sm text-gray-300 space-y-2">
                    <li className="flex items-center space-x-2">
                      <span className="text-primary-light">•</span>
                      <span>Use a secure, private browser window</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-primary-light">•</span>
                      <span>Avoid using public or shared computers</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-primary-light">•</span>
                      <span>Keep your browser and extensions updated</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-primary-light">•</span>
                      <span>Use a trusted password manager</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-primary-light">•</span>
                      <span>Clear your clipboard after use</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-primary-light">•</span>
                      <span>Be cautious of screen recording software</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}; 