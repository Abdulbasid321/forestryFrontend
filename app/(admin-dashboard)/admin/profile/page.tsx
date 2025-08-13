'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect, useState, ChangeEvent } from 'react';
import { CheckCircle, XCircle, Edit } from 'lucide-react';

interface Admin {
  _id: string;
  name: string;
  email: string;
}

const AdminProfilePage = () => {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [adminId, setAdminId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedAdmin, setUpdatedAdmin] = useState<Partial<Admin>>({});

  // helper to decode JWT (no jsonwebtoken needed)
  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) return void router.push('/login');
    const decoded: any = decodeToken(token);
    if (decoded?.adminId) setAdminId(decoded.adminId);
    else router.push('/adminLogin');
  }, [router]);

  useEffect(() => {
    if (!adminId) return;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`https://forestryapi.onrender.com/admin/${adminId}`);
        if (!res.ok) throw new Error('Could not fetch profile');
        const data: Admin = await res.json();
        setAdmin(data);
        setUpdatedAdmin(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [adminId]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUpdatedAdmin(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!adminId) return;
    try {
      const res = await fetch(`https://forestryapi.onrender.com/admin/${adminId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedAdmin),
      });
      if (!res.ok) throw new Error('Update failed');
      const json = await res.json();
      setAdmin(json.updatedAdmin);
      setUpdatedAdmin(json.updatedAdmin);
      setIsEditing(false);
    } catch (err: any) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }
  if (!admin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-gray-600">No profile found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-8 border border-gray-200">
        <div className="flex flex-col items-center">
          <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-green-500">
            <img
              src="/avatar-placeholder.png"
              alt="Avatar"
              className="object-cover w-full h-full"
            />
          </div>
          {isEditing ? (
            <input
              name="name"
              value={updatedAdmin.name || ''}
              onChange={handleChange}
              className="border-b border-gray-300 text-center w-full pb-2 mb-4 focus:outline-none"
            />
          ) : (
            <h2 className="text-2xl font-semibold text-gray-800 mb-1">
              {admin.name}
            </h2>
          )}
          {isEditing ? (
            <input
              name="email"
              value={updatedAdmin.email || ''}
              onChange={handleChange}
              className="border-b border-gray-300 text-center w-full pb-2 mb-4 focus:outline-none"
            />
          ) : (
            <p className="text-gray-600 mb-4">{admin.email}</p>
          )}

          <div className="w-full space-y-2 mb-6">
            <div>
              <label className="text-gray-500 text-sm">Name</label>
              <p className="text-gray-700">{admin.name}</p>
            </div>
            <div>
              <label className="text-gray-500 text-sm">Email</label>
              <p className="text-gray-700">{admin.email}</p>
            </div>
          </div>

          {isEditing ? (
            <div className="flex gap-4 w-full">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition"
              >
                <span className="inline-flex items-center gap-1">
                  <CheckCircle size={16} /> Save
                </span>
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setUpdatedAdmin(admin);
                }}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition"
              >
                <span className="inline-flex items-center gap-1">
                  <XCircle size={16} /> Cancel
                </span>
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-green-500 text-white py-2 px-6 rounded-full hover:bg-green-600 transition inline-flex items-center gap-2"
            >
              <Edit size={16} /> Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;



