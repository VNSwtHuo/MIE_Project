'use client';

import React, { useState } from 'react';
import { Brain, Shield, Clock, Target } from 'lucide-react';

interface StartPageProps {
  onStart: (consented: boolean) => void;
}

export function StartPage({ onStart }: StartPageProps) {
  const [agreed, setAgreed] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const handleNext = () => {
    if (!agreed) {
      setShowDialog(true);
    } else {
      onStart(true);
    }
  };

  const handleDialogResponse = (consent: boolean) => {
    setShowDialog(false);
    onStart(consent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl w-full">
        {/* Main Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <Brain className="w-16 h-16 text-indigo-600" />
          </div>
          <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">
            Help you distinguish between AI-generated images and real images!
          </h1>
        </div>

        {/* Description */}
        <div className="mb-8 space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            You will take a <strong>short but fun quiz</strong> where you will identify whether <strong>20 images</strong> are 
            AI-generated or real. <strong>You may receive the correct answer immediately, or one correct answer 
            for every 5 images.</strong> After the quiz, you will see a summary of how well you did throughout the test!
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <Target className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <p className="text-sm text-gray-700"><strong>20 Images</strong></p>
              <p className="text-xs text-gray-600">Quick test</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <p className="text-sm text-gray-700"><strong>2 Feedback Modes</strong></p>
              <p className="text-xs text-gray-600">Immediate or batch</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <p className="text-sm text-gray-700"><strong>Anonymous</strong></p>
              <p className="text-xs text-gray-600">Privacy protected</p>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-indigo-50 border-l-4 border-indigo-500 rounded-r-lg p-4">
            <h3 className="text-base mb-2 text-gray-900 flex items-center gap-2">
              <Shield className="w-5 h-5 text-indigo-600" />
              Research & Privacy
            </h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Your responses may be used for research purposes (<strong>depending on your permission</strong>). 
              Your data will never be associated with personal information, shared, or used for 
              any purpose other than research. <strong>Even if you do not agree to data collection, you can still 
              experience this fun quiz!</strong>
            </p>
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="mb-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500 cursor-pointer"
            />
            <span className="text-gray-700 group-hover:text-gray-900 select-none">
              I agree to have my data collected for <strong>research purposes only</strong>.
            </span>
          </label>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-lg transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
        >
          Next
        </button>

        {/* Confirmation Dialog */}
        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-xl mb-4 text-gray-900">Data Collection Consent</h3>
              <p className="text-gray-700 mb-6">
                You have not agreed to data collection. Would you like to agree to have your data collected 
                for research purposes? Your data will remain completely anonymous.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleDialogResponse(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-lg transition-colors"
                >
                  Yes, I agree
                </button>
                <button
                  onClick={() => handleDialogResponse(false)}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-4 rounded-lg transition-colors"
                >
                  No, continue without
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
