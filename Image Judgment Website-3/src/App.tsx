import React, { useState } from 'react';
import { StartPage } from './components/StartPage';
import { InstructionPage } from './components/InstructionPage';
import { ImageEvaluationPage } from './components/ImageEvaluationPage';
import { SummaryPage } from './components/SummaryPage';
import { getRandomImages, ImageData } from './data/imageDataset';

type Phase = 'start' | 'instruction' | 'evaluation' | 'summary';

interface Answer {
  imageId: string;
  userAnswer: boolean;
  correctAnswer: boolean;
  responseTime: number;
  isCorrect: boolean;
}

export default function App() {
  const [phase, setPhase] = useState<Phase>('start');
  const [consented, setConsented] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const [mode1First, setMode1First] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleStart = (consentGiven: boolean) => {
    setConsented(consentGiven);
    setPhase('instruction');
  };

  const handleBeginQuiz = () => {
    // Select 20 random images
    const images = getRandomImages(20);
    setSelectedImages(images);
    
    // Randomly determine mode order
    const randomMode = Math.random() < 0.5;
    setMode1First(randomMode);
    
    // Move to evaluation phase
    setPhase('evaluation');
  };

  const handleEvaluationComplete = (completedAnswers: Answer[]) => {
    setAnswers(completedAnswers);
    
    // Simulate saving data to backend if user consented
    if (consented) {
      const totalQuestions = completedAnswers.length;
      const correctAnswers = completedAnswers.filter(a => a.isCorrect).length;
      const accuracy = (correctAnswers / totalQuestions) * 100;
      const averageResponseTime = completedAnswers.reduce((sum, a) => sum + a.responseTime, 0) / totalQuestions;
      
      const dataToSave = {
        accuracy: accuracy.toFixed(2),
        averageResponseTime: (averageResponseTime / 1000).toFixed(2),
        mode1First,
        timestamp: new Date().toISOString(),
        totalQuestions,
        correctAnswers
      };
      
      console.log('Data that would be saved to backend:', dataToSave);
      // In a real implementation with backend, you would send this data to your server/database
    }
    
    setPhase('summary');
  };

  const handleRestart = () => {
    setPhase('start');
    setConsented(false);
    setSelectedImages([]);
    setMode1First(false);
    setAnswers([]);
  };

  return (
    <>
      {phase === 'start' && (
        <StartPage onStart={handleStart} />
      )}
      
      {phase === 'instruction' && (
        <InstructionPage onBegin={handleBeginQuiz} />
      )}
      
      {phase === 'evaluation' && (
        <ImageEvaluationPage
          images={selectedImages}
          mode1First={mode1First}
          onComplete={handleEvaluationComplete}
        />
      )}
      
      {phase === 'summary' && (
        <SummaryPage
          answers={answers}
          images={selectedImages}
          consented={consented}
          mode1First={mode1First}
          onRestart={handleRestart}
        />
      )}
    </>
  );
}