"use client";

import { useState } from "react";
import { CloudUpload, FileCheck, FileX } from "lucide-react";

export default function UploadResultBulk() {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{ [key: string]: string }>({});
  const [message, setMessage] = useState("");

  const handleFileDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length > 0) {
      setFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleUpload = async () => {
  if (files.length === 0) {
    setMessage("Please select at least one PDF file.");
    return;
  }

  setUploading(true);
  setUploadStatus({});
  setMessage("");

  // const formData = new FormData();

  // // Add all files with the same field name: "results"
  // files.forEach((file) => {
  //   formData.append("results", file); // ✅ match backend
  // });
  const formData = new FormData();

files.forEach((file) => {
  const regNumber = file.name.split(".")[0]; // ✅ extract from each file
  formData.append("results", file);
  formData.append("regNumbers", regNumber); // ✅ NEW: multiple regNumbers
});


  // Assuming all files follow naming convention e.g. STU001.pdf
  // and you're uploading all files for one student at a time
  const regNumber = files[0].name.split(".")[0]; // get regNumber from first file
  formData.append("regNumber", regNumber); // ✅ backend expects this

  try {
    // const res = await fetch("https://istiqamauni-1.onrender.com/uploadResult", {
    const res = await fetch("https://forestryapi.onrender.com/uploadResult", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const data = await res.json();
      setMessage(`❌ Upload failed: ${data.error}`);
    } else {
      const data = await res.json();
      const statusMap: { [key: string]: string } = {};
      data.results.forEach((r: any) => {
        statusMap[r.fileName] = "✅ Uploaded";
      });
      setUploadStatus(statusMap);
      setMessage("✅ Upload complete.");
    }
  } catch (err) {
    setMessage("❌ Network error");
  }

  setUploading(false);
};


  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-2xl shadow-xl border">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
        📂 Bulk Upload Student Results
      </h2>
      <p className="text-center text-gray-500 mb-6">
        Drag & drop PDF result files below. Each file should be named with the student's registration number (e.g. <strong>STU001.pdf</strong>).
      </p>

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleFileDrop}
        className={`flex flex-col items-center justify-center border-4 border-dashed rounded-2xl p-12 cursor-pointer transition ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
      >
        <CloudUpload className="w-24 h-24 text-blue-600 mb-4" />
        <p className="text-gray-600 text-lg font-medium">
          Drop PDF files here or click to select
        </p>
        <input
          type="file"
          multiple
          accept="application/pdf"
          className="hidden"
          onChange={(e) => {
            if (e.target.files) {
              setFiles(Array.from(e.target.files));
              setUploadStatus({});
            }
          }}
        />
      </label>

      {files.length > 0 && (
        <div className="mt-6 bg-gray-50 p-5 rounded-lg border">
          <h3 className="text-lg font-semibold text-gray-700 mb-3">
            Files ready to upload:
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {files.map((file, i) => (
              <li key={i} className="flex items-center justify-between">
                <span>{file.name}</span>
                {uploadStatus[file.name] && (
                  <span className={uploadStatus[file.name].startsWith("✅") ? "text-green-600" : "text-red-600"}>
                    {uploadStatus[file.name]}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleUpload}
        disabled={uploading || files.length === 0}
        className={`mt-8 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-lg transition ${
          uploading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
        }`}
      >
        {uploading ? "Uploading..." : "Upload All Results"}
      </button>

      {message && (
        <p className="mt-4 text-center text-sm text-blue-600">{message}</p>
      )}
    </div>
  );
}

