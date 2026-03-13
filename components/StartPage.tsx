"use client";

import React, { useState } from "react";
import { Shield, Clock, Image } from "lucide-react";

interface StartPageProps {
  onStart: (consented: boolean, gender: string, age: string) => void;
}

export function StartPage({ onStart }: StartPageProps) {
  const [agreed, setAgreed] = useState(true);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [errors, setErrors] = useState({ gender: false, age: false });

  const handleNext = () => {
    const newErrors = { gender: !gender, age: !age };
    setErrors(newErrors);
    
    if (!newErrors.gender && !newErrors.age) {
      if (!agreed) {
        onStart(false, gender, age);
      } else {
        onStart(true, gender, age);
      }
    }
  };

  // const handleDialogResponse = (consent: boolean) => {
  //   setShowDialog(false);
  //   onStart(consent);
  // };

  return (
    <div className="min-h-screen bg-[#F7E6C4]/30 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-3xl w-full">
        {/* Main Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl mb-4 text-gray-900">
            AI-generated Images and Real Images Recognition
          </h1>
        </div>

        {/* Description */}
        <div className="mb-8 space-y-4">
          <p className="text-lg text-gray-700 leading-relaxed">
            You will take a short quiz where you will identify whether{" "}
            <strong>20 images</strong> are AI-generated or real.{" "}
            <strong>
              You may receive the correct answer immediately after each image,
              or receive no feedback until the end.
            </strong>{" "}
            After the quiz, you will see a summary of how well you did!
          </p>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="bg-[#9E3B3B]/30 rounded-lg p-4 text-center">
              <Image className="w-8 h-8 text-[#9E3B3B] mx-auto mb-2" />
              <p className="text-sm text-gray-700">
                <strong>20 Images</strong>
              </p>
              <p className="text-xs text-gray-600">Quick quiz</p>
            </div>
            <div className="bg-[#F1C376]/30 rounded-lg p-4 text-center">
              <Clock className="w-8 h-8 text-[#F1C376] mx-auto mb-2" />
              <p className="text-sm text-gray-700">
                <strong>2 Feedback Modes</strong>
              </p>
              <p className="text-xs text-gray-600">With or without</p>
            </div>
            <div className="bg-[#606C5D]/30 rounded-lg p-4 text-center">
              <Shield className="w-8 h-8 text-[#606C5D] mx-auto mb-2" />
              <p className="text-sm text-gray-700">
                <strong>Anonymous</strong>
              </p>
              <p className="text-xs text-gray-600">
                Data Collection via Firebase
              </p>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-[#F7E6C4]/30 border-l-4 border-[#F1C376] rounded-r-lg p-4">
            <p className="text-sm text-gray-700 leading-relaxed">
              Your responses will only be used for winter 2026 semester MIE286
              course project <strong>only if you consent</strong>.{" "}
              <strong>
                Even if you do not agree to data collection, you can still take
                this fun quiz!
              </strong>{" "}
              However, whether you choose to have your data collected or not,{" "}
              <strong>please don't take another quiz attempt</strong> to ensure
              data integrity and accuracy.
            </p>
          </div>
        </div>

        {/* Gender and Age Section */}
        <div className="mb-8 space-y-4">
          <h2 className="text-xl font-semibold text-gray-900">Before you start</h2>
          
          {/* Gender Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="space-y-2">
              {["Male", "Female", "Other"].map((option) => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={option.toLowerCase()}
                    checked={gender === option.toLowerCase()}
                    onChange={(e) => {
                      setGender(e.target.value);
                      setErrors({ ...errors, gender: false });
                    }}
                    className="w-4 h-4 text-[#606C5D] border-gray-300 focus:ring-2 focus:ring-[#606C5D] cursor-pointer"
                  />
                  <span className="text-gray-700">{option}</span>
                </label>
              ))}
            </div>
            {errors.gender && <p className="text-red-500 text-sm mt-1">Please select your gender</p>}
          </div>

          {/* Age Input */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
              Age
            </label>
            <input
              id="age"
              type="number"
              min="1"
              max="150"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                setErrors({ ...errors, age: false });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#606C5D] text-gray-900"
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">Please enter your age</p>}
          </div>
        </div>

        {/* Consent Checkbox */}
        <div className="mb-6">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 text-[#76453B] border-gray-300 rounded focus:ring-2 focus:ring-[#76453B] cursor-pointer"
            />
            <span className="text-[#9E3B3B] group-hover:text-[#9E3B3B]/30 select-none">
              I agree to have my data collected anonymously for{" "}
              <strong>MIE286 course project</strong>.
            </span>
          </label>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-[#606C5D] hover:bg-[#606C5D]/50 text-white py-4 px-6 rounded-lg transition-colors text-lg font-medium shadow-lg hover:shadow-xl"
        >
          Next
        </button>

        {/* Confirmation Dialog
        {showDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full">
              <h3 className="text-xl mb-4 text-gray-900">
                Data Collection Consent
              </h3>
              <p className="text-gray-700 mb-6">
                You have not agreed to data collection. Would you like to agree
                to have your data collected for research purposes? Your data
                will remain completely anonymous.
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
        )} */}
      </div>
    </div>
  );
}
