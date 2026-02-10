import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, Clock, X, Timer } from 'lucide-react';
import { ImageData } from '../data/imageDataset';

interface Answer {
  imageId: string;
  userAnswer: boolean;
  correctAnswer: boolean;
  responseTime: number; // in milliseconds
  isCorrect: boolean;
}

interface PendingAnswer extends Answer {
  imageUrl: string;
}

interface ImageEvaluationPageProps {
  images: ImageData[];
  mode1First: boolean;
  onComplete: (answers: Answer[]) => void;
}

export function ImageEvaluationPage({ images, mode1First, onComplete }: ImageEvaluationPageProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [showFeedback, setShowFeedback] = useState(false);
  const [pendingAnswers, setPendingAnswers] = useState<PendingAnswer[]>([]);
  const [showBatchFeedback, setShowBatchFeedback] = useState(false);
  const [inlineFeedback, setInlineFeedback] = useState<Answer | null>(null);
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
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

  const moveToNext = () => {
    setShowFeedback(false);
    setInlineFeedback(null);
    setStartTime(Date.now());
    setElapsedTime(0);
    setIsTimerPaused(false);
    
    if (currentIndex < totalImages - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Study complete
      onComplete(answers);
    }
  };

  const closeBatchFeedback = () => {
    setShowBatchFeedback(false);
    setPendingAnswers([]);
    moveToNext();
  };

  useEffect(() => {
    setStartTime(Date.now());
    setInlineFeedback(null);
    setElapsedTime(0);
  }, [currentIndex]);

  // Timer update
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTimerPaused) {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }
    }, 1000);
    
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
      isCorrect
    };

    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);

    if (currentMode === 1) {
      // Mode 1: Show inline feedback
      setInlineFeedback(answer);
    } else {
      // Mode 2: Batch feedback after 5 images
      const pendingAnswer: PendingAnswer = {
        ...answer,
        imageUrl: currentImage.url
      };
      const newPending = [...pendingAnswers, pendingAnswer];
      setPendingAnswers(newPending);
      
      // Check if we've completed 5 images in the current set
      const indexInCurrentSet = currentIndex % 10;
      if (indexInCurrentSet === 4 || indexInCurrentSet === 9) {
        // Show batch feedback for the last 5 images
        setShowBatchFeedback(true);
      } else {
        // Move to next image immediately
        moveToNext();
      }
    }
  };

  if (showBatchFeedback) {
    return (
      <>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl mb-2 text-gray-900">Feedback for Last 5 Images</h2>
            <p className="text-sm text-gray-600 mb-6">Click on any image to enlarge</p>
            
            <div className="space-y-4 mb-6">
              {pendingAnswers.map((answer, idx) => (
                <div
                  key={answer.imageId}
                  className={`flex gap-4 p-4 rounded-lg border-2 ${
                    answer.isCorrect
                      ? 'bg-green-50 border-green-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  {/* Image Thumbnail - Clickable */}
                  <img
                    src={answer.imageUrl}
                    alt={`Image ${currentIndex - pendingAnswers.length + idx + 1}`}
                    className="w-24 h-24 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setEnlargedImage(answer.imageUrl)}
                  />
                  
                  {/* Feedback Content */}
                  <div className="flex-1 flex items-center">
                    <div className="flex items-center gap-3">
                      {answer.isCorrect ? (
                        <CheckCircle2 className="w-6 h-6 text-green-600" />
                      ) : (
                        <XCircle className="w-6 h-6 text-red-600" />
                      )}
                      <div>
                        <p className="text-gray-900">
                          Image #{currentIndex - pendingAnswers.length + idx + 2}
                        </p>
                        <p className="text-sm text-gray-600">
                          {answer.correctAnswer ? 'AI-Generated' : 'Real Photo'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={closeBatchFeedback}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-colors"
            >
              Continue
            </button>
          </div>
        </div>

        {/* Enlarged Image Modal for Batch Feedback */}
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
        )}
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl text-gray-900">Image Evaluation</h2>
            <div className="flex items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span className="text-sm">Mode {currentMode}</span>
              </div>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-lg">
                <Timer className="w-5 h-5" />
                <span className="text-sm font-mono">{Math.floor(elapsedTime / 60)}:{String(elapsedTime % 60).padStart(2, '0')}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 mb-2">
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / totalImages) * 100}%` }}
              />
            </div>
            <span className="text-sm text-gray-600">
              {currentIndex + 1} / {totalImages}
            </span>
          </div>
          
          <p className="text-sm text-gray-600">
            {currentIndex < 10 ? 'First set' : 'Second set'} • {currentMode === 1 ? 'Immediate feedback' : 'Batch feedback'}
          </p>
        </div>

        <div className="mb-6">
          <img
            src={currentImage.url}
            alt={`Image ${currentIndex + 1}`}
            className="w-full max-h-[60vh] object-contain rounded-lg shadow-md"
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg text-gray-900 text-center">
            Is this image AI-generated or a real photograph?
          </h3>

          {!inlineFeedback ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Swapped positions: Real Photo (green) on left, AI-Generated (red) on right */}
              <button
                onClick={() => handleAnswer(false)}
                className="bg-green-600 hover:bg-green-700 text-white py-4 px-6 rounded-lg transition-colors"
              >
                Real Photo
              </button>

              <button
                onClick={() => handleAnswer(true)}
                className="bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-lg transition-colors"
              >
                AI-Generated
              </button>
            </div>
          ) : (
            <div className={`p-6 rounded-lg border-2 ${
              inlineFeedback.isCorrect 
                ? 'bg-green-50 border-green-300' 
                : 'bg-red-50 border-red-300'
            }`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-3">
                  {inlineFeedback.isCorrect ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                  )}
                  <div>
                    <p className={`text-lg ${inlineFeedback.isCorrect ? 'text-green-900' : 'text-red-900'}`}>
                      {inlineFeedback.isCorrect ? 'Correct!' : 'Incorrect'}
                    </p>
                    <p className="text-sm text-gray-700">
                      This image is {inlineFeedback.correctAnswer ? 'AI-Generated' : 'a Real Photo'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={moveToNext}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-colors whitespace-nowrap md:w-auto w-full"
                >
                  {currentIndex < totalImages - 1 ? 'Next' : 'View Results'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Enlarged Image Modal */}
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
      )}
    </div>
  );
}