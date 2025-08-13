
"use client";
import React, { useEffect, useState } from "react";

interface Result {
  createdAt: string;
  _id: string;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedAt?: string;
}

const StudentResultsPage = () => {
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const regNumber = localStorage.getItem("studentRegNumber");

    if (!regNumber) {
      console.error("No registration number found.");
      setLoading(false);
      return;
    }

    const fetchResults = async () => {
      try {
        const sanitized = regNumber.replace(/[^a-zA-Z0-9]/g, "");
        const res = await fetch(
          `https://forestryapi.onrender.com/student/results/${sanitized}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("studentToken")}`,
            },
          }
        );

        const data = await res.json();
        if (Array.isArray(data)) {
          setResults(data);
        } else {
          setResults([]);
        }
      } catch (err) {
        console.error("Failed to fetch results", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading results...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">
        📄 My Results
      </h1>

      {results.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No results available.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((result) => (
            <div
              key={result._id}
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {result.fileName}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Uploaded on:{" "}
                  {(() => {
                    const dateStr = result.createdAt || result.uploadedAt;
                    return dateStr
                      ? new Date(dateStr).toLocaleDateString()
                      : "N/A";
                  })()}
                </p>
              </div>
              <a
                href={result.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                View Result
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentResultsPage;
