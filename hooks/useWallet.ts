
import React, { useState, useContext, createContext, useCallback, useEffect } from 'react';
import { Balances } from '../types';
import nacl from 'tweetnacl';
import bs58 from 'bs58';

// Define a consistent interface for the Phantom provider
interface PhantomProvider {
  isPhantom?: boolean;
  connect: (options?: { onlyIfTrusted: boolean }) => Promise<{ publicKey: { toString: () => string } }>;
  disconnect: () => Promise<void>;
  providers?: PhantomProvider[]; // For multi-wallet environments
}

// Update the global window interface to look for `window.solana`
declare global {
  interface Window {
    solana?: PhantomProvider;
  }
}

type WalletStatus = 'disconnected' | 'connecting' | 'connected' | 'error';

interface WalletState {
  publicKey: string | null;
  balances: Balances;
  isConnected: boolean;
  isPhantomInstalled: boolean;
  status: WalletStatus;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  updateBalances: (newBalances: Balances) => void;
}

const WalletContext = createContext<WalletState | undefined>(undefined);

// A helper function to specifically get the Phantom provider, even in a multi-wallet environment.
const getPhantomProvider = (): PhantomProvider | null => {
  const solana = window.solana;
  if (!solana) return null;

  // If a list of providers exists and is an array, find Phantom specifically.
  if (solana.providers && Array.isArray(solana.providers)) {
    const phantom = solana.providers.find(p => p.isPhantom);
    if (phantom) return phantom;
  }

  // Fallback for single-provider environments
  if (solana.isPhantom) {
    return solana;
  }

  return null;
};


