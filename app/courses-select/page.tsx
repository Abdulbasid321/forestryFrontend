'use client';
import { useRouter } from 'next/navigation';

const classes = ['JSS1', 'JSS2', 'JSS3', 'SSS1', 'SSS2', 'SSS3'];

export default function ClassSelectionPage() {
  const router = useRouter();

  const handleClassClick = (className: string) => {
    router.push(`/subject-selection?class=${className}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-blue-100 flex flex-col items-center justify-center px-4 py-8">
      <h1 className="text-4xl font-bold text-blue-800 mb-8 text-center">Choose Your Class</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {classes.map((className) => (
          <button
            key={className}
            onClick={() => handleClassClick(className)}
            className="group p-8 bg-white rounded-3xl shadow-md hover:shadow-xl hover:-translate-y-1 hover:bg-blue-100 transition-all duration-300 text-center border border-blue-200 focus:outline-none"
          >
            <h2 className="text-2xl font-semibold text-blue-700 group-hover:text-blue-900 transition">
            {className}
            </h2>
          </button>
        ))}
      </div>
    </div>
  );
}
