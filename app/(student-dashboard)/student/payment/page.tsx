// 'use client';

// import React, { useState, useEffect } from 'react';

// interface Payment {
//   _id: string;
//   session: string;
//   term: string;
//   amount: number;
//   regNumber: string;
//   proofUrl: string;
//   uploadedAt: string;
// }

// const StudentPaymentPage = () => {
//   const [session, setSession] = useState('');
//   const [term, setTerm] = useState('');
//   const [amount, setAmount] = useState<number>(0);
//   const [regNumber, setRegNumber] = useState('');
//   const [file, setFile] = useState<File | null>(null);
//   const [loading, setLoading] = useState(false);
//   const [payments, setPayments] = useState<Payment[]>([]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!session || !term || !amount || !regNumber || !file) {
//       alert('Please fill all fields');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('session', session);
//     formData.append('term', term);
//     formData.append('amount', amount.toString());
//     formData.append('regNumber', regNumber);
//     formData.append('file', file);

//     setLoading(true);

//     try {
//       const res = await fetch('http://localhost:5000/payments/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       if (!res.ok) throw new Error('Upload failed');
//       const data = await res.json();
//       alert('Payment uploaded successfully!');
//       setPayments((prev) => [data, ...prev]);

//       setSession('');
//       setTerm('');
//       setAmount(0);
//       setRegNumber('');
//       setFile(null);
//     } catch (err) {
//       alert('Upload failed. Try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md mt-8">
//       <h1 className="text-2xl font-bold text-green-600 mb-6">Upload Payment Proof</h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           value={regNumber}
//           onChange={(e) => setRegNumber(e.target.value)}
//           placeholder="Registration Number"
//           className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         />

//         <input
//           type="text"
//           value={session}
//           onChange={(e) => setSession(e.target.value)}
//           placeholder="Session (e.g., 2024/2025)"
//           className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         />

//         <select
//           value={term}
//           onChange={(e) => setTerm(e.target.value)}
//           className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         >
//           <option value="">Select Term</option>
//           <option value="1st">1st Term</option>
//           <option value="2nd">2nd Term</option>
//           <option value="3rd">3rd Term</option>
//         </select>

//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(parseFloat(e.target.value))}
//           placeholder="Amount Paid (₦)"
//           className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
//           required
//         />

//         <input
//           type="file"
//           accept="image/*,.pdf"
//           onChange={(e) => setFile(e.target.files?.[0] || null)}
//           className="w-full border border-gray-300 rounded px-4 py-2"
//           required
//         />

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
//         >
//           {loading ? 'Uploading...' : 'Submit Payment Proof'}
//         </button>
//       </form>

//       {payments.length > 0 && (
//         <div className="mt-10">
//           <h2 className="text-xl font-semibold mb-4">Previous Uploads</h2>
//           <div className="space-y-4">
//             {payments.map((p) => (
//               <div
//                 key={p._id}
//                 className="border rounded p-4 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center"
//               >
//                 <div>
//                   <p><span className="font-semibold">Reg No:</span> {p.regNumber}</p>
//                   <p><span className="font-semibold">Session:</span> {p.session}</p>
//                   <p><span className="font-semibold">Term:</span> {p.term}</p>
//                   <p><span className="font-semibold">Amount:</span> ₦{p.amount}</p>
//                   <p className="text-sm text-gray-500">
//                     Uploaded: {new Date(p.uploadedAt).toLocaleString()}
//                   </p>
//                 </div>
//                 <a
//                   href={p.proofUrl}
//                   target="_blank"
//                   className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                 >
//                   View Receipt
//                 </a>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentPaymentPage;


'use client';

import React, { useState } from 'react';

interface Payment {
  _id: string;
  session: string;
  term: string;
  amount: number;
  regNumber: string;
  paymentType: string;
  fileUrl: string;
  uploadedAt: string;
}

const StudentPaymentPage = () => {
  const [session, setSession] = useState('');
  const [term, setTerm] = useState('');
  const [amount, setAmount] = useState<number>(0);
  const [regNumber, setRegNumber] = useState('');
  const [paymentType, setPaymentType] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session || !term || !amount || !regNumber || !paymentType || !file) {
      alert('Please fill all fields');
      return;
    }

    const formData = new FormData();
    formData.append('session', session);
    formData.append('term', term);
    formData.append('amount', amount.toString());
    formData.append('regNumber', regNumber);
    formData.append('paymentType', paymentType);
    formData.append('file', file);

    setLoading(true);

    try {
      const res = await fetch('https://forestryapi.onrender.com/payments/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      alert('Payment uploaded successfully!');
      setPayments((prev) => [data, ...prev]);

      // Reset form
      setSession('');
      setTerm('');
      setAmount(0);
      setRegNumber('');
      setPaymentType('');
      setFile(null);
    } catch (err) {
      alert('Upload failed. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-md mt-8">
      <h1 className="text-2xl font-bold text-green-600 mb-6">Upload Payment Proof</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          placeholder="Registration Number"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="text"
          value={session}
          onChange={(e) => setSession(e.target.value)}
          placeholder="Session (e.g., 2024/2025)"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <select
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select Semester</option>
          <option value="1st">1st Semester</option>
          <option value="2nd">2nd Semester</option>
          {/* <option value="3rd">3rd Term</option> */}
        </select>

        <select
          value={paymentType}
          onChange={(e) => setPaymentType(e.target.value)}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        >
          <option value="">Select Payment Type</option>
          <option value="Tuition">Tuition</option>
          <option value="Exam Fee">Departmental Due</option>
          {/* <option value="Library Fee">Library Fee</option> */}
        </select>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Amount Paid (₦)"
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <input
          type="file"
          accept="image/*,.pdf"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full border border-gray-300 rounded px-4 py-2"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
        >
          {loading ? 'Uploading...' : 'Submit Payment Proof'}
        </button>
      </form>

      {payments.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-4">Previous Uploads</h2>
          <div className="space-y-4">
            {payments.map((p) => (
              <div
                key={p._id}
                className="border rounded p-4 bg-gray-50 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div>
                  <p><span className="font-semibold">Reg No:</span> {p.regNumber}</p>
                  <p><span className="font-semibold">Session:</span> {p.session}</p>
                  <p><span className="font-semibold">Term:</span> {p.term}</p>
                  <p><span className="font-semibold">Type:</span> {p.paymentType}</p>
                  <p><span className="font-semibold">Amount:</span> ₦{p.amount}</p>
                  <p className="text-sm text-gray-500">
                    Uploaded: {new Date(p.uploadedAt).toLocaleString()}
                  </p>
                </div>
                <a
                  href={p.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  View Receipt
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPaymentPage;
