import React from 'react';
import { Page } from '../types';
import Card from '../components/Card';
import Button from '../components/Button';

interface SixStepsPageProps {
  navigateTo: (page: Page) => void;
}

const StepCard: React.FC<{
  stepNumber: number;
  title: string;
  image: string;
  description: string;
}> = ({ stepNumber, title, image, description }) => (
  <Card className="text-center h-full flex flex-col">
    <div className="relative mb-4">
      <div className="absolute -top-3 -left-3 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center font-bold text-lg z-10">
        {stepNumber}
      </div>
      <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
    <div className="flex-grow flex flex-col">
      <h3 className="text-lg font-bold text-black mb-3 leading-tight">
        {title.split('\n').map((line, index) => (
          <span key={index}>
            {line}
            {index < title.split('\n').length - 1 && <br />}
          </span>
        ))}
      </h3>
      <p className="text-gray-700 text-sm leading-relaxed flex-grow">{description}</p>
    </div>
  </Card>
);

const steps = [
  {
    title: "Plan Your Mission",
    image: "https://i.imgur.com/dWNjfYw.jpg",
    description: "Choose your act of kindness. Keep it simple, real, and meaningful."
  },
  {
    title: "Partner With a Business\n(Optional / Recommended)",
    image: "https://i.imgur.com/xfhNdBX.jpg",
    description: "Approach a local business, secure a small freebie or discount, and set the stage."
  },
  {
    title: "Perform the Act",
    image: "https://i.imgur.com/mBNNGdu.jpg",
    description: "Deliver the kindness. Surprise and delight someone in the real world."
  },
  {
    title: "Capture & Share",
    image: "https://i.imgur.com/HJsjuXC.jpg",
    description: "Record the reaction (with permission). Keep it short, vertical, and authentic."
  },
  {
    title: "Submit to $RWPOV Missions (Telegram)",
    image: "https://i.imgur.com/3KSM05w.jpg",
    description: "Upload your video via Telegram. Your proof fuels the movement."
  },
  {
    title: "Seed $RWPOV, Recruit a TR!BE Member",
    image: "https://i.imgur.com/rPjc1O8.jpg",
    description: "Gift $RWPOV tokens to the recipient, expand the TR!BE, and grow real-world value."
  }
  {
    title: "Seed $RWPOV, Put Value On-Chain\nRecruit a TR!BE Member",
    image: "https://i.imgur.com/rPjc1O8.jpg",
    description: "Gift $RWPOV tokens to the recipient, expand the TR!BE, and grow real-world value."
  }
];

const SixStepsPage: React.FC<SixStepsPageProps> = ({ navigateTo }) => {
  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <header className="text-center">
        <h1 className="text-3xl md:text-4xl font-bold font-serif text-black mb-4">
          How It Works: 6 Steps to Success:<br />
          Build a Better Human Experience
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Transform acts of kindness into lasting value. Here's your complete guide to creating 
          Real World Proof of Value and growing the KINGLEY TR!BE.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <StepCard
            key={index}
            stepNumber={index + 1}
            title={step.title}
            image={step.image}
            description={step.description}
          />
        ))}
      </div>

      <div className="text-center pt-8">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={() => navigateTo(Page.RECRUIT)}
            className="text-lg flex items-center justify-center space-x-2"
          >
            <span>👉</span>
            <span>Start Your Mission</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SixStepsPage;