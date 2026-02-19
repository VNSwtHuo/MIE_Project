"use client";

import React, { useState } from "react";
import {
  CheckCircle2,
  XCircle,
  Clock,
  TrendingUp,
  BarChart3,
  X,
} from "lucide-react";
import {
  Answer,
  calculateOverallStats,
  calculateModeStats,
  getModeName,
  formatTimeSeconds,
} from "@/lib/quizStatistics";

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

export function SummaryPage({
  answers,
  images,
  consented,
  mode1First,
  onRestart,
}: SummaryPageProps) {
  const [enlargedImage, setEnlargedImage] = useState<string | null>(null);

  // Calculate overall statistics
  const { totalQuestions, correctAnswers, accuracy } =
    calculateOverallStats(answers);

  // Calculate mode-based statistics
  const {
    mode1Accuracy,
    mode2Accuracy,
    mode1AvgTime,
    mode2AvgTime,
    mode1TotalTime,
    mode2TotalTime,
  } = calculateModeStats(answers, mode1First);

  // Get mode names for display
  const firstSetMode = getModeName(mode1First, 1);
  const secondSetMode = getModeName(mode1First, 2);

  return (
    <div className="min-h-screen bg-[#F7E6C4]/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT COLUMN: Summary Info */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h1 className="text-3xl mb-2 text-black font-semibold">
              Quiz Complete!
            </h1>
            <p className="text-gray-600 mb-6">
              Thank you for participating in our game!
            </p>

            {/* Data Collection Notice */}
            <div
              className={`mb-8 p-4 rounded-lg border-2 ${
                consented
                  ? "bg-[#6CA651]/10 border-[#6CA651]/40"
                  : "bg-gray-50 border-gray-300"
              }`}
            >
              {consented ? (
                <div className="flex items-start gap-3">
                  <p className="text-sm text-gray-700">
                    Your anonymous performance{" "}
                    <strong>data has been recorded</strong>. This data will not
                    be shared and will only be used for MIE286 project data
                    analysis.
                  </p>
                </div>
              ) : (
                <div className="flex items-start gap-3">
                  <h3 className="text-base text-gray-900 mb-1">
                    As per your choice,{" "}
                    <strong>NO data has been collected or stored.</strong>
                  </h3>
                </div>
              )}
            </div>

            {/* Overall Performance */}
            <div className="mb-8">
              <h2 className="text-2xl mb-4 text-gray-900 flex items-center gap-2">
                <BarChart3 className="w-6 h-6" />
                Your Performance
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="bg-[#9E3B3B]/20 rounded-lg p-4">
                  <div className="text-3xl text-[#9E3B3B] mb-2 text-center">
                    {accuracy.toFixed(1)}%
                  </div>
                  <div className="text-md text-black text-center">
                    Overall Accuracy
                  </div>
                  <div className="text-md text-black mt-1 text-center">
                    {correctAnswers} / {totalQuestions} correct
                  </div>
                </div>

                <div className="bg-[#F1C376]/20 rounded-lg p-4">
                  <div className="text-3xl text-[#F1C376] mb-2 text-center">
                    {formatTimeSeconds(mode1TotalTime + mode2TotalTime)}s
                  </div>
                  <div className="text-md text-black text-center">
                    Total Time
                  </div>
                </div>

                <div className="bg-[#606C5D]/20 rounded-lg p-4">
                  <div className="text-3xl text-[#606C5D] mb-2 text-center">
                    {mode1First ? "1→2" : "2→1"}
                  </div>
                  <div className="text-md text-black mt-1 text-center">
                    {mode1First
                      ? "With then No feedback"
                      : "No then With feedback"}
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

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-[#F1C376]/20 rounded-lg p-4 border border-[#F1C376]">
                  <h3 className="text-lg text-black mb-2">Images 1-10</h3>
                  <div className="text-xl font-semibold mb-1">
                    {Math.round(mode1First ? mode1Accuracy : mode2Accuracy)}%
                    accuracy
                  </div>
                  <div className="text-md text-[#7B542F] mb-1">
                    {formatTimeSeconds(
                      mode1First ? mode1AvgTime : mode2AvgTime,
                    )}
                    s Avg Response Time
                  </div>
                  <div className="text-md">{firstSetMode}</div>
                </div>

                <div className="bg-[#606C5D]/20 rounded-lg p-4 border border-[#606C5D]">
                  <h3 className="text-lg text-black mb-2">Images 11-20</h3>
                  <div className="text-xl font-semibold mb-1">
                    {Math.round(mode1First ? mode2Accuracy : mode1Accuracy)}%
                    accuracy
                  </div>
                  <div className="text-md text-[#7B542F] mb-1">
                    {formatTimeSeconds(
                      mode1First ? mode2AvgTime : mode1AvgTime,
                    )}
                    s Avg Response Time
                  </div>
                  <div className="text-md">{secondSetMode}</div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Detailed Results */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl mb-2 text-gray-900">Detailed Results</h2>

            <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto pr-2 mb-6">
              {answers.map((answer, index) => {
                const imageData = images.find(
                  (img) => img.id === answer.imageId,
                );
                return (
                  <div
                    key={answer.imageId}
                    className={`flex items-center gap-3 p-3 rounded-lg ${
                      answer.isCorrect
                        ? "bg-[#6CA651]/10 border border-[#6CA651]"
                        : "bg-[#9E3B3B]/10 border border-[#9E3B3B]"
                    }`}
                  >
                    {/* Image Thumbnail - Clickable */}
                    {imageData && (
                      <img
                        src={imageData.url}
                        alt={`Image ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0 cursor-pointer transition-opacity"
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
                            {answer.correctAnswer
                              ? "AI-Generated"
                              : "Real Photo"}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <Clock className="w-3 h-3" />
                          {formatTimeSeconds(answer.responseTime)}s
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p>
              Whether you choose to have your data collected or not,{" "}
              <strong>please don't take another quiz attempt</strong> to ensure
              data integrity and accuracy. We appreciate your participation and
              contribution to our project! (You are good to close the tab)
            </p>
          </div>
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
