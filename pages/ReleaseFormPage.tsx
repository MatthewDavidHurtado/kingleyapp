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
                <p className="text-lg text-gray-600">A general template to secure legal consent for your #ProofOfValor footage.</p>
            </header>

            <Card>
                <SectionTitle>GENERAL MEDIA RELEASE AND LICENSE AGREEMENT</SectionTitle>
                <p className="text-sm text-gray-500">Project: The KINGLEY Project (#ProofOfValor Initiative)</p>
                <p className="text-sm text-gray-500">Date: [Date of Recording]</p>

                <FormSection title="1. PARTIES:">
                    <p>This Release Agreement ("Agreement") is between:</p>
                    <p className="pl-4"><strong>The Participant:</strong> [Full Name of Participant] ("Participant")</p>
                    <p className="pl-4">and</p>
                    <p className="pl-4"><strong>The Producer:</strong> [Your Name/Your LLC Name], ("Producer"), creator of The KINGLEY Project.</p>
                </FormSection>

                <FormSection title="2. PURPOSE:">
                    <p>Participant agrees to the creation of photographs, video footage, and audio recordings (the "Recordings") during a Random Act of Kindness and grants Producer rights to use them as detailed below.</p>
                </FormSection>

                <FormSection title="3. GRANT OF RIGHTS:">
                    <p>In exchange for the Participant's participation and other valuable consideration, the receipt of which is acknowledged, Participant hereby grants Producer the irrevocable, perpetual, worldwide, and royalty-free right to:</p>
                    <ul className="list-disc pl-8 space-y-1">
                        <li>Use, reproduce, distribute, and display the Recordings.</li>
                        <li>Use Participant's name, image, likeness, voice, and statements contained in the Recordings.</li>
                        <li>Edit, modify, or alter the Recordings at Producer's sole discretion.</li>
                        <li>Use the Recordings for any purpose related to the promotion, advertising, and marketing of The KINGLEY Project and its associated initiatives, including but not a limited to websites, social media, livestreams, promotional materials, and press releases.</li>
                    </ul>
                </FormSection>

                <FormSection title="4. NO COMPENSATION:">
                    <p>Participant understands and agrees that they will receive no monetary compensation for the creation or use of the Recordings. Participation is voluntary.</p>
                </FormSection>
                
                <FormSection title="5. REPRESENTATIONS AND WARRANTIES:">
                     <p>Participant is over the age of 18 and has the full legal right and authority to grant this release. If Participant is under 18, a parent or legal guardian must sign below.</p>
                </FormSection>

                <FormSection title="6. GOVERNING LAW:">
                    <p>This Agreement shall be governed by the laws of the State of [Your State/Country].</p>
                </FormSection>

                <FormSection title="7. ENTIRE AGREEMENT:">
                    <p>This document constitutes the entire agreement between the parties concerning its subject matter.</p>
                </FormSection>

                <div className="border-t border-gray-200 my-6"></div>

                <FormSection title="PARTICIPANT CONSENT:">
                    <p>By signing below, I acknowledge that I have read and fully understand this release. I agree to its terms voluntarily.</p>
                    <div className="font-mono mt-4 space-y-3 text-sm">
                        <p>Participant's Printed Name: _________________________</p>
                        <p>Participant's Signature:   _________________________</p>
                        <p>Date:                      _________________________</p>
                        <p>Participant's Phone Number (Optional): ______________</p>
                    </div>
                </FormSection>
                
                <FormSection title="For Participants Under 18 Years of Age:">
                    <p>I am the parent or legal guardian of the minor named above. I have read this release and approve of its terms, and I hereby give my consent to the foregoing on behalf of the minor.</p>
                    <div className="font-mono mt-4 space-y-3 text-sm">
                         <p>Parent/Guardian's Printed Name: _________________________</p>
                         <p>Parent/Guardian's Signature:   _________________________</p>
                         <p>Date:                          _________________________</p>
                    </div>
                </FormSection>
            </Card>

            <Card>
                <SectionTitle>How to Use This Template</SectionTitle>
                <div className="my-6 text-center">
                    <a
                        href="https://drive.google.com/file/d/1WoPkpz-COHx86zX88xuDAn_6prdcIPLE/view?usp=sharing"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block w-full text-center font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white bg-gray-900 text-white hover:bg-gray-700 focus:ring-gray-900"
                    >
                        Download Your Form
                    </a>
                    <p className="text-sm text-gray-500 mt-2">All you have to do is print this and fill it in.</p>
                </div>
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li><strong>Fill in the Blanks:</strong> Complete the [Date of Recording], [Your Name/Your LLC Name], and [Your State/Country] fields. Using an LLC for your project is highly recommended for liability protection.</li>
                    <li><strong>Digital or Physical:</strong> Have this form ready on your phone as a PDF or use a note-taking app that allows for digital signatures (like Adobe Fill & Sign or DocuSign). You can also carry printed copies.</li>
                    <li><strong>The Pitch:</strong> After the act of kindness, say: "This was amazing! We're documenting these moments to inspire a movement. Would you be willing to sign a quick release form so we can share your smile with the world? It just gives us your official permission."</li>
                    <li><strong>Store Securely:</strong> Keep all signed release forms organized and secure. They are your legal protection.</li>
                </ul>
            </Card>

            <Card className="border-yellow-300 bg-yellow-50">
                 <p className="text-yellow-900"><strong className="font-bold">Disclaimer:</strong> This is a general template and may not suit all situations or jurisdictions. It is strongly recommended that you have this template reviewed by a legal professional to ensure it is enforceable and covers all necessary aspects for your specific project and location.</p>
            </Card>

        </div>
    );
};

export default ReleaseFormPage;