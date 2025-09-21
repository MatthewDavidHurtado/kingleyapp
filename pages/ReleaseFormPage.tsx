import React from 'react';
import Card from '../components/Card';
import Button from '../components/Button';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-xl font-bold font-serif text-black mb-3 mt-6 first:mt-0">{children}</h3>
);

const FormSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mt-4">
        <h4 className="font-bold text-black mb-2">{title}</h4>
        <div className="text-gray-700 space-y-2">{children}</div>
    </div>
);

const ReleaseFormPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 text-gray-800">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-black mb-2">Media Release Form</h1>
                <p className="text-lg text-gray-600">Get legal consent for your #ProofOfValor footage with our interactive form.</p>
            </header>

            <Card className="text-center">
                <p className="text-gray-700 mb-6">
                    Use our interactive online form to create, fill out, and get signatures on media release forms. 
                    You can download the completed PDF directly from the app.
                </p>
                <a
                    href="https://interactive-media-release-form-779946580524.us-west1.run.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-center font-bold py-4 px-8 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900 text-lg"
                >
                    Online Media Release Form App
                </a>
                <p className="text-sm text-gray-500 mt-4">
                    Fill it out, have it signed, and download the PDF right from the app.
                </p>
            </Card>
        </div>
    );
};

export default ReleaseFormPage;