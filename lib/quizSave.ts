import {db} from "./firebase";
import {collection, addDoc, Timestamp} from "firebase/firestore";

interface DetailedAnswer {
  imageId: string;
  userAnswer: string; // "Fake" or "Real"
  correctAnswer: string; // "Fake" or "Real"
  isCorrect: number;
  responseTime: number; // in seconds
  mode: boolean; // 1 for with feedback
}

interface QuizData {
    userId: string;
    answers: DetailedAnswer[];
    Accuracy: number; // percentage of correct answers
    WFAccuracy: number; // with feedback accuracy 
    WOFAccuracy: number; // without feedback accuracy
    totalTP: number; // true positives (correctly identified AI-generated images)
    totalTN: number; // true negatives (correctly identified human-generated images)
    WF_TP: number; // true positives in with feedback mode
    WF_TN: number; // true negatives in with feedback mode
    WOF_TP: number; // true positives in without feedback mode
    WOF_TN: number; // true negatives in without feedback mode
    WFResponseTime: number; // total response time in with feedback mode
    WOFResponseTime: number; // total response time in without feedback mode
    noFeedbackFirst: boolean; // whether mode 1 was first
    timestamp: Timestamp; // when the quiz was completed
}

export const saveQuizDataToFirebase = async (
    userId: string, 
    answers: DetailedAnswer[], 
    noFeedbackFirst: boolean) => {
        try {
            const Accuracy = answers.filter((a) => a.isCorrect).length / 20;
            const WFAccuracy = answers.filter((a) => a.mode && a.isCorrect).length / 10;
            const WOFAccuracy = answers.filter((a) => !a.mode && a.isCorrect).length / 10;
            const totalTP = answers.filter((a) => a.isCorrect && a.correctAnswer === "Fake").length;
            const totalTN = answers.filter((a) => a.isCorrect && a.correctAnswer === "Real").length;
            const WF_TP = answers.filter((a) => a.mode && a.isCorrect && a.correctAnswer === "Fake").length;
            const WF_TN = answers.filter((a) => a.mode && a.isCorrect && a.correctAnswer === "Real").length;
            const WOF_TP = answers.filter((a) => !a.mode && a.isCorrect && a.correctAnswer === "Fake").length;
            const WOF_TN = answers.filter((a) => !a.mode && a.isCorrect && a.correctAnswer === "Real").length;
            const WFResponseTime = answers.filter((a) => a.mode).reduce((sum, a) => sum + a.responseTime, 0);
            const WOFResponseTime = answers.filter((a) => !a.mode).reduce((sum, a) => sum + a.responseTime, 0);

        const quizData: QuizData = {
            userId,
            answers,
            Accuracy: parseFloat((Accuracy * 100).toFixed(2)), // convert to percentage
            WFAccuracy: parseFloat((WFAccuracy * 100).toFixed(2)),
            WOFAccuracy: parseFloat((WOFAccuracy * 100).toFixed(2)),
            totalTP,
            totalTN,
            WF_TP,
            WF_TN,
            WOF_TP,
            WOF_TN,
            WFResponseTime: parseFloat((WFResponseTime / 1000).toFixed(2)), // seconds
            WOFResponseTime: parseFloat((WOFResponseTime / 1000).toFixed(2)), // seconds
            noFeedbackFirst,
            timestamp: Timestamp.now(),
        };
        
        const docRef = await addDoc(collection(db, "quiz_results"), quizData);
        console.log("Quiz data saved successfully: ", docRef.id);
    } catch (error) {
        console.error("Error saving quiz data: ", error);
        throw error;
    }
};


