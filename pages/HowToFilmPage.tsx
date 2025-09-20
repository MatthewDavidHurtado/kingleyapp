
import React from 'react';
import Card from '../components/Card';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h3 className="text-xl font-bold font-serif text-black mb-3 mt-6 first:mt-0">{children}</h3>
);

const SubHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <h4 className="font-bold text-black mt-4 mb-2">{children}</h4>
);

const ListItem: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <li className="ml-4 mb-2 list-disc">{children}</li>
);


const HowToFilmPage: React.FC = () => {
    return (
        <div className="max-w-4xl mx-auto space-y-8 text-gray-800">
            <header className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold font-serif text-black mb-2">How to Film Your Valor</h1>
                <p className="text-lg text-gray-600">The definitive checklist to legally and ethically capture #ProofOfValor footage.</p>
            </header>

            <Card>
                <SectionTitle>The Golden Rule</SectionTitle>
                <p className="italic">The act of kindness must be genuine. The footage is a documentation of a real moment, not the purpose of the act. If the camera wasn't there, would you still do it? If yes, you're on the right track.</p>

                <SectionTitle>The Pre-Act Checklist: The Legal Framework</SectionTitle>
                
                <SubHeading>Understand the Law:</SubHeading>
                <ul>
                    <ListItem><strong>Consent:</strong> This is the most important legal concept. You must have permission to film someone and use their likeness for a commercial purpose (which promoting a crypto token is).</ListItem>
                    <ListItem><strong>Expectation of Privacy:</strong> Laws vary by state/country, but generally, people have a reasonable expectation of privacy. Filming in a public place is more permissible, but publishing the footage widely is a different matter.</ListItem>
                </ul>

                <SubHeading>The Essential Tool: The Release Form</SubHeading>
                <p>You must have a simple, one-page document ready to go on your phone (as a PDF or note) or even physically printed.</p>
                <p className="mt-2"><strong>What it should say:</strong> It grants you permission to use the video/photograph and their likeness for promotional purposes related to the KINGLEY project across all media, worldwide, in perpetuity.</p>
                <p className="mt-2">It must include: Their printed name, signature, and the date. A line for their phone number/email is also good.</p>

            </Card>

            <Card>
                <SectionTitle>The On-The-Ground Protocol: How to Execute</SectionTitle>
                
                <SubHeading>Scenario A: The Ideal Approach (Full Consent)</SubHeading>
                <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Perform the Act First:</strong> Lead with the kindness, not the camera. Help the person. Create the genuine human connection first.</li>
                    <li><strong>The Pitch:</strong> After the act, explain. Use this script: <br/><em className="pl-4 block my-2 p-3 bg-gray-100 rounded-md">"What we're doing is trying to make acts of kindness like this go viral. We have a project that rewards people for this stuff. Would it be okay if we filmed a quick reaction from you to help inspire others? We'd love to share your smile."</em></li>
                    <li><strong>The Release:</strong> If they say yes, immediately pull out your phone and have them sign the digital release form. If they hesitate, do not film.</li>
                    <li><strong>The Shoot:</strong> Film the reaction. You can even film them signing the release to add to the authenticity of the video.</li>
                </ol>

                <SubHeading>Scenario B: The "Candid" Approach (Riskier)</SubHeading>
                 <ol className="list-decimal list-inside space-y-2">
                    <li><strong>Film from a Distance:</strong> Have a collaborator film the interaction from afar, focusing initially on your back and the act, not the recipient's identifiable face.</li>
                    <li><strong>Immediate Consent After:</strong> Immediately after the act, approach the person as in Scenario A. Explain the project and say: <br/><em className="pl-4 block my-2 p-3 bg-gray-100 rounded-md">"We actually captured that amazing moment on camera from afar. We would be honored to use it to spread this feeling. Would you be willing to sign a quick release form so we can share it?"</em></li>
                    <li><strong>The Choice:</strong> If they say no, you must delete the footage in front of them. This builds immense trust and shows you are ethical. If they say yes, you have gold.</li>
                </ol>
            </Card>

            <Card className="border-red-300 bg-red-50 text-red-900">
                <SectionTitle>Critical "Do Not" List</SectionTitle>
                <ul className="space-y-2">
                    <ListItem><strong>DO NOT</strong> secretly film people.</ListItem>
                    <ListItem><strong>DO NOT</strong> film children without explicit consent from their parent or guardian. This is a non-negotiable, ultra-high-risk area. Avoid it unless you can get clear guardian consent.</ListItem>
                    <ListItem><strong>DO NOT</strong> film people in vulnerable or compromising situations (e.g., homeless individuals, people in distress) without extreme sensitivity and clear consent. This can easily be seen as exploitative "poverty porn."</ListItem>
                    <ListItem><strong>DO NOT</strong> pressure anyone. A "no" is a no. Your integrity is more valuable than any piece of content.</ListItem>
                </ul>
            </Card>
            
            <Card>
                <SectionTitle>How to Mitigate Risk if You Can't Get a Signature</SectionTitle>
                <ul className="space-y-2">
                    <ListItem><strong>Blur Faces:</strong> Use editing software to blur the person's face and any identifying features (unique tattoos, license plates, etc.).</ListItem>
                    <ListItem><strong>Use Only Back Shots:</strong> Only film from behind the person.</ListItem>
                    <ListItem><strong>Use Audio Only:</strong> Record the audio of the interaction ("Thank you so much!") over footage of something else, like a KINGLEY token logo or a shot of the city.</ListItem>
                    <ListItem><strong>Re-enactments:</strong> If you have a great story but no footage, have a willing community member help you re-enact it later with a proper signed release.</ListItem>
                </ul>
            </Card>

            <Card>
                <SectionTitle>The Bottom Line</SectionTitle>
                <p>The most powerful content will come from people who are genuinely happy and have willingly agreed to be part of your mission. The process of getting consent itself can be a second act of kindness—it makes people feel respected and valued, not used.</p>
                <p className="mt-4">By having a release form ready and leading with respect, you protect yourself legally and build a foundation of trust that will make the KINGLEY project stronger and more authentic than any competitor.</p>
            </Card>

        </div>
    );
};

export default HowToFilmPage;