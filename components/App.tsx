"use client";

import { useState, useEffect } from "react";
import { StartPage } from "./StartPage";
import { InstructionPage } from "./InstructionPage";
import { ImageEvaluationPage } from "./ImageEvaluationPage";
import { SummaryPage } from "./SummaryPage";
import { getRandomImages, ImageData } from "@/lib/imageDataset";
import { auth } from "@/lib/firebase";
import { signInAnonymously } from "firebase/auth";
import { saveQuizDataToFirebase } from "@/lib/quizSave";
import { Answer } from "@/lib/quizStatistics";

type Phase = "start" | "instruction" | "evaluation" | "summary";

export default function App() {
  const [phase, setPhase] = useState<Phase>("start");
  const [consented, setConsented] = useState<boolean>(false);
  const [selectedImages, setSelectedImages] = useState<ImageData[]>([]);
  const [mode1First, setMode1First] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const init = async () => {
      await signInAnonymously(auth);
      if (auth.currentUser) {
        setUserId(auth.currentUser.uid);
      }
    };
    init();
  }, []);

  const handleStart = (consentGiven: boolean) => {
    setConsented(consentGiven);
    setPhase("instruction");
  };

  const handleBeginQuiz = () => {
    // Select 20 random images
    const images = getRandomImages(20);
    setSelectedImages(images);

    // Randomly determine mode order
    const randomMode = Math.random() < 0.5;
    setMode1First(randomMode);

    // Move to evaluation phase
    setPhase("evaluation");
  };

  const handleEvaluationComplete = async (completedAnswers: Answer[]) => {
    setAnswers(completedAnswers);

    // Save data to Firebase if user consented
    if (consented && userId) {
      try {
        const detailedAnswers = completedAnswers.map((a) => ({
          imageId: a.imageId,
          userAnswer: a.userAnswer ? "Fake" : "Real",
          correctAnswer: a.correctAnswer ? "Fake" : "Real",
          isCorrect: a.isCorrect ? 1 : 0,
          responseTime: a.responseTime / 1000, // convert to seconds
          mode: a.mode, // true = with feedback, false = without feedback
        }));

        await saveQuizDataToFirebase(userId, detailedAnswers, !mode1First);
        console.log("Quiz data successfully saved to Firebase");
      } catch (error) {
        console.error("Failed to save quiz data:", error);
      }
    }

    setPhase("summary");
  };

  const handleRestart = () => {
    setPhase("start");
    setConsented(false);
    setSelectedImages([]);
    setMode1First(false);
    setAnswers([]);
  };

  return (
    <>
      {phase === "start" && <StartPage onStart={handleStart} />}

      {phase === "instruction" && <InstructionPage onBegin={handleBeginQuiz} />}

      {phase === "evaluation" && (
        <ImageEvaluationPage
          images={selectedImages}
          mode1First={mode1First}
          onComplete={handleEvaluationComplete}
        />
      )}

      {phase === "summary" && (
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
