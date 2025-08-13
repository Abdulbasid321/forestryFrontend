'use client';

import { useEffect, useState } from 'react';

interface Payment {
  _id: string;
  regNumber: string;
  session: string;
  term: string;
  amount: number;
  fileUrl: string; // ✅ matches backend
  uploadedAt: string;
  status: string; // optional if you want to display payment status
}

const AdminFeesPage = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const res = await fetch('https://forestryapi.onrender.com/payments'); // ✅ match backend route
        if (!res.ok) throw new Error('Failed to fetch payments');
        const data = await res.json();
        setPayments(data);
      } catch (error) {
        console.error('Error fetching payments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-green-700">Student Payment Records</h1>

      {loading ? (
        <p>Loading payments...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg shadow">
            <thead className="bg-green-600 text-white">
              <tr>
                <th className="p-3 text-left">Reg Number</th>
                <th className="p-3 text-left">Session</th>
                <th className="p-3 text-left">Term</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Uploaded At</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((pay) => (
                <tr key={pay._id} className="border-b hover:bg-gray-100">
                  <td className="p-2">{pay.regNumber}</td>
                  <td className="p-2">{pay.session}</td>
                  <td className="p-2">{pay.term}</td>
                  <td className="p-2">₦{pay.amount}</td>
                  <td className="p-2">{new Date(pay.uploadedAt).toLocaleString()}</td>
                  {/* <td className="p-2 capitalize">{pay.status || 'pending'}</td> */}
                  <td className="p-2">
  <select
    value={pay.status}
    onChange={async (e) => {
      const newStatus = e.target.value;

      await fetch(`https://forestryapi.onrender.com/payments/${pay._id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      // Update UI instantly without refetch
      setPayments((prev) =>
        prev.map((p) =>
          p._id === pay._id ? { ...p, status: newStatus } : p
        )
      );
    }}
    className="border p-1 rounded"
  >
    <option value="pending">Pending</option>
    <option value="approved">Approved</option>
    <option value="rejected">Rejected</option>
  </select>
</td>

                  <td className="p-2">
                    <a
                      href={pay.fileUrl} // ✅ correct field
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Receipt
                    </a>
                  </td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-gray-600">
                    No payments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminFeesPage;
