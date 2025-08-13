'use client';

import React, { useEffect, useState } from 'react';
import axios from '../../../../lib/axios';

type Department = {
  _id: string;
  name: string;
  code: string;
};

const ManageDepartmentsPage = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await axios.get('https://forestryapi.onrender.com/departments');
      setDepartments(res.data);
    } catch (error) {
      console.error('Failed to fetch departments:', error);
    }
  };

  const openModal = (dept?: Department) => {
    if (dept) {
      setEditId(dept._id);
      setName(dept.name);
      setCode(dept.code);
    } else {
      setEditId(null);
      setName('');
      setCode('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const departmentData = { name, code };

    try {
      if (editId) {
        await axios.put(`https://forestryapi.onrender.com/departments/${editId}`, departmentData);
      } else {
        await axios.post('https://forestryapi.onrender.com/departments', departmentData);
      }
      fetchDepartments();
      closeModal();
    } catch (error) {
      console.error('Error saving department:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`https://forestryapi.onrender.com/departments/${id}`);
      fetchDepartments();
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Departments</h2>
        <button
          onClick={() => openModal()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept) => (
          <div
            key={dept._id}
            className="bg-white shadow-md rounded-lg p-4 space-y-2"
          >
            <h3 className="text-lg font-semibold">{dept.name}</h3>
            <p>Code: {dept.code}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => openModal(dept)}
                className="text-blue-500 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(dept._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editId ? 'Edit Department' : 'Add New Department'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Department Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                type="text"
                placeholder="Department Code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  {editId ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDepartmentsPage;
