'use client';

import React, { useState, useEffect } from 'react';

interface StudentDocument {
  _id: string;
  regNumber: string;
  type: string;
  fileUrl: string;
  fileName: string;
//   createdAt: string;
  uploadedAt: string;
}

const StudentDocumentUploadPage = () => {
  const [regNumber, setRegNumber] = useState('');
  const [type, setType] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [documents, setDocuments] = useState<StudentDocument[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    setFile(selected || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regNumber || !type || !file) {
      setMessage('All fields are required.');
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('regNumber', regNumber);
    formData.append('type', type);
    formData.append('document', file);

    try {
      const res = await fetch('https://forestryapi.onrender.com/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      setMessage('✅ Document uploaded successfully');
      setFile(null);
      fetchDocuments(regNumber);
    } catch (error) {
      setMessage('❌ Failed to upload document');
    } finally {
      setUploading(false);
    }
  };

  const fetchDocuments = async (reg: string) => {
    try {
      const res = await fetch(`https://forestryapi.onrender.com/documents/student/${reg}`);
      if (!res.ok) throw new Error('Failed to fetch documents');
      const data = await res.json();
      setDocuments(data);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  const handleRegNumberSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (regNumber.trim()) {
      fetchDocuments(regNumber.trim());
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Upload Student Document</h1>

      {/* Reg Number Form */}
      <form onSubmit={handleRegNumberSubmit} className="mb-6">
        <label className="block mb-2 font-semibold">Enter Registration Number</label>
        <input
          type="text"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          placeholder="e.g. ZIT/2023/1234"
          className="w-full border px-4 py-2 rounded mb-4"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Continue
        </button>
      </form>

      {/* Upload Form */}
      {regNumber && (
        <>
          <form onSubmit={handleSubmit} className="mb-6">
            <label className="block mb-2 font-semibold">Select Document Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full border px-4 py-2 rounded mb-4"
            >
              <option value="">Select Type</option>
              <option value="assignment">Assignment</option>
              <option value="project">Project</option>
              <option value="it-report">IT Report</option>
            </select>

            {/* Modern File Input */}
            <label className="block mb-2 font-semibold">Upload Document</label>
            <div className="mb-4">
              <label className="cursor-pointer bg-green-100 text-green-800 px-4 py-2 rounded inline-block hover:bg-green-200">
                Choose File
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.png"
                  className="hidden"
                />
              </label>
              {file && <span className="ml-3 text-sm text-gray-700">{file.name}</span>}
            </div>

            <button
              type="submit"
              disabled={uploading}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              {uploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </form>

          {/* Message */}
          {message && (
            <p className="mb-4 text-sm text-green-700">{message}</p>
          )}

          {/* Uploaded Documents */}
          <h2 className="text-lg font-semibold mb-2 text-green-700">Your Uploaded Documents</h2>
          {documents.length > 0 ? (
            <ul className="space-y-2">
              {documents.map((doc) => (
                <li key={doc._id} className="border p-3 rounded bg-gray-50">
                  <p className="font-semibold">{doc.type.toUpperCase()}</p>
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 underline"
                  >
                    {doc.fileName}
                  </a>
                  {/* <p className="text-sm text-gray-500">
                    Uploaded: {new Date(doc.createdAt).toLocaleString()}
                  </p> */}
                  <p>Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}</p>

                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No documents uploaded yet.</p>
          )}
        </>
      )}
    </div>
  );
};

export default StudentDocumentUploadPage;
