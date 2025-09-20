import React, { useState } from 'react';
import { COPY } from '../constants';
import { XIcon, XSocialIcon, TelegramIcon } from './icons';

const Modal: React.FC<{ title: string; children: React.ReactNode; closeModal: () => void }> = ({ title, children, closeModal }) => (
    <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4 animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full flex flex-col max-h-[90vh]">
            <div className="flex justify-between items-center p-4 border-b border-gray-200 sticky top-0 bg-white rounded-t-xl">
                <h2 className="text-xl font-bold font-serif text-black">{title}</h2>
                <button
                    onClick={closeModal}
                    className="p-1 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-100"
                    aria-label="Close"
                >
                    <XIcon className="w-6 h-6" />
                </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-4 text-left text-sm text-gray-700">
                {children}
            </div>
        </div>
    </div>
);

const Footer: React.FC = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  return (
    <>
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-8 text-center space-y-6">
          <p className="text-xs text-gray-500 max-w-4xl mx-auto">
            {COPY.DISCLAIMER}
          </p>
          
          <div className="flex justify-center items-center space-x-6">
            <a href="#" aria-label="X" className="text-gray-500 hover:text-black transition-colors">
              <XSocialIcon className="w-6 h-6" />
            </a>
            <a href="https://t.me/+NkMkrC7FPFs3OGIx" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="text-gray-500 hover:text-black transition-colors">
              <TelegramIcon className="w-6 h-6" />
            </a>
          </div>

          <div className="text-xs text-gray-500 space-y-3">
            <p>© 2025 KINGLEY / $RWPOV. All rights reserved.</p>
            <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
                <button onClick={() => setActiveModal('terms')} className="hover:text-black underline transition-colors">
                    Terms & Conditions
                </button>
                <button onClick={() => setActiveModal('privacy')} className="hover:text-black underline transition-colors">
                    Privacy Policy
                </button>
                <button onClick={() => setActiveModal('risk')} className="hover:text-black underline transition-colors">
                    Risk Disclosure
                </button>
                <button onClick={() => setActiveModal('guidelines')} className="hover:text-black underline transition-colors">
                    Community Guidelines
                </button>
            </div>
          </div>
        </div>
      </footer>
      
      {activeModal === 'terms' && (
        <Modal title="Terms & Conditions" closeModal={() => setActiveModal(null)}>
            <h3 className="font-bold text-black text-base">Acceptance of Terms</h3>
            <p>By accessing or using the KINGLEY / $RWPOV website, materials, or related services (the “Services”), you agree to be bound by these Terms and Conditions (“Terms”). If you do not agree, do not use the Services.</p>

            <h3 className="font-bold text-black text-base mt-4">Eligibility</h3>
            <p>You must be at least 18 years of age or the age of majority in your jurisdiction to participate in any KINGLEY or $RWPOV-related activities.</p>
            
            <h3 className="font-bold text-black text-base mt-4">Nature of $RWPOV</h3>
            <p>$RWPOV is a community-driven meme token created on pump.fun. It has no inherent financial value, is not an investment, and is not offered as a security, financial product, or guarantee of future profit.</p>
            
            <h3 className="font-bold text-black text-base mt-4">No Professional Advice</h3>
            <p>Nothing on this site constitutes financial, legal, tax, or investment advice. All participation is voluntary and undertaken at your own risk.</p>
            
            <h3 className="font-bold text-black text-base mt-4">User Conduct</h3>
            <p>You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
                <li>Misrepresent the nature of $RWPOV or KINGLEY.</li>
                <li>Use the Services for unlawful, harmful, or fraudulent purposes.</li>
                <li>Harass, abuse, or harm others within the community.</li>
            </ul>

            <h3 className="font-bold text-black text-base mt-4">Intellectual Property</h3>
            <p>All materials on this site, including text, graphics, logos, and design elements, are the property of KINGLEY / $RWPOV and protected by copyright law.</p>

            <h3 className="font-bold text-black text-base mt-4">Limitation of Liability</h3>
            <p>KINGLEY and $RWPOV, their creators, affiliates, and volunteers shall not be liable for any direct, indirect, incidental, or consequential damages from your use of the Services or participation in missions.</p>

            <h3 className="font-bold text-black text-base mt-4">Termination</h3>
            <p>We reserve the right to suspend or terminate access to the Services at any time for violations of these Terms.</p>

            <h3 className="font-bold text-black text-base mt-4">Governing Law</h3>
            <p>These Terms are governed by the laws of the State of [Insert State/Country].</p>
        </Modal>
      )}

      {activeModal === 'privacy' && (
        <Modal title="Privacy Policy" closeModal={() => setActiveModal(null)}>
            <h3 className="font-bold text-black text-base">Information We Collect</h3>
            <p>We may collect limited personal information (such as email addresses or social handles) voluntarily submitted by users for participation in missions, sign-ups, or newsletters. We do not sell or rent your personal information.</p>

            <h3 className="font-bold text-black text-base mt-4">Cookies & Analytics</h3>
            <p>We may use cookies or analytics tools to measure site performance and improve user experience. You may disable cookies in your browser settings.</p>
            
            <h3 className="font-bold text-black text-base mt-4">Use of Information</h3>
            <p>Information is used only for community engagement, mission coordination, and project updates.</p>
            
            <h3 className="font-bold text-black text-base mt-4">Third-Party Services</h3>
            <p>Links to third-party services (e.g., pump.fun, social media) are provided for convenience. We are not responsible for their privacy practices.</p>
            
            <h3 className="font-bold text-black text-base mt-4">Data Security</h3>
            <p>We take reasonable measures to protect your information but cannot guarantee absolute security.</p>
            
            <h3 className="font-bold text-black text-base mt-4">Your Rights</h3>
            <p>Depending on your jurisdiction, you may have rights to access, update, or delete your personal information. Contact us to exercise these rights.</p>
        </Modal>
      )}

      {activeModal === 'risk' && (
        <Modal title="Risk Disclosure" closeModal={() => setActiveModal(null)}>
            <p>Participation in KINGLEY and $RWPOV is experimental and community-driven. By engaging with this project, you acknowledge and accept the following:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>$RWPOV is not legal tender, investment advice, or a security.</li>
                <li>The token may have no market value and may never appreciate in value.</li>
                <li>Crypto assets are volatile and may be subject to loss, theft, or regulatory changes.</li>
                <li>All participation is voluntary and at your own risk.</li>
            </ul>
        </Modal>
      )}

      {activeModal === 'guidelines' && (
        <Modal title="Community Guidelines" closeModal={() => setActiveModal(null)}>
            <p>To preserve the integrity of KINGLEY and $RWPOV missions, participants agree to uphold the following:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
                <li>Acts of kindness must be genuine, safe, and respectful.</li>
                <li>No political, religious, or harmful messaging may be attached to missions.</li>
                <li>Consent must be obtained before filming or sharing images of individuals.</li>
                <li>No pump-and-dump schemes, false promises, or misrepresentations are permitted.</li>
                <li>Focus on spreading real value, human connection, and positivity.</li>
            </ul>
        </Modal>
      )}
    </>
  );
};

export default Footer;