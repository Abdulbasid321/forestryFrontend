"use client";

import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const handleGoogleSignIn = () => {
    console.log("Sign in with Google clicked");
  };

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:5000/teachers/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      localStorage.setItem('teacherToken', data.token);
      router.push('/teacherDashboard'); // Redirect to student dashboard
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }; 
  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl md:4xl font-bold text-green-600 mb-6 text-center">Welcome Back To Teacher's Login</h1>

      {/* Google Sign In */}
      <button
        type="button"
        onClick={handleGoogleSignIn}
        className="flex items-center justify-center w-full border border-gray-300 rounded-md py-3 mb-6 hover:shadow transition"
      >
        <FcGoogle className="text-xl mr-2" />
        <span className="text-sm text-gray-700 font-medium">Sign in with Google</span>
      </button>

      {/* Divider */}
      <div className="flex items-center justify-between mb-6">
        <span className="w-1/4 border-b border-gray-300"></span>
        <span className="text-xs text-gray-500">OR</span>
        <span className="w-1/4 border-b border-gray-300"></span>
      </div>

      <form onSubmit={(e) => e.preventDefault()}>
        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded-md mb-4 text-center text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm text-gray-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block text-sm text-gray-600">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full mt-1 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div className="mb-4 text-right">
          <Link href="/forgot-password" className="text-sm text-green-500 hover:underline">
            Forgot Password?
          </Link>
        </div>

        <button
          type="button"
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-green-500 text-white py-3 rounded-md hover:bg-green-600 transition"
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-4 text-center text-gray-600 text-sm">
          Don’t have an account?{' '}
          <Link href="/signup" className="text-green-500 hover:underline font-semibold">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
