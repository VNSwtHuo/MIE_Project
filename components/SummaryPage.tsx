'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, Clock, TrendingUp, BarChart3, X } from 'lucide-react';

interface Answer {
  imageId: string;
  userAnswer: boolean;
  correctAnswer: boolean;
  responseTime: number;
  isCorrect: boolean;
}

interface ImageData {
  id: string;
  url: string;
  isAIGenerated: boolean;
}

interface SummaryPageProps {
  answers: Answer[];
  images: ImageData[];
  consented: boolean;
  mode1First: boolean;
  onRestart: () => void;
}

export function SummaryPage({ answers, images, consented, mode1First, onRestart }: SummaryPageProps) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);
  
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter(a => a.isCorrect).length;
  const accuracy = (correctAnswers / totalQuestions) * 100;
  const averageResponseTime = answers.reduce((sum, a) => sum + a.responseTime, 0) / totalQuestions;

  // Split answers by set
  const firstSetAnswers = answers.slice(0, 10);
  const secondSetAnswers = answers.slice(10, 20);

  const firstSetAccuracy = (firstSetAnswers.filter(a => a.isCorrect).length / firstSetAnswers.length) * 100;
  const secondSetAccuracy = (secondSetAnswers.filter(a => a.isCorrect).length / secondSetAnswers.length) * 100;

  const firstSetMode = mode1First ? 'Mode 1 (Immediate Feedback)' : 'Mode 2 (Batch Feedback)';
  const secondSetMode = mode1First ? 'Mode 2 (Batch Feedback)' : 'Mode 1 (Immediate Feedback)';

  // Calculate average time by mode
  const mode1Answers = mode1First ? firstSetAnswers : secondSetAnswers;
  const mode2Answers = mode1First ? secondSetAnswers : firstSetAnswers;
  const mode1AvgTime = mode1Answers.reduce((sum, a) => sum + a.responseTime, 0) / mode1Answers.length;
  const mode2AvgTime = mode2Answers.reduce((sum, a) => sum + a.responseTime, 0) / mode2Answers.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6">
          <h1 className="text-3xl mb-2 text-gray-900">Study Complete!</h1>
          <p className="text-gray-600 mb-6">Thank you for participating in our research.</p>

          {/* Data Collection Notice */}
          <div className={`mb-8 p-4 rounded-lg border-2 ${
            consented 
              ? 'bg-green-50 border-green-300' 
              : 'bg-gray-50 border-gray-300'
          }`}>
            {consented ? (
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-base text-gray-900 mb-1">Data Collection Consent Granted</h3>
                  <p className="text-sm text-gray-700">
                    Your anonymous performance data has been recorded for research purposes. 
                    This data will not be associated with any individual and will only be used 
                    to understand patterns in AI image detection.
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-3">
                <XCircle className="w-6 h-6 text-gray-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-base text-gray-900 mb-1">No Data Collection</h3>
                  <p className="text-sm text-gray-700">
                    As per your choice, no data from this session has been collected or stored.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Overall Performance */}
          <div className="mb-8">
            <h2 className="text-2xl mb-4 text-gray-900 flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Your Performance
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-indigo-50 rounded-lg p-6 text-center">
                <div className="text-3xl text-indigo-600 mb-2">
                  {accuracy.toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Overall Accuracy</div>
                <div className="text-xs text-gray-500 mt-1">
                  {correctAnswers} / {totalQuestions} correct
                </div>
              </div>

              <div className="bg-purple-50 rounded-lg p-6 text-center">
                <div className="text-3xl text-purple-600 mb-2">
                  {(averageResponseTime / 1000).toFixed(1)}s
                </div>
                <div className="text-sm text-gray-600">Avg Response Time</div>
                <div className="text-xs text-gray-500 mt-1">
                  per image
                </div>
              </div>

              <div className="bg-teal-50 rounded-lg p-6 text-center">
                <div className="text-3xl text-teal-600 mb-2">
                  {mode1First ? '1→2' : '2→1'}
                </div>
                <div className="text-sm text-gray-600">Mode Order</div>
                <div className="text-xs text-gray-500 mt-1">
                  {mode1First ? 'Immediate then Batch' : 'Batch then Immediate'}
                </div>
              </div>
            </div>
          </div>

          {/* Performance by Mode */}
          <div className="mb-8">
            <h2 className="text-xl mb-4 text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Performance by Feedback Mode
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-5 border border-blue-200">
                <h3 className="text-lg text-gray-900 mb-3">Images 1-10</h3>
                <div className="text-xl text-indigo-600 mb-1">
                  {Math.round(firstSetAccuracy)}% accuracy
                </div>
                <div className="text-xl text-purple-600 mb-1">
                  {((mode1First ? mode1AvgTime : mode2AvgTime) / 1000).toFixed(1)}s Avg Response Time
                </div>
                <div className="text-xl text-teal-600">
                  {firstSetMode}
                </div>
              </div>

              <div className="bg-pink-50 rounded-lg p-5 border border-pink-200">
                <h3 className="text-lg text-gray-900 mb-3">Images 11-20</h3>
                <div className="text-xl text-indigo-600 mb-1">
                  {Math.round(secondSetAccuracy)}% accuracy
                </div>
                <div className="text-xl text-purple-600 mb-1">
                  {((mode1First ? mode2AvgTime : mode1AvgTime) / 1000).toFixed(1)}s Avg Response Time
                </div>
                <div className="text-xl text-teal-600">
                  {secondSetMode}
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Results */}
          <div className="mb-6">
            <h2 className="text-xl mb-2 text-gray-900">Detailed Results</h2>
            <p className="text-sm text-gray-600 mb-4">Click on any image to enlarge</p>
            
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {answers.map((answer, index) => {
                const imageData = images.find(img => img.id === answer.imageId);
                return (
                  <div
                    key={answer.imageId}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      answer.isCorrect
                        ? 'bg-green-50 border border-green-200'
                        : 'bg-red-50 border border-red-200'
                    }`}
                  >
                    {/* Image Thumbnail - Clickable */}
                    {imageData && (
                      <img
                        src={imageData.url}
                        alt={`Image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setEnlargedImage(imageData.url)}
                      />
                    )}
                    
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {answer.isCorrect ? (
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                        ) : (
                          <XCircle className="w-5 h-5 text-red-600" />
                        )}
                        <div>
                          <p className="text-sm text-gray-900">
                            Image #{index + 1}
                          </p>
                          <p className="text-xs text-gray-600">
                            {answer.correctAnswer ? 'AI-Generated' : 'Real Photo'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          {(answer.responseTime / 1000).toFixed(1)}s
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <button
            onClick={onRestart}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg transition-colors"
          >
            Start New Study
          </button>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>Thank you for contributing to AI research!</p>
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