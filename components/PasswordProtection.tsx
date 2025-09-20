import React, { useState } from 'react';
import { TribeLogo } from './icons';
import Button from './Button';
import Card from './Card';

interface PasswordProtectionProps {
  onAuthenticated: () => void;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ onAuthenticated }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate a brief loading delay
    setTimeout(() => {
      if (password === 'RWPOV') {
        onAuthenticated();
      } else {
        setError('Incorrect password. Please try again.');
        setPassword('');
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card>
          <div className="text-center">
            <TribeLogo className="w-20 h-20 mx-auto mb-6" />
            <h1 className="text-3xl font-bold font-serif text-black mb-2">KINGLEY</h1>
            <p className="text-gray-600 mb-8">Enter the password to access the movement.</p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent text-center font-mono"
                  disabled={isLoading}
                  autoFocus
                />
              </div>
              
              {error && (
                <div className="text-red-600 text-sm text-center">
                  {error}
                </div>
              )}
              
              <Button type="submit" isLoading={isLoading} disabled={!password.trim()}>
                {isLoading ? 'Verifying...' : 'Enter'}
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PasswordProtection;