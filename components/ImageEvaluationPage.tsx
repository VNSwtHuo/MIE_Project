"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, XCircle, Clock, X, Timer } from "lucide-react";
import { ImageData } from "@/lib/imageDataset";
import { Answer, formatTimeMMSS } from "@/lib/quizStatistics";

interface ImageEvaluationPageProps {
  images: ImageData[];
  mode1First: boolean;
  onComplete: (answers: Answer[]) => void;
}

export function ImageEvaluationPage({
  images,
  mode1First,
  onComplete,
}: ImageEvaluationPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [inlineFeedback, setInlineFeedback] = useState<Answer | null>(null);
  // const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isTimerPaused, setIsTimerPaused] = useState<boolean>(false);

  const currentImage = images[currentIndex];
  const totalImages = images.length;

  // Determine current mode
  const getCurrentMode = () => {
    if (currentIndex < 10) {
      return mode1First ? 1 : 2;
    } else {
      return mode1First ? 2 : 1;
    }
  };

  const currentMode = getCurrentMode();

  const moveToNext = (finalAnswers?: Answer[]) => {
    setInlineFeedback(null);
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsTimerPaused(false);

    if (currentIndex < totalImages - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Study complete
      onComplete(finalAnswers || answers);
    }
  };

  useEffect(() => {
    setStartTime(Date.now());
    setInlineFeedback(null);
    setElapsedTime(0);
  }, [currentIndex]);

  // Timer update (updates every 10ms to show milliseconds)
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTimerPaused) {
        setElapsedTime(Date.now() - startTime);
      }
    }, 10);

    return () => clearInterval(timer);
  }, [startTime, isTimerPaused]);

  const handleAnswer = (userAnswer: boolean) => {
    // Pause the timer immediately when user answers
    setIsTimerPaused(true);

    const responseTime = Date.now() - startTime;
    const isCorrect = userAnswer === currentImage.isAIGenerated;

    const answer: Answer = {
      imageId: currentImage.id,
      userAnswer,
      correctAnswer: currentImage.isAIGenerated,
      responseTime,
      isCorrect,
      mode: currentMode === 1, // true = with feedback (Mode 1), false = without feedback (Mode 2)
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentMode === 1) {
      // Mode 1: Show inline feedback
      setInlineFeedback(answer);
    } else {
      // Mode 2: No feedback, move to next image immediately
      moveToNext(newAnswers);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7E6C4]/30 flex items-center justify-center p-4">
      <div className="max-w-7xl w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-black font-bold">Image Evaluation</h2>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <p className="text-md text-black">
                  {currentIndex < 10 ? "First set" : "Second set"} •{" "}
                  {currentMode === 1 ? "With feedback" : "No feedback"}
                </p>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                <Timer className="w-5 h-5" />
                <span className="text-md font-mono text-black">
                  {formatTimeMMSS(elapsedTime)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-[#F1C376] h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentIndex + 1) / totalImages) * 100}%`,
                }}
              />
            </div>
            <span className="text-md text-black">
              {currentIndex + 1} / {totalImages}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <img
            src={currentImage.url}
            alt={`Image ${currentIndex + 1}`}
            className="bg-white w-full max-h-[65vh] object-contain rounded-lg shadow-md"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg text-black font-bold text-center">
            Is this image AI-generated or a real photograph?
          </h3>

          {!inlineFeedback ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => handleAnswer(false)}
                className="bg-[#606C5D] hover:bg-[#606C5D]/80 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              >
                REAL!
              </button>

              <button
                onClick={() => handleAnswer(true)}
                className="bg-[#9E3B3B] hover:bg-[#9E3B3B]/80 text-white font-bold py-4 px-6 rounded-lg transition-colors"
              >
                AI-GENERATED!
              </button>
            </div>
          ) : (
            <div
              className={`p-6 rounded-lg border-2 ${
                inlineFeedback.isCorrect
                  ? "bg-[#6CA651]/30 border-[#6CA651]"
                  : "bg-[#9E3B3B]/30 border-[#9E3B3B]"
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  {inlineFeedback.isCorrect ? (
                    <CheckCircle2 className="w-8 h-8 text-[#6CA651] flex-shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-[#9E3B3B] flex-shrink-0" />
                  )}
                  <div>
                    <p
                      className={`text-lg ${inlineFeedback.isCorrect ? "text-[#6CA651]" : "text-[#9E3B3B]"} font-bold`}
                    >
                      {inlineFeedback.isCorrect ? "Correct!" : "Incorrect"}
                    </p>
                    <p className="text-sm text-gray-700">
                      This image is{" "}
                      {inlineFeedback.correctAnswer
                        ? "AI-Generated"
                        : "a Real Photo"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={moveToNext}
                  className="bg-[#F1C376] hover:bg-[#F1C376]/70 text-[#7B542F] font-bold py-3 px-12 rounded-lg transition-colors whitespace-nowrap md:w-auto w-full"
                >
                  {currentIndex < totalImages - 1 ? "Next" : "View Results"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enlarged Image Modal
      {enlargedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setEnlargedImage(null)}
        >
          <div
            className="relative bg-white rounded-lg p-4 max-w-5xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setEnlargedImage(null)}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-10"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
            <img
              src={enlargedImage}
              alt="Enlarged view"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )} */}
    </div>
  );
}
