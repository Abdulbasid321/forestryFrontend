'use client';
import { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  answer: string;
}

interface AnswerMap {
  [subject: string]: {
    [questionId: number]: string;
  };
}

const mockData: { [subject: string]: Question[] } = {
  Mathematics: Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    question: `What is ${i + 2} + ${i + 3}?`,
    options: [
      `${i + 2}`,
      `${i + 3}`,
      `${i + 4}`,
      `${i + 5}`,
    ],
    answer: `${i + 5}`,
  })),
};

export default function ExamPage() {
  const subjects = Object.keys(mockData);
  const [currentSubject, setCurrentSubject] = useState<string>(subjects[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [showCalc, setShowCalc] = useState<boolean>(false);

  const questions = mockData[currentSubject];

  const handleOptionSelect = (option: string) => {
    setAnswers((prev) => ({
      ...prev,
      [currentSubject]: {
        ...prev[currentSubject],
        [questions[currentIndex].id]: option,
      },
    }));
  };

  const selectedAnswer = answers[currentSubject]?.[questions[currentIndex].id] || '';

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Questions */}
      <div className="flex-1 p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">{currentSubject}</h2>
        <p className="text-lg font-medium mb-4">
          {questions[currentIndex]?.question}
        </p>
        <div className="space-y-3">
          {questions[currentIndex]?.options.map((option, idx) => (
            <label
              key={idx}
              className={`block p-3 border rounded-xl cursor-pointer transition-all ${
                selectedAnswer === option
                  ? 'bg-blue-600 text-white border-blue-700'
                  : 'bg-white hover:bg-blue-50'
              }`}
            >
              <input
                type="radio"
                name="option"
                className="hidden"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleOptionSelect(option)}
              />
              {option}
            </label>
          ))}
        </div>
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-900 rounded-full"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
            className="px-6 py-2 bg-blue-700 hover:bg-blue-800 text-white rounded-full"
          >
            Next
          </button>
        </div>
        <div className="mt-6">
          <h4 className="text-md font-semibold mb-2">Jump to Question</h4>
          <div className="flex flex-wrap gap-2">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-10 h-10 rounded-full ${
                  idx === currentIndex
                    ? 'bg-blue-700 text-white'
                    : answers[currentSubject]?.[idx + 1]
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-black'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-72 p-6 border-l bg-white space-y-6">
        <h3 className="text-lg font-bold">Subjects</h3>
        <div className="flex flex-wrap gap-2">
          {subjects.map((subject) => (
            <button
              key={subject}
              onClick={() => {
                setCurrentSubject(subject);
                setCurrentIndex(0);
              }}
              className={`px-4 py-2 rounded-full border ${
                subject === currentSubject
                  ? 'bg-blue-700 text-white'
                  : 'bg-white text-blue-700 hover:bg-blue-100'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
        <button
          onClick={() => setShowCalc(!showCalc)}
          className="w-full py-2 mt-6 rounded-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
        >
          {showCalc ? 'Hide Calculator' : 'Show Calculator'}
        </button>
        {showCalc && (
          <iframe
            src="https://www.desmos.com/scientific"
            className="w-full h-64 border rounded-lg mt-4"
            title="Calculator"
          ></iframe>
        )}
        <button
          className="w-full mt-10 bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-full"
        >
          Submit Exam
        </button>
      </div>
    </div>
  );
}
