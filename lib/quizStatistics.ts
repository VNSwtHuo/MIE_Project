/**
 * Quiz Statistics & Calculation Utilities
 * Centralized functions for all quiz-related calculations to reduce code duplication
 */

export interface Answer {
  imageId: string;
  userAnswer: boolean;
  correctAnswer: boolean;
  responseTime: number; // in milliseconds
  isCorrect: boolean;
  mode: boolean; // true = with feedback (Mode 1), false = without feedback (Mode 2)
}

export interface QuizStatistics {
  totalQuestions: number;
  correctAnswers: number;
  accuracy: number; // percentage
  averageResponseTime: number; // in milliseconds
  totalTime: number; // in milliseconds
}

export interface ModeStatistics {
  mode1Answers: Answer[];
  mode2Answers: Answer[];
  mode1Accuracy: number;
  mode2Accuracy: number;
  mode1AvgTime: number;
  mode2AvgTime: number;
  mode1TotalTime: number;
  mode2TotalTime: number;
}

export function calculateOverallStats(answers: Answer[]): QuizStatistics {
  const totalQuestions = answers.length;
  const correctAnswers = answers.filter((a) => a.isCorrect).length;
  const accuracy = (correctAnswers / totalQuestions) * 100;
  const averageResponseTime =
    answers.reduce((sum, a) => sum + a.responseTime, 0) / totalQuestions;
  const totalTime = answers.reduce((sum, a) => sum + a.responseTime, 0);

  return {
    totalQuestions,
    correctAnswers,
    accuracy,
    averageResponseTime,
    totalTime,
  };
}


export function getAnswerSet(
  answers: Answer[],
  setNumber: 1 | 2
): Answer[] {
  if (setNumber === 1) {
    return answers.slice(0, 10);
  } else {
    return answers.slice(10, 20);
  }
}

/**
 * Split answers by mode and calculate statistics for each mode
 */
export function calculateModeStats(
  answers: Answer[],
  mode1First: boolean
): ModeStatistics {
  const firstSetAnswers = getAnswerSet(answers, 1);
  const secondSetAnswers = getAnswerSet(answers, 2);

  // Determine which set corresponds to which mode
  const mode1Answers = mode1First ? firstSetAnswers : secondSetAnswers;
  const mode2Answers = mode1First ? secondSetAnswers : firstSetAnswers;

  const mode1Correct = mode1Answers.filter((a) => a.isCorrect).length;
  const mode2Correct = mode2Answers.filter((a) => a.isCorrect).length;

  const mode1TotalTime = mode1Answers.reduce(
    (sum, a) => sum + a.responseTime,
    0
  );
  const mode2TotalTime = mode2Answers.reduce(
    (sum, a) => sum + a.responseTime,
    0
  );

  const mode1AvgTime = mode1TotalTime / mode1Answers.length;
  const mode2AvgTime = mode2TotalTime / mode2Answers.length;

  return {
    mode1Answers,
    mode2Answers,
    mode1Accuracy: (mode1Correct / mode1Answers.length) * 100,
    mode2Accuracy: (mode2Correct / mode2Answers.length) * 100,
    mode1AvgTime,
    mode2AvgTime,
    mode1TotalTime,
    mode2TotalTime,
  };
}

/**
 * Get mode name based on mode flag and order
 */
export function getModeName(mode1First: boolean, setNumber: 1 | 2): string {
  if (setNumber === 1) {
    return mode1First ? "With Feedback" : "No Feedback";
  } else {
    return mode1First ? "No Feedback" : "With Feedback";
  }
}

/**
 * Format time from milliseconds to seconds string
 */
export function formatTimeSeconds(milliseconds: number, decimals: number = 1): string {
  const seconds = milliseconds / 1000;
  return seconds.toFixed(decimals);
}

/**
 * Format time in MM:SS format (for elapsed time display)
 */
export function formatTimeMMSS(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(Math.floor(secs)).padStart(2, "0")}`;
}
