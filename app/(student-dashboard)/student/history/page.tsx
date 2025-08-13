'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Payment = {
  _id: string;
  regNumber: string;
  session: string;
  term: string;
  amount: number;
  fileUrl: string;
  fileName: string;
  status: 'pending' | 'verified' | 'rejected';
  createdAt: string;
};

const StudentPayments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const regNumber = typeof window !== 'undefined' ? localStorage.getItem('studentRegNumber') : '';

  useEffect(() => {
    if (!regNumber) return;

    axios
      .get(`https://forestryapi.onrender.com/payments/student/${regNumber}`)
      .then((res) => setPayments(res.data))
      .catch((err) => console.error('Error fetching payments:', err));
  }, [regNumber]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">My Payment History</h2>
      <div className="overflow-x-auto shadow rounded-lg">
        <table className="min-w-full text-sm text-left bg-white border border-gray-200">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-3">Session</th>
              <th className="p-3">Term</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
              <th className="p-3">Receipt</th>
              <th className="p-3">Uploaded</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment._id} className="border-t hover:bg-gray-50">
                <td className="p-3">{payment.session}</td>
                <td className="p-3">{payment.term}</td>
                <td className="p-3">₦{payment.amount}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      payment.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : payment.status === 'verified'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {payment.status}
                  </span>
                </td>
                <td className="p-3">
                  <a
                    href={payment.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </a>
                </td>
                <td className="p-3">{new Date(payment.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {payments.length === 0 && <p className="mt-4 text-gray-500">No payment records found.</p>}
    </div>
  );
};

export default StudentPayments;
