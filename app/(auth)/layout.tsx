import React from 'react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Left side - Image with dark overlay */}
      <div className="relative w-1/2 hidden lg:block">
        <img
          src="/images/log1.jpg"
          alt="Login background"
          className="w-full h-full object-cover"
        />
        {/* Overlay - just color, no blur */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Right side - Form area */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-white">
        {children}
      </div>
    </div>
  );
}