export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [provider, setProvider] = useState<PhantomProvider | null>(null);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [balances, setBalances] = useState<Balances>({ sol: 0, kingley: 0 });
  const [isPhantomInstalled, setIsPhantomInstalled] = useState<boolean>(false);
  const [status, setStatus] = useState<WalletStatus>('disconnected');
  const [error, setError] = useState<string | null>(null);


  // Effect to find and set the Phantom provider on load, or handle mobile setup.
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // For mobile, we assume Phantom can be opened via deep link.
    if (isMobile) {
        setIsPhantomInstalled(true);
        return;
    }

    // Desktop provider detection
    let attempts = 0;
    const interval = setInterval(() => {
      const foundProvider = getPhantomProvider();
      if (foundProvider) {
        setProvider(foundProvider);
        setIsPhantomInstalled(true);
        clearInterval(interval);
      }
      attempts++;
      if (attempts > 10) { // Stop polling after 1 second
        if (!foundProvider) {
            setIsPhantomInstalled(false);
        }
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []); // Run only once on mount


  // Effect to handle the redirect back from Phantom on mobile
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const phantomPublicKey = params.get('phantom_encryption_public_key');
    const nonce = params.get('nonce');
    const data = params.get('data');

    if (phantomPublicKey && nonce && data) {
        console.log('Processing Phantom redirect with params:', { phantomPublicKey: phantomPublicKey.slice(0, 8) + '...', nonce: nonce.slice(0, 8) + '...', data: data.slice(0, 8) + '...' });
        
        const dappSecretKeyStr = localStorage.getItem('dappSecretKey');
        if (!dappSecretKeyStr) {
            console.error('No dapp secret key found in localStorage');
            setError("Connection failed. Please try connecting again.");
            setStatus('error');
            return;
        }
        
        setStatus('connecting'); // Set status immediately while we process
        try {
            const dappSecretKey = bs58.decode(dappSecretKeyStr);
            const sharedSecret = nacl.box.before(
                bs58.decode(phantomPublicKey),
                dappSecretKey
            );

            const decryptedDataBytes = nacl.box.open.after(
                bs58.decode(data),
                bs58.decode(nonce),
                sharedSecret
            );

            if (!decryptedDataBytes) {
                throw new Error("Failed to decrypt data from Phantom.");
            }
            
            const decryptedData = JSON.parse(new TextDecoder().decode(decryptedDataBytes));
            console.log('Successfully decrypted data from Phantom');
            
            if (!decryptedData.public_key) {
                throw new Error("Public key not found in decrypted payload.");
            }

            setPublicKey(decryptedData.public_key);
            setStatus('connected');
            setBalances({ sol: 0, kingley: 0 });
            setError(null);
            
            console.log('Wallet connected successfully:', decryptedData.public_key.slice(0, 8) + '...');

            // Clean up URL to remove Phantom connection params and our custom return param
            const url = new URL(window.location.href);
            url.searchParams.delete('phantom_encryption_public_key');
            url.searchParams.delete('nonce');
            url.searchParams.delete('data');
            url.searchParams.delete('return_page');
            window.history.replaceState({}, document.title, url.toString());
            
            // Clean up after successful connection
            localStorage.removeItem('dappSecretKey');

        } catch (e: any) {
            console.error("Could not process payload from Phantom:", e.message);
            setError(`Connection failed: ${e.message}. Please try again.`);
            setStatus('error');
            
            // Clean up URL even on error
            const url = new URL(window.location.href);
            url.searchParams.delete('phantom_encryption_public_key');
            url.searchParams.delete('nonce');
            url.searchParams.delete('data');
            url.searchParams.delete('return_page');
            window.history.replaceState({}, document.title, url.toString());
            
            localStorage.removeItem('dappSecretKey');
        }
    }
  }, []); // Run once on mount to check for redirect params

  const connect = useCallback(async () => {
    setStatus('connecting');
    setError(null);

    // Desktop Browser Flow (via injected provider)
    if (provider) {
      try {
        const resp = await provider.connect({ onlyIfTrusted: false });
        const pubKey = resp.publicKey.toString();
        setPublicKey(pubKey);
        setStatus('connected');
        setBalances({ sol: 0, kingley: 0 });
      } catch (err) {
        console.error('Failed to connect to Phantom via provider', err);
        setError('Connection was rejected. Please try again.');
        setStatus('error');
      }
      return;
    }

    // Mobile Browser Flow (via deep link)
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
        try {
            console.log('Initiating mobile wallet connection...');
            
            // Generate a fresh keypair for this connection attempt.
            const dappKeyPair = nacl.box.keyPair();
            const dappPublicKey = bs58.encode(dappKeyPair.publicKey);
            const dappSecretKey = bs58.encode(dappKeyPair.secretKey);
            
            // Store the secret key for when we return from Phantom
            localStorage.removeItem('dappSecretKey');
            localStorage.setItem('dappSecretKey', dappSecretKey);
            console.log('Stored dapp secret key for connection');
            
            const redirectLink = new URL(window.location.origin);
            const currentPage = sessionStorage.getItem('currentPage');
            if (currentPage) {
                redirectLink.searchParams.set('return_page', currentPage);
            }

            const params = new URLSearchParams({
                dapp_encryption_public_key: dappPublicKey,
                cluster: 'mainnet-beta',
                app_url: window.location.origin,
                redirect_link: redirectLink.toString(),
            });
            
            const url = `https://phantom.app/ul/v1/connect?${params.toString()}`;
            console.log('Redirecting to Phantom with URL:', url);
            
            // Add a small delay to ensure localStorage is written
            setTimeout(() => {
                window.location.href = url;
            }, 100);
            
        } catch (e) {
            console.error("Failed to prepare for mobile connection:", e);
            setError("Could not initiate connection. Please refresh and try again.");
            setStatus('error');
            localStorage.removeItem('dappSecretKey');
        }
    } else {
        if (!isPhantomInstalled) {
            window.open('https://phantom.app/', '_blank');
        } else {
             setError('Phantom wallet is installed but could not be reached. Please refresh the page.');
             setStatus('error');
        }
    }

  }, [provider, isPhantomInstalled]);
  
  const disconnect = useCallback(async () => {
    if (provider) {
        await provider.disconnect();
    }
    // Clean up any stored keys
    localStorage.removeItem('dappSecretKey');
    setPublicKey(null);
    setStatus('disconnected');
    setError(null);
    setBalances({ sol: 0, kingley: 0 });
  }, [provider]);

  const updateBalances = useCallback((newBalances: Balances) => {
    setBalances(newBalances);
  }, []);

  const value: WalletState = {
    publicKey,
    balances,
    isConnected: status === 'connected' && !!publicKey,
    isPhantomInstalled,
    status,
    error,
    connect,
    disconnect,
    updateBalances,
  };

  return React.createElement(WalletContext.Provider, { value: value }, children);
};

export const useWallet = (): WalletState => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
