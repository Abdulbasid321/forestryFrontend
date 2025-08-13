'use client';

import React, { useState, useEffect } from 'react';
import axios from '../../../../lib/axios'; // Adjust the path to your axios config
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Lecturer = {
  _id: string;
  name: string;
  department: string;
  email: string;
  phone?: string;
};

const AdminLecturersPage = () => {
  const [lecturers, setLecturers] = useState<Lecturer[]>([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLecturers();
  }, []);

  const fetchLecturers = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://forestryapi.onrender.com/lecturers');
      setLecturers(res.data);
    } catch (error) {
      console.error('Failed to fetch lecturers:', error);
      toast.error('Failed to fetch lecturers.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !department || !email) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      await axios.post('/lecturers', { name, department, email, phone });
      toast.success('Lecturer created successfully.');
      setName('');
      setDepartment('');
      setEmail('');
      setPhone('');
      fetchLecturers();
    } catch (error: any) {
      console.error('Error creating lecturer:', error);
      toast.error(error?.response?.data?.message || 'Error creating lecturer.');
    }
  };

  return (
    <div className="p-6">
      <ToastContainer position="top-right" />

      <h2 className="text-2xl font-bold mb-4">Create Lecturer</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mb-8">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border px-3 py-2 rounded"
          required
        />
        <input
          type="tel"
          placeholder="Phone (optional)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Lecturer
        </button>
      </form>

      <h3 className="text-xl font-semibold mb-2">All Lecturers</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {lecturers.map((lecturer) => (
            <li
              key={lecturer._id}
              className="border p-3 rounded shadow-sm bg-white"
            >
              <strong>{lecturer.name}</strong> — {lecturer.department} —{' '}
              {lecturer.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminLecturersPage;
