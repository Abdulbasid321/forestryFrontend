'use client';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const subjects = [
  'Mathematics',
  'Use of English',
  'Physics',
  'Chemistry',
  'Biology',
  'Economics',
  'Government',
  'Geography',
  'Literature',
  'Computer Science',
];

export default function SubjectSelectionPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const studentClass = searchParams.get('class');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);

  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    } else {
      if (selectedSubjects.length >= 4) {
        toast.error('You can only select up to 4 subjects.');
        return;
      }
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };

  const handleProceed = () => {
    if (selectedSubjects.length === 0) {
      toast.error('Please select at least one subject.');
      return;
    }
    router.push(`/exam?class=${studentClass}&subjects=${selectedSubjects.join(',')}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-purple-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-bold text-purple-800 mb-4 text-center">Select Your Subjects</h1>
      <p className="text-gray-600 mb-8 text-center">You can choose up to 4 subjects</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {subjects.map((subject) => {
          const isSelected = selectedSubjects.includes(subject);
          return (
            <button
              key={subject}
              onClick={() => toggleSubject(subject)}
              className={`p-6 rounded-3xl border text-center font-medium transition-all duration-300 shadow-md ${
                isSelected
                  ? 'bg-purple-600 text-white border-purple-700 shadow-lg'
                  : 'bg-white text-purple-700 border-purple-300 hover:bg-purple-100'
              }`}
            >
              {subject}
            </button>
          );
        })}
      </div>

      <button
        onClick={handleProceed}
        className="mt-10 bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 px-8 rounded-full transition shadow-md"
      >
        Proceed to Exam
      </button>
    </div>
  );
}
